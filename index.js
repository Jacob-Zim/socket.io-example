'use strict';
const express = require('express');
const socket = require('socket.io');

const { PORT } = require('./config');

const app = express();

const server = app.listen(PORT, () => {
  console.info(`App listening on port ${server.address().port}`);
})
  .on('error', err => {
    console.error('Express failed to start');
  });

  app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

});