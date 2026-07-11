<!DOCTYPE html>
<html lang="pt-br" data-theme="cyan">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>CyberChat Pro</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
/* ============================================================
   TOKENS
   Um único par de variáveis (--accent / --accent-soft) governa
   todos os temas. Trocar o tema = trocar 4 valores no :root.
   ============================================================ */
:root{
  --bg:#05070a;
  --panel:#0b0f14;
  --panel-2:#111820;
  --line:rgba(255,255,255,.07);
  --text:#e6edf3;
  --muted:#7d8896;
  --radius:14px;
  --accent:#00e5ff;
  --accent-ink:#001014;
  --accent-soft:rgba(0,229,255,.12);
  --accent-line:rgba(0,229,255,.32);
  --glow:rgba(0,229,255,.35);
  --font-display:'Chakra Petch',system-ui,sans-serif;
  --font-body:'Inter',system-ui,sans-serif;
}
[data-theme="purple"] { --accent:#a855f7; --accent-ink:#12001f; --accent-soft:rgba(168,85,247,.14); --accent-line:rgba(168,85,247,.34); --glow:rgba(168,85,247,.4); }
[data-theme="matrix"] { --accent:#3ddc84; --accent-ink:#00140a; --accent-soft:rgba(61,220,132,.12); --accent-line:rgba(61,220,132,.32); --glow:rgba(61,220,132,.35); }
[data-theme="sunset"] { --accent:#ff8c42; --accent-ink:#1a0a00; --accent-soft:rgba(255,140,66,.13); --accent-line:rgba(255,140,66,.33); --glow:rgba(255,140,66,.38); }
[data-theme="crimson"]{ --accent:#ff3b5c; --accent-ink:#1a0006; --accent-soft:rgba(255,59,92,.13); --accent-line:rgba(255,59,92,.33); --glow:rgba(255,59,92,.38); }

*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{
  font-family:var(--font-body);
  background:var(--bg);
  color:var(--text);
  display:flex;
  overflow:hidden;
  -webkit-font-smoothing:antialiased;
  transition:background .4s ease;
}
/* Atmosfera: um halo do accent no fundo. Muda junto com o tema. */
body::before{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(700px 400px at 12% -10%, var(--accent-soft), transparent 70%),
    radial-gradient(600px 500px at 105% 110%, var(--accent-soft), transparent 70%);
  transition:background .5s ease;
}
button,input,textarea{font-family:inherit;color:inherit}
button{cursor:pointer;background:none;border:none}
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-thumb{background:var(--accent-line);border-radius:99px}
::selection{background:var(--accent);color:var(--accent-ink)}

/* ============================ SIDEBAR ============================ */
#sidebar{
  width:340px;flex-shrink:0;background:var(--panel);
  border-right:1px solid var(--line);
  display:flex;flex-direction:column;position:relative;z-index:2;
}
.brand{
  padding:20px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--line);
}
.brand h1{
  font-family:var(--font-display);font-size:17px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--accent);text-shadow:0 0 18px var(--glow);
}
.brand h1 span{color:var(--text);text-shadow:none}

.me{
  display:flex;align-items:center;gap:12px;padding:14px 20px;
  border-bottom:1px solid var(--line);cursor:pointer;transition:background .2s;
}
.me:hover{background:var(--panel-2)}
.me-info{flex:1;min-width:0}
.me-name{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.me-tag{font-size:11px;color:var(--muted);font-family:var(--font-display);letter-spacing:.05em}
.me-edit{font-size:11px;color:var(--accent);border:1px solid var(--accent-line);padding:5px 10px;border-radius:8px;transition:.2s}
.me:hover .me-edit{background:var(--accent);color:var(--accent-ink)}

.avatar{
  width:38px;height:38px;border-radius:12px;flex-shrink:0;object-fit:cover;
  background:var(--accent-soft);border:1px solid var(--accent-line);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--font-display);font-weight:700;color:var(--accent);font-size:15px;
}
.avatar.sm{width:30px;height:30px;border-radius:9px;font-size:12px}

.search-wrap{padding:14px 16px;position:relative}
.search-wrap input{
  width:100%;background:var(--panel-2);border:1px solid var(--line);
  padding:12px 14px;border-radius:10px;outline:none;font-size:14px;transition:.25s;
}
.search-wrap input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
#suggestions{
  position:absolute;left:16px;right:16px;top:58px;z-index:40;
  background:var(--panel-2);border:1px solid var(--accent-line);border-radius:12px;
  list-style:none;overflow:hidden;display:none;
  box-shadow:0 18px 40px rgba(0,0,0,.6);
  animation:pop .18s ease-out;
}
#suggestions li{padding:11px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:background .15s}
#suggestions li:hover{background:var(--accent-soft)}

.rail-label{
  padding:14px 20px 8px;font-family:var(--font-display);font-size:10px;
  letter-spacing:.2em;text-transform:uppercase;color:var(--muted);
}
#contacts{flex:1;overflow-y:auto;padding-bottom:20px}

