require('dotenv').config();

const express = require('express');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const { createClient } = require('@supabase/supabase-js');

// ============================================================
// CONFIG
// ============================================================
const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  JWT_SECRET,
  PORT = 3000,
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !JWT_SECRET) {
  console.error('Faltam variáveis no .env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SECRET');
  process.exit(1);
}

const MEDIA_BUCKET = 'chat-media';
const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB
const HISTORY_LIMIT = 60;

const ALLOWED_MIME = {
  'image/jpeg': { ext: 'jpg', kind: 'image' },
  'image/png': { ext: 'png', kind: 'image' },
  'image/webp': { ext: 'webp', kind: 'image' },
  'image/gif': { ext: 'gif', kind: 'image' },
  'video/mp4': { ext: 'mp4', kind: 'video' },
  'video/webm': { ext: 'webm', kind: 'video' },
  'video/quicktime': { ext: 'mov', kind: 'video' },
};

const VALID_THEMES = ['cyan', 'purple', 'matrix', 'sunset', 'crimson'];

// Cliente com service_role: roda só no servidor, bypassa RLS.
const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ============================================================
// APP
// ============================================================
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' })); // mídia não passa por HTTP, vai por socket

const server = http.createServer(app);

const io = new Server(server, {
  maxHttpBufferSize: MAX_FILE_BYTES + 2 * 1024 * 1024, // folga para o envelope base64
  pingTimeout: 60000,          // uploads longos não derrubam a conexão
  pingInterval: 25000,
  perMessageDeflate: false,    // binário já vem comprimido; deflate só gasta CPU
  cors: { origin: false },
});

// ============================================================
// HELPERS
// ============================================================
const USERNAME_RE = /^[a-zA-Z0-9._-]{3,24}$/;

function signToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/** Nome canônico da sala privada: dm:<menor>|<maior> */
function dmRoom(a, b) {
  return 'dm:' + [a.toLowerCase(), b.toLowerCase()].sort().join('|');
}

/** O usuário pode falar/ler nessa sala? */
function canAccessRoom(room, username) {
  if (room === 'global') return true;
  if (!room.startsWith('dm:')) return false;
  const members = room.slice(3).split('|');
  if (members.length !== 2) return false;
  return members.includes(username.toLowerCase());
}

/** Middleware de autenticação para rotas HTTP. */
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const claims = token && verifyToken(token);
  if (!claims) {
    return res.status(401).json({ status: 'error', message: 'Sessão expirada. Entre novamente.' });
  }
  req.user = claims;
  next();
}

/** Formato que o front consome. */
function shapeMessage(row, profile) {
  return {
    id: row.id,
    room: row.room,
    username: row.sender_name,
    displayName: profile?.display_name || row.sender_name,
    avatarUrl: profile?.avatar_url || null,
    text: row.content || '',
    fileUrl: row.file_url || null,
    fileType: row.file_type || null,
    isSystem: row.is_system,
    createdAt: row.created_at,
  };
}

/** Cache de perfis em memória — evita um SELECT por mensagem no chat global. */
const profileCache = new Map(); // username(lower) -> { id, username, display_name, avatar_url, theme, ts }
const PROFILE_TTL = 60 * 1000;

async function getProfile(username) {
  const key = username.toLowerCase();
  const hit = profileCache.get(key);
  if (hit && Date.now() - hit.ts < PROFILE_TTL) return hit;

  const { data } = await db
    .from('users')
    .select('id, username, display_name, avatar_url, theme')
    .ilike('username', username)
    .maybeSingle();

  if (data) {
    const entry = { ...data, ts: Date.now() };
    profileCache.set(key, entry);
    return entry;
  }
  return null;
}

function invalidateProfile(username) {
  profileCache.delete(username.toLowerCase());
}

