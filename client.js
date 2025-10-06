import WebSocket from 'ws';
import readline from 'readline';

const ws = new WebSocket('ws://localhost:8080');

let curAnswer = '';
let rl;
const prompt = 'Bạn là một người bạn nữ đáng yêu của tôi, tên bạn là Ánh. Hãy trả lời ngắn gọn và súc tích như một cuộc hội thoại. Chỉ tạo Text!\n';
ws.on('open',()=>{
    rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'You > '
    });

    rl.prompt();

    rl.on('line', (line) => {
        const text = line.trim();
        if(text.toLowerCase() === 'exit' || text.toLowerCase() === 'quit'){
            rl.close();
            ws.close();
            return;
        }
        if(text){
            curAnswer = '';
            ws.send(text);
            process.stdout.write('AI > ');
        }
    });
});
ws.on('message',(msg)=>{
    msg = JSON.parse(msg);
    if(msg.type === "stream"){
        curAnswer += msg.answer;
        while(curAnswer.indexOf(' ') !== -1){
            var text = curAnswer.slice(0, curAnswer.indexOf(' '));
            curAnswer = curAnswer.slice(curAnswer.indexOf(' ')+1);
            if(text.trim() == ''){
                console.log('');
            }else{
                process.stdout.write(text + ' ');
            }
        }
    }else if(msg.type === "error"){
        console.log('Error: ' + msg.message);
    }else if(msg.type === "done"){
        console.log(curAnswer);
        rl.prompt();
    }
});
ws.on('close',()=>{console.log('Connection Closed')});

