import { ClientOptions, WebSocket, Server as WebSocketServer } from "ws";

import { Duplex } from "stream";
import { IncomingMessage } from "http";

export const wss1 = new WebSocketServer({ noServer: true });

const handleUpgrade1 = (
  request: IncomingMessage,
  socket: Duplex,
  head: Buffer
) => {
  wss1.handleUpgrade(request, socket, head, function done(ws) {
    wss1.emit("connection", ws, request);
  });
};

const showClients = () => {
  console.log("wss1.clients.size = ", wss1.clients.size);
};

wss1.on("connection", (ws: WebSocket) => {
  showClients();
  // 收到前端訊息
  ws.on("message", function message(data) {
    //step1: 發送看板資訊給所有 client
    console.log("received: %s", data);
    wss1.clients.forEach((client) => {
      console.log("client => ", client);
      client.send(
        JSON.stringify({
          status: false,
          message: "測試message",
          data: ["aaa", "bbb"],
        })
      );
    });
  });
});

wss1.on("error", console.error);

export default handleUpgrade1;
