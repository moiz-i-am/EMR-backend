// // make bluebird default Promise
// Promise = require('bluebird'); // eslint-disable-line no-global-assign
// const { port, env } = require('./config/vars');
// const logger = require('./config/logger');
// const app = require('./config/express');
// const mongoose = require('./config/mongoose');

// // open mongoose connection
// mongoose.connect();

// // listen to requests
// app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

// /**
// * Exports express
// * @public
// */
// module.exports = app;


// running with socket server


// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

const http = require('http');

const server = http.createServer(app);
const socket = require('socket.io');

const io = socket(server);

// open mongoose connection
mongoose.connect();

const users = {};

io.on('connection', socket => {
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  socket.emit('yourID', socket.id);
  console.log(`user is connected with socket id: ${socket.id}`);

  io.sockets.emit('allUsers', users);

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log(`user is disconnected with socket id: ${socket.id}`);
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
  });

  socket.on('acceptCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  // syncing editor start
  socket.on('new-operations', (data) => {
    io.to(data.partnerId).emit('new-remote-operations', data);
  });
  // syncing editor end

  // call ending start
  socket.on('call-ending', (data) => {
    io.to(data.partnerId).emit('new-call-end', data);
  });
  // call ending end
});


// listen to requests
server.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
