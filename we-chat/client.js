import WebSocket from "ws";
import readline from "readline";

const ws = new WebSocket('ws://localhost:8080'); // s1: Connect to server

const rl = readline.createInterface({ // for terminal prupose
    input: process.stdin,
    output: process.stdout,
});

ws.on('open', () => { // s2: When connected
    console.log('Connected to server');
    rl.setPrompt('You: ');
    rl.prompt();

    rl.on('line', (line) => {
        ws.send(line); // s3: send message
        rl.prompt();
    });
});

ws.on('message', (message) => { // s4: when message recieved
    console.log(`\nFriend: ${message}`);
    rl.prompt();
});

ws.on('close', () => { // s5: when disconnected
    console.log('Disconnected from server');
    process.exit(0);
})