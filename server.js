require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e8 // 100MB para ficheiros
});

// Segurança: Remove cabeçalhos que identificam o servidor
app.disable('x-powered-by');

// URL Secreta do arquivo .env (O frontend nunca verá isto)
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

if (!SCRIPT_URL) {
    console.error("ERRO CRÍTICO: GOOGLE_SCRIPT_URL não definida no arquivo .env");
    process.exit(1);
}

const usersOnline = {};

// --- ROTAS PROXY DE SEGURANÇA ---

// Rota de Login Blindada
app.get('/api/login', async (req, res) => {
    try {
        const { user, pass } = req.query;
        const response = await axios.get(`${SCRIPT_URL}?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ status: "error", message: "Falha de comunicação." });
    }
});

// Rota de Busca de Usuários Blindada
app.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`${SCRIPT_URL}?action=buscarUsuarios&query=${encodeURIComponent(query)}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ status: "error", data: [] });
    }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  const room = socket.handshake.query.room || 'global';
  const username = socket.handshake.query.username || 'Anônimo';
  
  if (username !== 'Anônimo') usersOnline[username] = socket.id;
  socket.join(room);

  socket.on('chat message', (data) => {
    const messageData = {
      text: data.text || "",
      file: data.file || null,
      fileType: data.fileType || null,
      username: username,
      room: room,
      isSystem: data.isSystem || false 
    };

    io.to(room).emit('chat message', messageData);

    if (room.includes('_')) {
      const destinatario = room.split('_').find(name => name !== username);
      const targetSocketId = usersOnline[destinatario];
      if (targetSocketId) {
        io.to(targetSocketId).emit('notify contact', {
          to: destinatario,
          from: username,
          room: room
        });
      }
    }
  });

  socket.on('request clear', (roomToDelete) => {
    io.to(roomToDelete).emit('clear messages');
  });

  socket.on('disconnect', () => {
    if (usersOnline[username] === socket.id) delete usersOnline[username];
    socket.leave(room);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor a rodar na porta ${PORT} | OmniGuard Ativo`);
});