.room{
  display:flex;align-items:center;gap:12px;padding:12px 18px;cursor:pointer;
  border-left:3px solid transparent;transition:background .2s,border-color .2s,transform .12s;
}
.room:hover{background:var(--panel-2);transform:translateX(2px)}
.room.active{background:linear-gradient(90deg,var(--accent-soft),transparent);border-left-color:var(--accent)}
.room-body{flex:1;min-width:0}
.room-name{font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.room-sub{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dot-unread{width:8px;height:8px;border-radius:99px;background:var(--accent);box-shadow:0 0 10px var(--accent);animation:pulse 1.4s infinite}
.online-ring{position:relative}
.online-ring::after{
  content:"";position:absolute;right:-1px;bottom:-1px;width:10px;height:10px;border-radius:99px;
  background:var(--accent);border:2px solid var(--panel);
}

/* ============================ CHAT ============================ */
#chat{flex:1;display:flex;flex-direction:column;min-width:0;position:relative;z-index:1}
#chat-header{
  padding:14px 20px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--line);background:rgba(11,15,20,.7);backdrop-filter:blur(12px);
}
.head-left{display:flex;align-items:center;gap:12px;min-width:0}
#chat-title{font-family:var(--font-display);font-size:15px;letter-spacing:.08em;text-transform:uppercase}
#chat-status{font-size:11px;color:var(--muted);height:14px}
#back{display:none;font-size:22px;color:var(--accent);line-height:1}
.head-actions{display:flex;gap:8px}
.ghost-btn{
  font-size:11px;color:var(--muted);border:1px solid var(--line);
  padding:7px 12px;border-radius:8px;transition:.2s;white-space:nowrap;
}
.ghost-btn:hover{color:var(--accent);border-color:var(--accent-line);background:var(--accent-soft)}
.ghost-btn.danger:hover{color:#ff6b6b;border-color:rgba(255,107,107,.4);background:rgba(255,107,107,.08)}

#messages{
  flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:4px;list-style:none;
  scroll-behavior:smooth;
}
#load-more{align-self:center;margin-bottom:12px}

.msg{display:flex;gap:10px;max-width:76%;animation:rise .32s cubic-bezier(.2,.8,.25,1) both}
.msg.me{align-self:flex-end;flex-direction:row-reverse}
.msg.them{align-self:flex-start}
.msg.stacked{margin-top:-2px}
.msg.stacked .avatar{visibility:hidden}
.msg.stacked .who{display:none}

.bubble{
  background:var(--panel-2);border:1px solid var(--line);
  padding:10px 14px;border-radius:16px;font-size:14.5px;line-height:1.5;
  word-break:break-word;position:relative;transition:transform .15s;
}
.msg.them .bubble{border-bottom-left-radius:5px}
.msg.me   .bubble{
  border-bottom-right-radius:5px;
  background:linear-gradient(135deg,var(--accent-soft),rgba(255,255,255,.02));
  border-color:var(--accent-line);
  box-shadow:0 0 24px -6px var(--glow);
}
.bubble:hover{transform:translateY(-1px)}
.who{
  font-size:12px;font-weight:600;color:var(--accent);margin-bottom:3px;
  cursor:pointer;display:inline-block;
}
.who:hover{text-decoration:underline}
.who .handle{color:var(--muted);font-weight:400;font-size:11px;margin-left:5px}
.time{font-size:10px;color:var(--muted);margin-top:4px;text-align:right;opacity:.7}

.media{
  display:block;max-width:340px;width:100%;border-radius:12px;margin-top:2px;
  border:1px solid var(--accent-line);cursor:zoom-in;background:#000;
}
.msg .media + span{display:block;margin-top:8px}

.system{
  align-self:center;font-family:var(--font-display);font-size:10.5px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--accent);background:var(--accent-soft);
  border:1px solid var(--accent-line);padding:5px 14px;border-radius:99px;margin:8px 0;
  animation:rise .3s both;
}
#typing{
  height:20px;padding:0 26px 6px;font-size:12px;color:var(--muted);font-style:italic;
}

/* ============================ COMPOSER ============================ */
#composer{
  padding:14px 18px;border-top:1px solid var(--line);
  background:rgba(11,15,20,.8);backdrop-filter:blur(12px);
}
#preview{display:none;margin-bottom:10px;position:relative;width:fit-content;animation:pop .2s}
#preview img,#preview video{max-height:120px;border-radius:10px;border:1px solid var(--accent-line);display:block}
#preview button{
  position:absolute;top:-8px;right:-8px;width:24px;height:24px;border-radius:99px;
  background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:13px;line-height:1;
}
.composer-row{display:flex;gap:10px;align-items:center}
.attach{
  width:44px;height:44px;flex-shrink:0;border-radius:12px;border:1px solid var(--line);
  color:var(--accent);font-size:22px;transition:.2s;display:flex;align-items:center;justify-content:center;
}
.attach:hover{background:var(--accent-soft);border-color:var(--accent-line);transform:rotate(90deg)}
#input{
  flex:1;background:var(--panel-2);border:1px solid var(--line);
  padding:13px 18px;border-radius:12px;outline:none;font-size:14.5px;transition:.25s;
}
#input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.send{
  height:44px;padding:0 22px;border-radius:12px;background:var(--accent);color:var(--accent-ink);
  font-family:var(--font-display);font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  font-size:12px;box-shadow:0 0 22px -4px var(--glow);transition:.2s;
}
.send:hover{transform:translateY(-1px);box-shadow:0 0 30px -2px var(--glow)}
.send:active{transform:translateY(1px)}
.send:disabled{opacity:.45;cursor:not-allowed;transform:none}

