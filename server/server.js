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

    // socket.emit('newMessage', { // socket.emit: emit the message to single connection
    //     from: "mohamednaser@gmail.com",
    //     text: "Hey",
    //     createdAt: 12
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime() 
        }); // emit the message to every single connection
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}); 

server.listen(port, () => {
    console.log(`app listening on port ${port}`);
});