/** Sobe um dataURL base64 para o Storage e devolve a URL pública. */
async function uploadMedia(dataUrl, username) {
  const match = /^data:([\w/+.-]+);base64,(.+)$/.exec(dataUrl || '');
  if (!match) throw new Error('Arquivo inválido.');

  const mime = match[1];
  const spec = ALLOWED_MIME[mime];
  if (!spec) throw new Error('Formato não suportado. Use JPG, PNG, WEBP, GIF, MP4, WEBM ou MOV.');

  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length > MAX_FILE_BYTES) throw new Error('Arquivo acima de 100 MB.');

  const name = `${username.toLowerCase()}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${spec.ext}`;

  const { error } = await db.storage.from(MEDIA_BUCKET).upload(name, buffer, {
    contentType: mime,
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw new Error('Falha no upload: ' + error.message);

  const { data } = db.storage.from(MEDIA_BUCKET).getPublicUrl(name);
  return { url: data.publicUrl, kind: spec.kind };
}

// ============================================================
// ROTAS DE API
// ============================================================

/**
 * POST /api/auth — Login, e cadastro automático se o usuário não existir.
 * body: { username, password }
 */
app.post('/api/auth', async (req, res) => {
  try {
    const username = String(req.body.username || '').trim();
    const password = String(req.body.password || '');

    if (!USERNAME_RE.test(username)) {
      return res.status(400).json({
        status: 'error',
        message: 'Use 3 a 24 caracteres: letras, números, ponto, hífen ou underline.',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({ status: 'error', message: 'A senha precisa de pelo menos 6 caracteres.' });
    }

    const { data: existing, error: selErr } = await db
      .from('users')
      .select('id, username, password_hash, display_name, avatar_url, theme')
      .ilike('username', username)
      .maybeSingle();

    if (selErr) throw selErr;

    // --- Login ---
    if (existing) {
      const ok = await bcrypt.compare(password, existing.password_hash);
      if (!ok) {
        return res.status(401).json({ status: 'error', message: 'Senha incorreta.' });
      }
      await db.from('users').update({ last_seen: new Date().toISOString() }).eq('id', existing.id);

      const profile = {
        id: existing.id,
        username: existing.username,
        displayName: existing.display_name,
        avatarUrl: existing.avatar_url,
        theme: existing.theme,
      };
      return res.json({ status: 'success', created: false, token: signToken(existing), profile });
    }

    // --- Cadastro automático ---
    const hash = await bcrypt.hash(password, 12);
    const { data: created, error: insErr } = await db
      .from('users')
      .insert({ username, password_hash: hash, display_name: username })
      .select('id, username, display_name, avatar_url, theme')
      .single();

    if (insErr) {
      if (insErr.code === '23505') {
        return res.status(409).json({ status: 'error', message: 'Esse nome acabou de ser registrado. Tente outro.' });
      }
      throw insErr;
    }

    return res.json({
      status: 'success',
      created: true,
      token: signToken(created),
      profile: {
        id: created.id,
        username: created.username,
        displayName: created.display_name,
        avatarUrl: created.avatar_url,
        theme: created.theme,
      },
    });
  } catch (err) {
    console.error('[auth]', err.message);
    res.status(500).json({ status: 'error', message: 'Não foi possível conectar ao servidor.' });
  }
});

/**
 * GET /api/me — perfil da sessão atual.
 */
app.get('/api/me', auth, async (req, res) => {
  const profile = await getProfile(req.user.username);
  if (!profile) return res.status(404).json({ status: 'error', message: 'Perfil não encontrado.' });
  res.json({
    status: 'success',
    profile: {
      id: profile.id,
      username: profile.username,
      displayName: profile.display_name,
      avatarUrl: profile.avatar_url,
      theme: profile.theme,
    },
  });
});

/**
 * PUT /api/profile — atualiza nome de exibição, avatar e tema.
 * body: { displayName?, avatarUrl?, avatarData?, theme? }
 * avatarData = dataURL (upload de arquivo). avatarUrl = link direto.
 */
app.put('/api/profile', auth, async (req, res) => {
  try {
    const patch = {};

    if (req.body.displayName !== undefined) {
      const name = String(req.body.displayName).trim();
      if (name.length < 1 || name.length > 40) {
        return res.status(400).json({ status: 'error', message: 'O nome de exibição vai de 1 a 40 caracteres.' });
      }
      patch.display_name = name;
    }

    if (req.body.theme !== undefined) {
      if (!VALID_THEMES.includes(req.body.theme)) {
        return res.status(400).json({ status: 'error', message: 'Tema desconhecido.' });
      }
      patch.theme = req.body.theme;
    }

    if (req.body.avatarData) {
      const { url } = await uploadMedia(req.body.avatarData, req.user.username);
      patch.avatar_url = url;
    } else if (req.body.avatarUrl !== undefined) {
      const link = String(req.body.avatarUrl).trim();
      if (link && !/^https?:\/\//i.test(link)) {
        return res.status(400).json({ status: 'error', message: 'O link do avatar precisa começar com http:// ou https://' });
      }
      patch.avatar_url = link || null;
    }

    if (!Object.keys(patch).length) {
      return res.status(400).json({ status: 'error', message: 'Nada para salvar.' });
    }

    const { data, error } = await db
      .from('users')
      .update(patch)
      .eq('id', req.user.sub)
      .select('id, username, display_name, avatar_url, theme')
      .single();

    if (error) throw error;

    invalidateProfile(req.user.username);

    const profile = {
      id: data.id,
      username: data.username,
      displayName: data.display_name,
      avatarUrl: data.avatar_url,
      theme: data.theme,
    };

    // Quem já está online vê o novo avatar/nome na hora.
    io.emit('profile updated', profile);

    res.json({ status: 'success', profile });
  } catch (err) {
    console.error('[profile]', err.message);
    res.status(500).json({ status: 'error', message: err.message || 'Não foi possível salvar o perfil.' });
  }
});

/**
 * GET /api/search?query= — busca usuários por username ou nome de exibição.
 */
app.get('/api/search', auth, async (req, res) => {
  try {
    const query = String(req.query.query || '').trim();
    if (query.length < 1) return res.json({ status: 'success', data: [] });

    const safe = query.replace(/[%_,]/g, '');
    const { data, error } = await db
      .from('users')
      .select('id, username, display_name, avatar_url')
      .or(`username.ilike.%${safe}%,display_name.ilike.%${safe}%`)
      .neq('id', req.user.sub)
      .order('last_seen', { ascending: false })
      .limit(8);

    if (error) throw error;

    res.json({
      status: 'success',
      data: data.map((u) => ({
        id: u.id,
        username: u.username,
        displayName: u.display_name,
        avatarUrl: u.avatar_url,
      })),
    });
  } catch (err) {
    console.error('[search]', err.message);
    res.status(500).json({ status: 'error', data: [] });
  }
});

/**
 * GET /api/history?room=&before= — resgata o histórico paginado (mais recentes primeiro no DB,
 * devolvido em ordem cronológica pro front só dar append).
 */
app.get('/api/history', auth, async (req, res) => {
  try {
    const room = String(req.query.room || 'global');
    if (!canAccessRoom(room, req.user.username)) {
      return res.status(403).json({ status: 'error', message: 'Sala fora do seu alcance.' });
    }

    let q = db
      .from('messages')
      .select('id, room, sender_name, content, file_url, file_type, is_system, created_at')
      .eq('room', room)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(HISTORY_LIMIT);

    if (req.query.before) q = q.lt('created_at', req.query.before);

    const { data, error } = await q;
    if (error) throw error;

    const rows = data.reverse();

    // Um único SELECT para todos os autores da página.
    const authors = [...new Set(rows.map((r) => r.sender_name.toLowerCase()))];
    const profiles = new Map();
    if (authors.length) {
      const { data: users } = await db
        .from('users')
        .select('username, display_name, avatar_url')
        .in('username', authors);
      (users || []).forEach((u) => profiles.set(u.username.toLowerCase(), u));
    }

    res.json({
      status: 'success',
      data: rows.map((r) => shapeMessage(r, profiles.get(r.sender_name.toLowerCase()))),
      hasMore: rows.length === HISTORY_LIMIT,
    });
  } catch (err) {
    console.error('[history]', err.message);
    res.status(500).json({ status: 'error', data: [] });
  }
});

/**
 * GET /api/contacts — contatos salvos (agora no banco, não no localStorage).
 */
app.get('/api/contacts', auth, async (req, res) => {
  try {
    const { data, error } = await db
      .from('contacts')
      .select('created_at, contact:contact_id ( id, username, display_name, avatar_url, last_seen )')
      .eq('owner_id', req.user.sub)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      status: 'success',
      data: (data || [])
        .filter((r) => r.contact)
        .map((r) => ({
          id: r.contact.id,
          username: r.contact.username,
          displayName: r.contact.display_name,
          avatarUrl: r.contact.avatar_url,
          lastSeen: r.contact.last_seen,
        })),
    });
  } catch (err) {
    console.error('[contacts:get]', err.message);
    res.status(500).json({ status: 'error', data: [] });
  }
});

/**
 * POST /api/contacts — salva um contato. body: { username }
 */
app.post('/api/contacts', auth, async (req, res) => {
  try {
    const target = await getProfile(String(req.body.username || ''));
    if (!target) return res.status(404).json({ status: 'error', message: 'Usuário não encontrado.' });
    if (target.id === req.user.sub) {
      return res.status(400).json({ status: 'error', message: 'Você já se tem.' });
    }

    const { error } = await db
      .from('contacts')
      .upsert(
        { owner_id: req.user.sub, contact_id: target.id },
        { onConflict: 'owner_id,contact_id', ignoreDuplicates: true }
      );

    if (error) throw error;
    res.json({ status: 'success' });
  } catch (err) {
    console.error('[contacts:post]', err.message);
    res.status(500).json({ status: 'error', message: 'Não foi possível salvar o contato.' });
  }
});

/**
 * DELETE /api/contacts/:username — remove o contato da sua lista (não apaga o histórico).
 */
app.delete('/api/contacts/:username', auth, async (req, res) => {
  try {
    const target = await getProfile(req.params.username);
    if (!target) return res.json({ status: 'success' });

    const { error } = await db
      .from('contacts')
      .delete()
      .eq('owner_id', req.user.sub)
      .eq('contact_id', target.id);

    if (error) throw error;
    res.json({ status: 'success' });
  } catch (err) {
    console.error('[contacts:delete]', err.message);
    res.status(500).json({ status: 'error', message: 'Não foi possível remover o contato.' });
  }
});

// Front-end estático
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// ============================================================
// SOCKET.IO
// ============================================================

// Handshake autenticado: sem token válido, nem conecta.
io.use((socket, next) => {
  const claims = verifyToken(socket.handshake.auth?.token);
  if (!claims) return next(new Error('unauthorized'));

  const room = socket.handshake.auth?.room || 'global';
  if (!canAccessRoom(room, claims.username)) return next(new Error('forbidden'));

  socket.data.username = claims.username;
  socket.data.userId = claims.sub;
  socket.data.room = room;
  next();
});

const usersOnline = new Map(); // username(lower) -> Set<socketId>

io.on('connection', async (socket) => {
  const { username, userId, room } = socket.data;
  const key = username.toLowerCase();

  socket.join(room);
  socket.join('user:' + key); // canal pessoal para notificações

  if (!usersOnline.has(key)) usersOnline.set(key, new Set());
  usersOnline.get(key).add(socket.id);

  io.emit('presence', { username, online: true });

  db.from('users').update({ last_seen: new Date().toISOString() }).eq('id', userId).then(() => {});

  // ---------- Enviar mensagem ----------
  socket.on('chat message', async (payload, ack) => {
    try {
      const text = String(payload?.text || '').trim().slice(0, 4000);
      const hasFile = Boolean(payload?.file);

      if (!text && !hasFile) return;

      let fileUrl = null;
      let fileType = null;

      if (hasFile) {
        const uploaded = await uploadMedia(payload.file, username);
        fileUrl = uploaded.url;
        fileType = uploaded.kind;
      }

      const { data: row, error } = await db
        .from('messages')
        .insert({
          room,
          sender_id: userId,
          sender_name: username,
          content: text || null,
          file_url: fileUrl,
          file_type: fileType,
          is_system: false,
        })
        .select('id, room, sender_name, content, file_url, file_type, is_system, created_at')
        .single();

      if (error) throw error;

      const profile = await getProfile(username);
      const message = shapeMessage(row, profile);

      io.to(room).emit('chat message', message);

      // Notifica o destinatário mesmo que ele esteja em outra sala.
      if (room.startsWith('dm:')) {
        const other = room.slice(3).split('|').find((n) => n !== key);
        if (other) {
          io.to('user:' + other).emit('dm notification', {
            from: username,
            displayName: message.displayName,
            avatarUrl: message.avatarUrl,
            room,
            preview: fileType ? (fileType === 'image' ? 'Enviou uma imagem' : 'Enviou um vídeo') : text.slice(0, 60),
          });
        }
      }

      if (typeof ack === 'function') ack({ status: 'success', id: row.id });
    } catch (err) {
      console.error('[message]', err.message);
      if (typeof ack === 'function') ack({ status: 'error', message: err.message });
      socket.emit('chat error', { message: err.message || 'A mensagem não saiu. Tente de novo.' });
    }
  });

  // ---------- Apagar histórico da conversa (soft delete, para os dois) ----------
  socket.on('request clear', async (targetRoom, ack) => {
    try {
      if (!canAccessRoom(targetRoom, username) || targetRoom === 'global') {
        throw new Error('Você não pode limpar essa sala.');
      }
      const { error } = await db
        .from('messages')
        .update({ deleted_at: new Date().toISOString() })
        .eq('room', targetRoom)
        .is('deleted_at', null);

      if (error) throw error;

      io.to(targetRoom).emit('clear messages');
      if (typeof ack === 'function') ack({ status: 'success' });
    } catch (err) {
      console.error('[clear]', err.message);
      if (typeof ack === 'function') ack({ status: 'error', message: err.message });
    }
  });

  // ---------- Digitando ----------
  socket.on('typing', (isTyping) => {
    socket.to(room).emit('typing', { username, isTyping: Boolean(isTyping) });
  });

  socket.on('disconnect', () => {
    const set = usersOnline.get(key);
    if (set) {
      set.delete(socket.id);
      if (!set.size) {
        usersOnline.delete(key);
        io.emit('presence', { username, online: false });
        db.from('users').update({ last_seen: new Date().toISOString() }).eq('id', userId).then(() => {});
      }
    }
  });
});

// ============================================================
process.on('unhandledRejection', (err) => console.error('[unhandled]', err));

server.listen(PORT, '0.0.0.0', () => {
  console.log(`CyberChat Pro na porta ${PORT} — Supabase conectado`);
});
