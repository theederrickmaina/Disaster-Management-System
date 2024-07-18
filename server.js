const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Basic data collection endpoint
app.post('/data', (req, res) => {
  console.log(req.body);
  res.status(200).send('Data received');
});

// WebSocket setup
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('message', (message) => {
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