/* ============================ MODAIS ============================ */
.overlay{
  position:fixed;inset:0;z-index:100;background:rgba(2,4,6,.82);backdrop-filter:blur(8px);
  display:none;align-items:center;justify-content:center;padding:20px;
}
.overlay.open{display:flex;animation:fade .2s}
.card{
  width:100%;max-width:420px;background:var(--panel);border:1px solid var(--accent-line);
  border-radius:20px;padding:28px;box-shadow:0 30px 80px rgba(0,0,0,.7),0 0 60px -30px var(--glow);
  animation:pop .28s cubic-bezier(.2,.9,.3,1);
}
.card h2{font-family:var(--font-display);font-size:19px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent)}
.card p.hint{font-size:13px;color:var(--muted);margin-top:6px;line-height:1.5}
.field{margin-top:18px}
.field label{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:7px;font-family:var(--font-display)}
.field input{
  width:100%;background:var(--panel-2);border:1px solid var(--line);
  padding:13px 14px;border-radius:10px;outline:none;font-size:14px;transition:.25s;
}
.field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.primary{
  width:100%;margin-top:22px;height:48px;border-radius:12px;background:var(--accent);color:var(--accent-ink);
  font-family:var(--font-display);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:13px;
  box-shadow:0 0 26px -6px var(--glow);transition:.2s;
}
.primary:hover{transform:translateY(-2px);box-shadow:0 0 34px -4px var(--glow)}
.primary:disabled{opacity:.5;transform:none;cursor:not-allowed}
.text-btn{margin-top:14px;width:100%;text-align:center;font-size:12px;color:var(--muted)}
.text-btn:hover{color:var(--accent)}
.status{margin-top:14px;min-height:18px;font-size:12.5px;text-align:center;color:var(--accent)}
.status.err{color:#ff6b6b}

/* Seletor de temas — a assinatura visual do produto */
.swatches{display:flex;gap:10px;margin-top:10px}
.swatch{
  width:38px;height:38px;border-radius:11px;border:2px solid transparent;position:relative;
  transition:transform .18s cubic-bezier(.2,.9,.3,1),box-shadow .18s;
}
.swatch:hover{transform:translateY(-3px) scale(1.06)}
.swatch[aria-pressed="true"]{border-color:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.12)}
.swatch[data-t="cyan"]   {background:linear-gradient(135deg,#00e5ff,#0077a8);box-shadow:0 0 16px -4px #00e5ff}
.swatch[data-t="purple"] {background:linear-gradient(135deg,#a855f7,#5b21b6);box-shadow:0 0 16px -4px #a855f7}
.swatch[data-t="matrix"] {background:linear-gradient(135deg,#3ddc84,#0f7a3f);box-shadow:0 0 16px -4px #3ddc84}
.swatch[data-t="sunset"] {background:linear-gradient(135deg,#ff8c42,#c2410c);box-shadow:0 0 16px -4px #ff8c42}
.swatch[data-t="crimson"]{background:linear-gradient(135deg,#ff3b5c,#9f1239);box-shadow:0 0 16px -4px #ff3b5c}

.avatar-row{display:flex;align-items:center;gap:16px;margin-top:6px}
.avatar-lg{width:72px;height:72px;border-radius:20px;font-size:26px}
.avatar-actions{flex:1}
.avatar-actions .ghost-btn{width:100%;text-align:center;padding:10px}

/* Menu de perfil (clique no nome) */
#profile-menu{
  position:fixed;z-index:200;background:var(--panel-2);border:1px solid var(--accent-line);
  border-radius:12px;display:none;overflow:hidden;min-width:180px;
  box-shadow:0 20px 50px rgba(0,0,0,.7);animation:pop .16s;
}
#profile-menu button{
  display:block;width:100%;text-align:left;padding:12px 16px;font-size:13px;transition:background .15s;
}
#profile-menu button:hover{background:var(--accent-soft);color:var(--accent)}
#profile-menu button+button{border-top:1px solid var(--line)}

/* Lightbox de mídia */
#lightbox{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.94);display:none;align-items:center;justify-content:center;padding:24px}
#lightbox.open{display:flex;animation:fade .2s}
#lightbox img,#lightbox video{max-width:100%;max-height:90vh;border-radius:12px;border:1px solid var(--accent-line)}

/* Toast */
#toast{
  position:fixed;bottom:26px;left:50%;transform:translate(-50%,140%);z-index:400;
  background:var(--panel-2);border:1px solid var(--accent-line);color:var(--text);
  padding:12px 20px;border-radius:12px;font-size:13px;transition:transform .35s cubic-bezier(.2,.9,.3,1);
  box-shadow:0 16px 40px rgba(0,0,0,.6);max-width:88vw;
}
#toast.show{transform:translate(-50%,0)}

/* Barra de upload */
#upload-bar{height:2px;background:var(--accent);width:0;transition:width .2s;box-shadow:0 0 10px var(--accent)}

/* ============================ ANIMAÇÕES ============================ */
@keyframes rise{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}
@keyframes pop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}

/* ============================ MOBILE ============================ */
@media (max-width:820px){
  #sidebar{position:absolute;inset:0;width:100%;z-index:5}
  #chat{position:absolute;inset:0;display:none}
  body.chat-open #sidebar{display:none}
  body.chat-open #chat{display:flex}
  #back{display:block}
  .msg{max-width:88%}
  #messages{padding:16px}
}
</style>
</head>
<body>

<!-- ===================== LOGIN ===================== -->
<div class="overlay open" id="login">
  <div class="card">
    <h2>CyberChat Pro</h2>
    <p class="hint">Entre com seu usuário. Se ainda não existir, a conta é criada na hora.</p>
    <div class="field">
      <label for="lg-user">Usuário</label>
      <input id="lg-user" autocomplete="username" placeholder="ex: neo.anderson" maxlength="24">
    </div>
    <div class="field">
      <label for="lg-pass">Senha</label>
      <input id="lg-pass" type="password" autocomplete="current-password" placeholder="mínimo 6 caracteres">
    </div>
    <button class="primary" id="lg-btn">Entrar</button>
    <p class="status" id="lg-status"></p>
  </div>
</div>

<!-- ===================== PERFIL ===================== -->
<div class="overlay" id="profile-modal">
  <div class="card">
    <h2>Seu perfil</h2>
    <p class="hint">É assim que você aparece no chat global e para seus contatos.</p>

    <div class="field">
      <label>Foto de perfil</label>
      <div class="avatar-row">
        <div class="avatar avatar-lg" id="pf-avatar"></div>
        <div class="avatar-actions">
          <button class="ghost-btn" id="pf-upload-btn">Enviar arquivo</button>
          <input type="file" id="pf-file" accept="image/*" hidden>
          <input id="pf-url" placeholder="ou cole um link https://..." style="margin-top:8px;width:100%;background:var(--panel-2);border:1px solid var(--line);padding:10px 12px;border-radius:10px;outline:none;font-size:13px">
        </div>
      </div>
    </div>

    <div class="field">
      <label for="pf-name">Nome de exibição</label>
      <input id="pf-name" maxlength="40" placeholder="Como quer ser chamado">
    </div>

    <div class="field">
      <label>Tema</label>
      <div class="swatches" id="swatches">
        <button class="swatch" data-t="cyan"    title="Cyber Cyan"   aria-pressed="true"></button>
        <button class="swatch" data-t="purple"  title="Neon Purple"  aria-pressed="false"></button>
        <button class="swatch" data-t="matrix"  title="Matrix Green" aria-pressed="false"></button>
        <button class="swatch" data-t="sunset"  title="Sunset Orange"aria-pressed="false"></button>
        <button class="swatch" data-t="crimson" title="Crimson Red"  aria-pressed="false"></button>
      </div>
    </div>

    <button class="primary" id="pf-save">Salvar perfil</button>
    <button class="text-btn" id="pf-close">Cancelar</button>
    <p class="status" id="pf-status"></p>
  </div>
</div>

<!-- ===================== MENU DE PERFIL ===================== -->
<div id="profile-menu">
  <button id="pm-open">Abrir conversa</button>
  <button id="pm-save">Salvar contato</button>
</div>

<!-- ===================== LIGHTBOX ===================== -->
<div id="lightbox"><div id="lightbox-content"></div></div>
<div id="toast"></div>

<!-- ===================== SIDEBAR ===================== -->
<aside id="sidebar">
  <div class="brand">
    <h1>Cyber<span>Chat</span></h1>
    <button class="ghost-btn" id="logout">Sair</button>
  </div>

  <div class="me" id="me">
    <div class="avatar" id="me-avatar"></div>
    <div class="me-info">
      <div class="me-name" id="me-name">—</div>
      <div class="me-tag" id="me-tag">@—</div>
    </div>
    <span class="me-edit">Editar</span>
  </div>

  <div class="search-wrap">
    <input id="search" placeholder="Buscar pessoas..." autocomplete="off">
    <ul id="suggestions"></ul>
  </div>

  <div class="rail-label">Salas</div>
  <div class="room active" id="room-global">
    <div class="avatar sm" style="border-radius:9px">#</div>
    <div class="room-body">
      <div class="room-name">Chat global</div>
      <div class="room-sub">Aberto para todo mundo</div>
    </div>
  </div>

  <div class="rail-label">Contatos</div>
  <div id="contacts"></div>
</aside>

<!-- ===================== CHAT ===================== -->
<main id="chat">
  <header id="chat-header">
    <div class="head-left">
      <button id="back">&lsaquo;</button>
      <div class="avatar sm" id="peer-avatar">#</div>
      <div>
        <div id="chat-title">Chat global</div>
        <div id="chat-status">Conectando...</div>
      </div>
    </div>
    <div class="head-actions">
      <button class="ghost-btn" id="btn-theme">Tema</button>
      <button class="ghost-btn" id="btn-remove" style="display:none">Remover contato</button>
      <button class="ghost-btn danger" id="btn-clear" style="display:none">Apagar conversa</button>
    </div>
  </header>

  <div id="upload-bar"></div>

  <ul id="messages"></ul>
  <div id="typing"></div>

  <div id="composer">
    <div id="preview"></div>
    <form class="composer-row" id="form">
      <input type="file" id="file" accept="image/*,video/*" hidden>
      <button type="button" class="attach" id="attach" title="Anexar imagem ou vídeo">+</button>
      <input id="input" placeholder="Escreva uma mensagem" autocomplete="off" maxlength="4000">
      <button type="submit" class="send" id="send">Enviar</button>
    </form>
  </div>
</main>

<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
/* ============================================================
   ESTADO
   ============================================================ */
const MAX_BYTES = 100 * 1024 * 1024;
const $ = (id) => document.getElementById(id);

let token = localStorage.getItem('cc_token');
let me = null;                 // { id, username, displayName, avatarUrl, theme }
let socket = null;
let room = 'global';
let peer = null;               // username do outro lado, em DM
let contacts = [];
let pendingFile = null;        // { dataUrl, kind, name }
let oldestLoaded = null;
let menuTarget = null;
let typingTimer = null;

/* ============================================================
   UTIL
   ============================================================ */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toast(msg, isError) {
  const t = $('toast');
  t.textContent = msg;
  t.style.borderColor = isError ? 'rgba(255,107,107,.5)' : 'var(--accent-line)';
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 3200);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme || 'cyan';
  document.querySelectorAll('.swatch').forEach((s) =>
    s.setAttribute('aria-pressed', String(s.dataset.t === document.documentElement.dataset.theme)));
}

function api(path, options = {}) {
  return fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...(options.headers || {}),
    },
  }).then(async (r) => {
    const body = await r.json().catch(() => ({}));
    if (r.status === 401) { hardLogout(); throw new Error('Sessão expirada.'); }
    if (!r.ok || body.status === 'error') throw new Error(body.message || 'Algo falhou.');
    return body;
  });
}

const dmRoom = (a, b) => 'dm:' + [a.toLowerCase(), b.toLowerCase()].sort().join('|');
const initial = (name) => (name || '?').trim().charAt(0).toUpperCase();

function avatarHTML(profile, cls = '') {
  const alt = esc(profile.displayName || profile.username);
  return profile.avatarUrl
    ? `<img class="avatar ${cls}" src="${esc(profile.avatarUrl)}" alt="${alt}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'avatar ${cls}',textContent:'${esc(initial(profile.displayName || profile.username))}'}))">`
    : `<div class="avatar ${cls}">${esc(initial(profile.displayName || profile.username))}</div>`;
}

const hhmm = (iso) =>
  new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

/* ============================================================
   LOGIN
   ============================================================ */
$('lg-btn').onclick = doLogin;
$('lg-pass').addEventListener('keydown', (e) => e.key === 'Enter' && doLogin());
$('lg-user').addEventListener('keydown', (e) => e.key === 'Enter' && $('lg-pass').focus());

async function doLogin() {
  const username = $('lg-user').value.trim();
  const password = $('lg-pass').value;
  const status = $('lg-status');
  status.className = 'status';
  status.textContent = 'Conectando...';
  $('lg-btn').disabled = true;

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const body = await res.json();
    if (body.status !== 'success') throw new Error(body.message);

    token = body.token;
    localStorage.setItem('cc_token', token);
    me = body.profile;
    status.textContent = body.created ? 'Conta criada. Entrando...' : 'Autenticado.';
    boot();
  } catch (err) {
    status.className = 'status err';
    status.textContent = err.message || 'Falha de conexão.';
  } finally {
    $('lg-btn').disabled = false;
  }
}

function hardLogout() {
  localStorage.removeItem('cc_token');
  location.reload();
}
$('logout').onclick = hardLogout;

/* ============================================================
   BOOT
   ============================================================ */
async function start() {
  if (!token) return;
  try {
    const res = await api('/api/me');
    me = res.profile;
    boot();
  } catch { /* token inválido: fica no login */ }
}

function boot() {
  $('login').classList.remove('open');
  applyTheme(me.theme);
  paintMe();
  loadContacts();
  openRoom('global');
}

function paintMe() {
  $('me-avatar').outerHTML = avatarHTML(me).replace('class="avatar', 'id="me-avatar" class="avatar');
  $('me-name').textContent = me.displayName;
  $('me-tag').textContent = '@' + me.username;
}

/* ============================================================
   CONTATOS
   ============================================================ */
async function loadContacts() {
  try {
    const res = await api('/api/contacts');
    contacts = res.data;
    paintContacts();
  } catch { /* silencioso */ }
}

function paintContacts() {
  const box = $('contacts');
  if (!contacts.length) {
    box.innerHTML = `<div style="padding:16px 20px;font-size:13px;color:var(--muted);line-height:1.6">
      Nenhum contato ainda. Busque alguém acima ou clique num nome no chat global para começar a conversar.
    </div>`;
    return;
  }
  box.innerHTML = contacts.map((c) => `
    <div class="room ${peer === c.username ? 'active' : ''}" data-user="${esc(c.username)}">
      ${avatarHTML(c, 'sm')}
      <div class="room-body">
        <div class="room-name">${esc(c.displayName)}</div>
        <div class="room-sub">@${esc(c.username)}</div>
      </div>
      <span class="dot-unread" data-badge="${esc(c.username)}" style="display:none"></span>
    </div>`).join('');

  box.querySelectorAll('[data-user]').forEach((el) =>
    el.onclick = () => openRoom(dmRoom(me.username, el.dataset.user), el.dataset.user));
}

async function saveContact(username) {
  try {
    await api('/api/contacts', { method: 'POST', body: JSON.stringify({ username }) });
    await loadContacts();
  } catch (e) { toast(e.message, true); }
}

$('btn-remove').onclick = async () => {
  if (!peer) return;
  try {
    await api('/api/contacts/' + encodeURIComponent(peer), { method: 'DELETE' });
    toast('Contato removido. O histórico continua salvo.');
    await loadContacts();
    openRoom('global');
  } catch (e) { toast(e.message, true); }
};

/* ============================================================
   BUSCA
   ============================================================ */
let searchTimer = null;
$('search').oninput = () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(runSearch, 220);
};

