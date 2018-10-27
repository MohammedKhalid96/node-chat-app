var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: "ahmed@gmail.com",
    //     text: "Hey!"
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var span = jQuery('<span></span');
    li.text(`${message.from}: ${message.text}`);
    span.text(`${formattedTime}`);

    jQuery('#messages').append(li, span);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var span = jQuery('<span></span');
    var a = jQuery('<a target="_blank">Current location</a>');

    li.text(`${message.from}: `);
    span.text(`${formattedTime}`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li, span);
});

// socket.emit('createMessage', {
//     from: 'Ahmed',
//     text: 'Hi!'
// }, function (data) {
//     console.log('Got it', data); // make sure that the message recieved by the server successfully
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTexBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: "User", 
        text: messageTexBox.val()
    }, function () {
        messageTexBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location!');
    });
});
