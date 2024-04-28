import { AddressInfo } from "net";
import { WebSocketServer } from "ws";
import app from "../app";
import debug from "debug";
import dotenv from "dotenv";
import handleUpgrade1 from "../socket/socket1";
import http from "http";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../config.env"),
});
const PORT = process.env.PORT || "3000";

// TODO: 將 port 設定到 app 物件上
app.set("PORT", PORT);
console.log("listen port => ", PORT);

const server = http.createServer(app).listen(PORT);

server.on("upgrade", function upgrade(request, socket, head) {
  console.log("request.url => ", request.url);
  if (request.url?.includes("/foo")) {
    handleUpgrade1(request, socket, head);
  } else {
    socket.destroy();
  }
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// 在服务器监听端口时调用的函数。
function onListening(): void {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  const hostname = addr.address === "::" ? "localhost" : addr.address;
  const serverUrl = `http://${hostname}:${addr.port}/`;
  console.log(`Server running at ${serverUrl}`);
  debug("Listening on " + bind);
}
