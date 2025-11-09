// server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("🔌 客戶端已連線");

  ws.on("message", (message) => {
    console.log("📨 收到訊息：", message);
    // 廣播給所有連線者
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
