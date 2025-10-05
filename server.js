import fs from 'fs';
import { spawn } from 'child_process';
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected ✅');

    ws.on('message', (data) => {
        console.log('Received:', data.toString());
    });

    ws.on('close', () => {
        console.log('Client disconnected ❌');
    });
});