async function runSearch() {
  const query = $('search').value.trim();
  const list = $('suggestions');
  if (!query) { list.style.display = 'none'; return; }
  try {
    const res = await api('/api/search?query=' + encodeURIComponent(query));
    if (!res.data.length) {
      list.innerHTML = `<li style="cursor:default;color:var(--muted)">Ninguém com esse nome.</li>`;
      list.style.display = 'block';
      return;
    }
    list.innerHTML = res.data.map((u) => `
      <li data-user="${esc(u.username)}">
        ${avatarHTML(u, 'sm')}
        <div style="min-width:0">
          <div style="font-size:13.5px;font-weight:500">${esc(u.displayName)}</div>
          <div style="font-size:11px;color:var(--muted)">@${esc(u.username)}</div>
        </div>
      </li>`).join('');
    list.style.display = 'block';
    list.querySelectorAll('[data-user]').forEach((el) => el.onclick = async () => {
      const u = el.dataset.user;
      list.style.display = 'none';
      $('search').value = '';
      await saveContact(u);
      openRoom(dmRoom(me.username, u), u);
    });
  } catch { list.style.display = 'none'; }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrap')) $('suggestions').style.display = 'none';
  if (!e.target.closest('#profile-menu') && !e.target.closest('.who')) $('profile-menu').style.display = 'none';
});

