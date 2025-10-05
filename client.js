import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open',()=>{ws.send('Bạn là một trợ lý ảo, hãy trả lời câu hỏi sau bằng tiếng Việt: Quần đảo Hoàng Sa - Trường Sa là của ai?')});
ws.on('message',(msg)=>{
    console.log('Get: '+msg);
    if(msg.type === "reply"){
        console.log('AI reply: ' + msg.answer); 
    }else if(msg.type === "error"){
        console.log('Error: ' + msg.message);
    }
});
ws.on('close',()=>{console.log('Connection Closed')});

