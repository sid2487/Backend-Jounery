import { WebSocketServer } from "ws"; // s1: Import the WebSocketServer class

const wss = new WebSocketServer({ port: 8080 }); // s2: Create a WebSocket server on port 8080

const clients = new Set();

wss.on('connection', function connectionc(ws) { // s3: Listen for client connections
    clients.add(ws);
    console.log('New Client connected');

    ws.on('message', function incoming(message) { // s4: Listen for messages from that client
        console.log(`Recieved: ${message}`);

        // broadcast to all other clients
        for(const client of clients){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message.toString()); // s5: Reply back to the same client or all in the connection
            }
        }
        
    });

    ws.on('close', () => { // s6: Handle disconnection
        clients.delete(ws);
        console.log('Clint disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
