"use strict";
const io = require("socket.io")(9000, {
    cors: {
        origin: "http://localhost:3000"
    }
});
io.on("connection", (socket) => {
    console.log("New user is connect");
    socket.on("Registered", (data) => {
        console.log(data);
        console.log("USER REGISTERED");
        io.emit("NewUserRegistered", data);
        //socket.broadcast.emit("NewUserRegistered")
    });
    socket.on("disconnect", (id) => {
        console.log("disconnected");
        console.log("removing ", socket.id);
        io.emit("getMessage");
    });
});