/* ============================================================
   SALAS + SOCKET
   ============================================================ */
$('room-global').onclick = () => openRoom('global');
$('back').onclick = () => document.body.classList.remove('chat-open');

async function openRoom(nextRoom, nextPeer = null) {
  room = nextRoom;
  peer = nextPeer;
  oldestLoaded = null;

  const isDM = room !== 'global';
  $('chat-title').textContent = isDM ? (contacts.find((c) => c.username === peer)?.displayName || peer) : 'Chat global';
  $('peer-avatar').outerHTML = avatarHTML(
    isDM ? (contacts.find((c) => c.username === peer) || { username: peer, displayName: peer }) : { displayName: '#' },
    'sm'
  ).replace('class="avatar', 'id="peer-avatar" class="avatar');
  $('btn-clear').style.display = isDM ? 'block' : 'none';
  $('btn-remove').style.display = isDM ? 'block' : 'none';
  $('room-global').classList.toggle('active', !isDM);
  document.querySelectorAll('[data-badge="' + peer + '"]').forEach((b) => b.style.display = 'none');
  paintContacts();
  document.body.classList.add('chat-open');

  $('messages').innerHTML = '';
  connect();
  await loadHistory();
}

function connect() {
  if (socket) socket.disconnect();
  socket = io({ auth: { token, room }, transports: ['websocket', 'polling'] });

  socket.on('connect', () => setStatus(peer ? 'Conversa privada' : 'Todos podem ler aqui'));
  socket.on('disconnect', () => setStatus('Reconectando...'));
  socket.on('connect_error', (err) => {
    if (err.message === 'unauthorized') return hardLogout();
    setStatus('Sem conexão');
  });

  socket.on('chat message', (msg) => {
    if (msg.room !== room) return;
    appendMessage(msg, true);
  });

  socket.on('clear messages', () => {
    $('messages').innerHTML = '';
    toast('Conversa apagada para os dois lados.');
  });

  socket.on('chat error', (e) => toast(e.message, true));

  socket.on('profile updated', (p) => {
    if (p.username === me.username) { me = p; paintMe(); applyTheme(p.theme); }
    document.querySelectorAll(`[data-author="${CSS.escape(p.username)}"] img.avatar`)
      .forEach((img) => { if (p.avatarUrl) img.src = p.avatarUrl; });
    document.querySelectorAll(`[data-author="${CSS.escape(p.username)}"] .who .name`)
      .forEach((el) => el.textContent = p.displayName);
    loadContacts();
  });

  socket.on('dm notification', (n) => {
    if (n.room === room) return;
    toast(`${n.displayName}: ${n.preview}`);
    const badge = document.querySelector(`[data-badge="${CSS.escape(n.from)}"]`);
    if (badge) badge.style.display = 'block';
    else loadContacts();
  });

  socket.on('typing', ({ username, isTyping }) => {
    $('typing').textContent = isTyping ? `${username} está digitando...` : '';
  });
}

