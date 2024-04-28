import WebSocket, { WebSocketServer } from "ws";

import http from "http";

const runSocketServer = (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      console.log(`Received message => ${message}`);
    });

    ws.send("Hello! Message From Server!!");
  });
};

export default runSocketServer;
