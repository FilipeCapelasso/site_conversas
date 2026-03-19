const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// STEALH: Remove o header que indica o uso de Express
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // Pega o nome da sala da query da URL (ex: ?room=minha-sala)
  const room = socket.handshake.query.room || 'global';
  socket.join(room);

  socket.on('chat message', (msg) => {
    // Envia apenas para os membros daquela sala específica
    io.to(room).emit('chat message', {
      text: msg,
      senderId: socket.id
    });
  });

  // Comando de Ping (calcula o tempo de resposta)
  socket.on('ping-test', (startTime) => {
    socket.emit('pong-test', startTime);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