const setStatus = (s) => $('chat-status').textContent = s;

/* ============================================================
   HISTÓRICO
   ============================================================ */
async function loadHistory(before = null) {
  try {
    const url = '/api/history?room=' + encodeURIComponent(room) + (before ? '&before=' + encodeURIComponent(before) : '');
    const res = await api(url);

    if (!before && !res.data.length) {
      $('messages').innerHTML = `<li class="system">Nada por aqui ainda. Diga a primeira coisa.</li>`;
      return;
    }
    if (!before) $('messages').innerHTML = '';

    const box = $('messages');
    const prevHeight = box.scrollHeight;

    if (before) {
      // Páginas antigas entram acima: constrói fora da tela e insere no topo.
      const frag = document.createDocumentFragment();
      res.data.forEach((m) => frag.appendChild(buildMessage(m)));
      box.prepend(frag);
    } else {
      // Append um a um para o agrupamento por autor enxergar a mensagem anterior.
      res.data.forEach((m) => box.appendChild(buildMessage(m)));
    }

    oldestLoaded = res.data[0]?.createdAt || oldestLoaded;

    if (res.hasMore) ensureLoadMore();
    else $('load-more')?.remove();

    if (before) box.scrollTop = box.scrollHeight - prevHeight;
    else box.scrollTop = box.scrollHeight;
  } catch (e) {
    toast(e.message, true);
  }
}

