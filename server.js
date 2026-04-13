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
    io.to(room).emit('chat message', {
      text: data.text || "",
      file: data.file || null,
      fileType: data.fileType || null,
      username: username
    });
  });

  // Evento para apagar o histórico de ambos em tempo real
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
