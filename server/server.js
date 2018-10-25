const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// listen to new connections
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: "mohamednaser@gmail.com",
        text: "Hey",
        createdAt: 12
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}); 

server.listen(port, () => {
    console.log(`app listening on port ${port}`);
});