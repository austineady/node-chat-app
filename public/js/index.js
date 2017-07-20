var socket = io(); // make a request from client to server to keep connection open
// Events can be emitted from the client to the server, or the other way around
socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', function(data) {
    console.log('Got new message', data);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});
