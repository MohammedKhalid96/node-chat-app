const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send('Chat app!');
// });

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});