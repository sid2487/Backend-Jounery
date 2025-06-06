const ws = new WebSocket('ws://localhost:8080'); // 1️⃣ Connect to server

ws.onopen = () => { // 2️⃣ When connected
    console.log('Connected');
    ws.send("Hello server"); // 3️⃣ Send message
};

ws.onmessage = (event) => { // 4️⃣ When message received
    console.log(`Server says: ${event.data}`);
};

ws.onclose = () => { // 5️⃣ When disconnected
    console.log('Disconnected');
};
