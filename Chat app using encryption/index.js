import express from 'express';
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

// Handle connection
io.on('connection', (socket) => {
    console.log('A user is connected', socket.id);
    
    // Listen for messages from the client
    socket.on('client-message', (msg) => {
        console.log(`Received message from Client (${socket.id}): ${msg}`);        
        // Broadcast the message to all clients (including the sender) using 'client-message' event
        // io.emit('client-message', msg);
        socket.broadcast.emit('client-message', msg);
    });
    
    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});

app.use(express.json());

// Start the server on port 3000
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