function ensureLoadMore() {
  if ($('load-more')) return;
  const btn = document.createElement('button');
  btn.id = 'load-more';
  btn.className = 'ghost-btn';
  btn.textContent = 'Carregar mensagens anteriores';
  btn.onclick = () => loadHistory(oldestLoaded);
  $('messages').prepend(btn);
}

/* ============================================================
   RENDER DE MENSAGENS
   ============================================================ */
function buildMessage(m) {
  const li = document.createElement('li');

  if (m.isSystem) {
    li.className = 'system';
    li.textContent = m.text;
    return li;
  }

  const mine = m.username.toLowerCase() === me.username.toLowerCase();
  li.className = 'msg ' + (mine ? 'me' : 'them');
  li.dataset.author = m.username;

  // Mensagens seguidas do mesmo autor colapsam avatar e nome.
  const last = $('messages').lastElementChild;
  if (last?.dataset?.author === m.username && !last.classList.contains('system')) {
    li.classList.add('stacked');
  }

  const media = m.fileUrl
    ? (m.fileType === 'image'
        ? `<img class="media" src="${esc(m.fileUrl)}" alt="Imagem enviada por ${esc(m.displayName)}" loading="lazy">`
        : `<video class="media" src="${esc(m.fileUrl)}" controls preload="metadata"></video>`)
    : '';

  const who = mine ? '' : `
    <span class="who" data-user="${esc(m.username)}">
      <span class="name">${esc(m.displayName)}</span><span class="handle">@${esc(m.username)}</span>
    </span>`;

  li.innerHTML = `
    ${avatarHTML(m, 'sm')}
    <div class="bubble">
      ${who}
      ${media}
      ${m.text ? `<span>${esc(m.text)}</span>` : ''}
      <div class="time">${hhmm(m.createdAt)}</div>
    </div>`;

  const nameEl = li.querySelector('.who');
  if (nameEl) nameEl.onclick = (e) => openProfileMenu(e, m.username);

  li.querySelectorAll('.media').forEach((el) => el.onclick = () => openLightbox(m));

  return li;
}

function appendMessage(m, scroll) {
  const box = $('messages');
  box.querySelector('.system')?.textContent?.startsWith('Nada por aqui') && box.replaceChildren();
  const nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 160;
  box.appendChild(buildMessage(m));
  if (scroll && (nearBottom || m.username === me.username)) box.scrollTop = box.scrollHeight;
}

/* ============================================================
   MENU AO CLICAR NUM NOME (chat global)
   ============================================================ */
function openProfileMenu(e, username) {
  e.stopPropagation();
  menuTarget = username;
  const menu = $('profile-menu');
  menu.style.display = 'block';
  const x = Math.min(e.clientX, window.innerWidth - 200);
  const y = Math.min(e.clientY, window.innerHeight - 110);
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
}

$('pm-open').onclick = async () => {
  $('profile-menu').style.display = 'none';
  await saveContact(menuTarget);
  openRoom(dmRoom(me.username, menuTarget), menuTarget);
};
$('pm-save').onclick = async () => {
  $('profile-menu').style.display = 'none';
  await saveContact(menuTarget);
  toast('Contato salvo.');
};

/* ============================================================
   LIGHTBOX
   ============================================================ */
