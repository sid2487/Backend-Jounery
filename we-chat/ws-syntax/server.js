import { WebSocketServer } from "ws"; // 1️⃣ Import the WebSocketServer class

const wss = new WebSocketServer({ port: 8080 }); // 2️⃣ Create a WebSocket server on port 8080

wss.on('connection', (ws) => {  // 3️⃣ Listen for client connections
    console.log('New client connected');

    ws.on('message', (message) => { // 4️⃣ Listen for messages from that client
        console.log(`Received: ${message}`);
        ws.send(`Echo: ${message}`); // 5️⃣ Reply back to the same client
    });

    ws.on('close', () => { // 6️⃣ Handle disconnection
        console.log('Client disconnected');
    });
});
