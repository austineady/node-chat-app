const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // returns a web socket server

const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', socket => {
    // Welcome only the new user to chat room
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // Let everyone else know a new user has joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', ({ from, text }) => {
        io.emit('newMessage', generateMessage(from, text));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
