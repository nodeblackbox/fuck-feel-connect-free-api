const express = require('express');
const path = require('path');
const ejs = require('ejs');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

require('dotenv').config();

const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('index'); // For the masseuse
});

app.get('/receiver', (req, res) => {
    res.render('receiver'); // For the receiver
});
app.get('/queuing', (req, res) => {
    res.render('queuing'); // For the receiver
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('sendCommand', (command) => {
        console.log('Command received: ', command);
        io.emit('receiveCommand', command); // Emit to all clients
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
