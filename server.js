const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    return res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/ping', function (req, res) {
    return res.send('pong');
});
