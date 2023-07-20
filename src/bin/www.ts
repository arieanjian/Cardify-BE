import { AddressInfo } from "net";
import dotenv from "dotenv";
import app from "../app";
import debug from "debug";
import http from "http";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../config.env"),
});
const port = normalizePort(process.env.PORT || "3000");

console.log("listen port => ", port);

app.set("port", port);

const server = http.createServer(app).listen(port);

server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  const hostname = addr.address === "::" ? "localhost" : addr.address;
  console.log(`Server running at http://${hostname}:${addr.port}/`);
  debug("Listening on " + bind);
}
