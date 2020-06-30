const socketIO = require('socket.io');

const server = {
  onLineUsers: {},
  init: function (httpServer) {
    const io = socketIO(httpServer);
    io.on('connection', (socket) => {
      socket.on('login', (user) => {
        const { userId } = user;
        socket.key = userId;
        if (!this.onLineUsers[userId]) {
          this.onLineUsers[userId] = user;
        }
        console.info('join', user);
        io.emit('join', user);
      });
      socket.on('disconnect', () => {
        if (this.onLineUsers[socket.key]) {
          console.log('leave', this.onLineUsers[socket.key]);
          io.emit('leave', this.onLineUsers[socket.key]);
          delete this.onLineUsers[socket.key];
        }
      });
      socket.on('message', (msg) => {
        console.info('message', msg);
        io.emit('message', msg);
      });
    });
  },
};

module.exports = server;
