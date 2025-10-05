import WebSocket, { WebSocketServer } from 'ws';
import ollama from 'ollama';

const wss = new WebSocketServer({ port: 8080 });

console.log("🚀 WebSocket server is running on ws://localhost:8080");

wss.on('connection', (ws) => {
  console.log('Client connected ✅');

  ws.on('message', async (data) => {
    const text = data.toString().trim();
    if (!text) return;
    console.log('recived: ' + text);
    try {
      // Gọi Ollama API
      const response = await ollama.chat({
        model: 'phi3:mini', // có thể đổi sang model khác bạn đã pull, ví dụ 'mistral', 'llava', v.v.
        messages: [{ role: 'user', content: text }],
      });
      console.log('Sending...');
      // Gửi kết quả trả về client
      ws.send(JSON.stringify({
        type: "reply",
        question: text,
        answer: response.message.content,
      }));
      console.log('Completed with answer: ' + response.message.content);
    } catch (err) {
      console.error("❌ Error:", err);
      ws.send(JSON.stringify({
        type: "error",
        message: err.message,
      }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected ❌');
  });
});