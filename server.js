const express = require("express");
const WebSocket = require("ws");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("🔌 客戶端已連線");

  ws.on("message", (message) => {
    console.log("📨 收到訊息：", message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("✅ WebSocket server 已啟動");
});
