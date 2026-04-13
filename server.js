const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { maxHttpBufferSize: 1e8 });

app.disable('x-powered-by');
const usersOnline = {};

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

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
      isSystem: data.isSystem || false // Identifica mensagens automáticas
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

  socket.on('request clear', (roomToDelete) => io.to(roomToDelete).emit('clear messages'));

  socket.on('disconnect', () => {
    if (usersOnline[username] === socket.id) delete usersOnline[username];
  });
});

server.listen(process.env.PORT || 3000, '0.0.0.0');
