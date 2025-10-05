import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open',()=>{console.log('connected to server')});
ws.on('message',(msg)=>{console.log('Received: ',msg.toString())});
ws.on('close',()=>{console.log('Connection Closed')});