function openLightbox(m) {
  const box = $('lightbox-content');
  box.innerHTML = m.fileType === 'image'
    ? `<img src="${esc(m.fileUrl)}" alt="">`
    : `<video src="${esc(m.fileUrl)}" controls autoplay></video>`;
  $('lightbox').classList.add('open');
}
$('lightbox').onclick = () => {
  $('lightbox').classList.remove('open');
  $('lightbox-content').innerHTML = '';
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    $('lightbox').classList.remove('open');
    $('profile-modal').classList.remove('open');
    $('profile-menu').style.display = 'none';
  }
});

/* ============================================================
   ENVIO DE MENSAGEM E MÍDIA
   ============================================================ */
$('attach').onclick = () => $('file').click();

$('file').onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > MAX_BYTES) {
    toast('Arquivo acima de 100 MB. Comprima antes de enviar.', true);
    e.target.value = '';
    return;
  }
  const kind = file.type.startsWith('video') ? 'video' : 'image';
  const reader = new FileReader();
  reader.onload = () => {
    pendingFile = { dataUrl: reader.result, kind, name: file.name };
    const preview = $('preview');
    preview.style.display = 'block';
    preview.innerHTML = kind === 'image'
      ? `<img src="${reader.result}" alt="Pré-visualização"><button type="button" id="drop">×</button>`
      : `<video src="${reader.result}" muted></video><button type="button" id="drop">×</button>`;
    $('drop').onclick = clearPending;
  };
  reader.readAsDataURL(file);
  e.target.value = '';
};

function clearPending() {
  pendingFile = null;
  $('preview').style.display = 'none';
  $('preview').innerHTML = '';
}

$('form').onsubmit = (e) => {
  e.preventDefault();
  const input = $('input');
  const text = input.value.trim();
  if (!text && !pendingFile) return;
  if (!socket?.connected) return toast('Sem conexão com o servidor.', true);

  const payload = { text };
  if (pendingFile) payload.file = pendingFile.dataUrl;

  $('send').disabled = true;
  if (pendingFile) $('upload-bar').style.width = '70%';

  socket.emit('chat message', payload, (ack) => {
    $('send').disabled = false;
    $('upload-bar').style.width = '100%';
    setTimeout(() => ($('upload-bar').style.width = '0'), 300);
    if (ack?.status === 'error') toast(ack.message, true);
  });

  input.value = '';
  clearPending();
};

$('input').oninput = () => {
  if (!socket?.connected) return;
  socket.emit('typing', true);
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => socket.emit('typing', false), 1200);
};

$('btn-clear').onclick = () => {
  if (!peer) return;
  if (!confirm('Apagar todas as mensagens desta conversa para os dois? Não dá para desfazer.')) return;
  socket.emit('request clear', room, (ack) => {
    if (ack?.status === 'error') toast(ack.message, true);
  });
};

/* ============================================================
   PERFIL + TEMAS
   ============================================================ */
$('me').onclick = openProfile;
$('btn-theme').onclick = openProfile;
$('pf-close').onclick = () => { $('profile-modal').classList.remove('open'); applyTheme(me.theme); };

let draftTheme = 'cyan';
let draftAvatarData = null;

function openProfile() {
  draftTheme = me.theme;
  draftAvatarData = null;
  $('pf-name').value = me.displayName;
  $('pf-url').value = me.avatarUrl || '';
  $('pf-avatar').outerHTML = avatarHTML(me, 'avatar-lg').replace('class="avatar', 'id="pf-avatar" class="avatar');
  $('pf-status').textContent = '';
  applyTheme(draftTheme);
  $('profile-modal').classList.add('open');
}

$('swatches').onclick = (e) => {
  const swatch = e.target.closest('.swatch');
  if (!swatch) return;
  draftTheme = swatch.dataset.t;
  applyTheme(draftTheme); // preview imediato
};

$('pf-upload-btn').onclick = () => $('pf-file').click();
$('pf-file').onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) return toast('Escolha uma imagem de até 5 MB.', true);
  const reader = new FileReader();
  reader.onload = () => {
    draftAvatarData = reader.result;
    $('pf-url').value = '';
    $('pf-avatar').outerHTML =
      `<img id="pf-avatar" class="avatar avatar-lg" src="${reader.result}" alt="Pré-visualização">`;
  };
  reader.readAsDataURL(file);
};

$('pf-save').onclick = async () => {
  const status = $('pf-status');
  status.className = 'status';
  status.textContent = 'Salvando...';
  $('pf-save').disabled = true;

  const body = { displayName: $('pf-name').value.trim(), theme: draftTheme };
  if (draftAvatarData) body.avatarData = draftAvatarData;
  else body.avatarUrl = $('pf-url').value.trim();

  try {
    const res = await api('/api/profile', { method: 'PUT', body: JSON.stringify(body) });
    me = res.profile;
    applyTheme(me.theme);
    paintMe();
    $('profile-modal').classList.remove('open');
    toast('Perfil atualizado.');
  } catch (err) {
    status.className = 'status err';
    status.textContent = err.message;
    applyTheme(me.theme);
  } finally {
    $('pf-save').disabled = false;
  }
};

start();
</script>
</body>
</html>
