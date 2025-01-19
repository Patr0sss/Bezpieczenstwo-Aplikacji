const express = require('express');
const { Server } = require('socket.io');

const appWebSocket = express();

const getIo = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        // Your socket connection logic here
        console.log("connection established")
        io.emit("hello");
    });

    

    // Your other functions here
    return io;
};

// Export both the Express app instance and the getIo function
module.exports = {
    appWebSocket,
    getIo
};