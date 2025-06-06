import { Server } from "socket.io"; // 1️⃣ Import Socket.IO server

const io = new Server(8080); // 2️⃣ Start Socket.IO server on port 8080

io.on("connection", (socket) => { // 3️⃣ Listen for new client connection
    console.log("New client connected");

    socket.on("message", (data) => { // 4️⃣ Listen for "message" events
        console.log(`Received: ${data}`);
        socket.emit("reply", `Echo: ${data}`); // 5️⃣ Reply to same client
    });

    socket.on("disconnect", () => { // 6️⃣ Handle disconnection
        console.log("Client disconnected");
    });
});
