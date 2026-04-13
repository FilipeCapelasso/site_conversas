const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  maxHttpBufferSize: 1e8 // 100MB
});

app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  const room = socket.handshake.query.room || 'global';
  const username = socket.handshake.query.username || 'Anônimo';
  
  socket.join(room);

  socket.on('chat message', (data) => {
    const messageData = {
      text: data.text || "",
      file: data.file || null,
      fileType: data.fileType || null,
      username: username,
      room: room
    };

    // 1. Envia para quem está na sala aberta
    io.to(room).emit('chat message', messageData);

    // 2. Lógica de Notificação para o destinatário (fora da sala)
    if (room.includes('_')) {
      const partes = room.split('_');
      const destinatario = partes.find(name => name !== username);
      
      // Envia um alerta para o destinatário adicionar o contato à lista
      io.emit('notify contact', {
        to: destinatario,
        from: username
      });
    }
  });

  socket.on('request clear', (roomToDelete) => {
    io.to(roomToDelete).emit('clear messages');
  });

  socket.on('disconnect', () => {
    socket.leave(room);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
