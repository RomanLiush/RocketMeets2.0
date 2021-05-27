const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const PORT = process.env.PORT || 3001;
const path = require('path');
const cors = require('cors');

const authRouter = require('./routes/auth.router');
const corsMiddleware = require('./middleware/cors.middleware');

const corsOptions ={
  origin:'http://localhost:3001',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors('*'));

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter);

let socketList = {};

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Route
app.get('/ping', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});

// Socket
io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('User disconnected!');
  });

  socket.on('BE-check-user', ({ roomId, userName }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit('FE-error-user-exist', { error });
    });
  });

  /**
   * Join Room
   */
  socket.on('BE-join-room1', ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });
});

// http.listen(PORT, () => {
//   console.log('Connected : 3001');
// });
const PORT = config.get('serverPort')
const start = async () => {
  try {

    await mongoose.connect(config.get('dbUrl'))

    // app.listen(PORT, () => {
    //   console.log('Connected on PORT: ', PORT)
    // })
    / http.listen(PORT, () => {
        console.log('Connected : 3001');
      });

  } catch (err) {

  }
}

start()
