const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Aumentando o limite para 100MB para aguentar vídeos em Base64
const io = new Server(server, {
  maxHttpBufferSize: 1e8 
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
    // Agora o dado pode ser texto ou um objeto com arquivo
    io.to(room).emit('chat message', {
      text: data.text || data,
      file: data.file || null,
      fileType: data.fileType || null,
      senderId: socket.id,
      username: username // Envia o nome de quem mandou
    });
  });

  socket.on('ping-test', (startTime) => {
    socket.emit('pong-test', startTime);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
