import WebSocket, { WebSocketServer } from 'ws';
import ollama from 'ollama';

const wss = new WebSocketServer({ port: 8080 });

console.log("🚀 WebSocket server is running on ws://localhost:8080");

wss.on('connection', (ws) => {
  console.log('Client connected ✅');

  ws.on('message', async (data) => {
    const text = data.toString().trim();
    if (!text) return;
    try {
      console.log('🤖 AI thinking...');
      // Gọi Ollama API
      const response = await ollama.chat({
        model: 'qwen2.5:7b-instruct-q4_K_M',
        messages: [{ role: 'user', content: text }],
        stream: true,
        options:{
          num_ctx : 2048,
          num_gpu : 1,
          num_thread : 8
        }
      });
      console.log('📨 Sending to client...');
      // Gửi kết quả trả về client
      for await (const chunk of response) {
        ws.send(JSON.stringify({
          type: "stream",
          question: text,
          answer: chunk.message.content,
        }));
      }
      ws.send(JSON.stringify({
        type: "done",
        message: "Completed",
      }));

      console.log('📬 Completed!');
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