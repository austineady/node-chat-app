const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // returns a web socket server

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app'
    });

    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined'
    });

    socket.on('createMessage', ({ from, text }) => {
        const msg = {
            from,
            text,
            createdAt: new Date().getTime()
        };
        console.log('Message from Client:');
        console.log(JSON.stringify(msg, undefined, 2));
        io.emit('newMessage', msg);
        // socket.broadcast.emit('newMessage', {
        //     from,
        //     text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
