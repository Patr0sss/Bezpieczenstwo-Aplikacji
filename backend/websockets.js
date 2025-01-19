const express = require('express');
const { Server } = require('socket.io');
const  dbUpdate = require('addMessageDB.js');
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
        console.log(`User Connected: ${socket.id}`);

        socket.on("join_room", (data) => {
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
         });

        socket.on("send_message", (data) => {
            socket.to(data.room).emit("receive_message", data.message);
            dbUpdate(data.sender_id, data.receiver_id, data.message,);

        });
    });

    

    // Your other functions here
    return io;
};

// Export both the Express app instance and the getIo function
module.exports = {
    appWebSocket,
    getIo
};