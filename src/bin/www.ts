import { AddressInfo } from "net";
import { WebSocketServer } from "ws";
import app from "../app";
import debug from "debug";
import dotenv from "dotenv";
import wssKanban from "../socket/kanban";
import http from "http";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../config.env"),
});
const PORT = process.env.PORT || "3000";

// TODO: 將 port 設定到 app 物件上
app.set("PORT", PORT);
console.log("listen port => ", PORT);

const server = http.createServer(app)

server.on("upgrade", function upgrade(request, socket, head) {
  
  
  if (request.url?.includes("/kanban")) {
    wssKanban.handleUpgrade(request, socket, head, function done(ws) {
      wssKanban.emit('connection', ws, request);
    });
  
  }
});

server.listen(PORT);