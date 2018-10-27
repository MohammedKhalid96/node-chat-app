const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// listen to new connections
io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit: emit the message to single connection 
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!')); 

    // will send the message to all but this socket.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        // emit the message to every single connection
        io.emit('newMessage', generateMessage(message.from, message.text)); 

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createServer: new Date().getTime()
        // }); // will send the message to all but this socket. 
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}); 

server.listen(port, () => {
    console.log(`app listening on port ${port}`);
});