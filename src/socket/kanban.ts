import { ClientOptions, WebSocket, Server as WebSocketServer } from "ws";

import { Duplex } from "stream";
import { IncomingMessage } from "http";

interface Iclient_group {
  [key: string]: WebSocket[];
}

export const wssKanban = new WebSocketServer({ noServer: true });
// 用來存放 client group
const client_group: Iclient_group = {}
// 顯示連線數量
const showClients = () => {
  console.log("kanban.clients.size = ", wssKanban.clients.size);
};

wssKanban.on("connection", (ws: WebSocket) => {
  
  showClients();
  // 收到前端訊息
  ws.on("message", function message(data) {
    const {kanbanId} = JSON.parse(data.toString());
    // step1: 將 user 依照看板分類成不同的 client group
    setClientGroup(ws, kanbanId);
    // step2: 發送訊息給當前 client
    
  });
});



wssKanban.on("error", console.error);

// 設定 client group
const setClientGroup = (ws: WebSocket, kanbanId: string) => {
  if (!kanbanId || !ws) return;
  // 如果 client_group 中沒有這個 kanbanId，則新增一個
  if (!client_group[kanbanId]) {
    client_group[kanbanId] = [ws];
    return
  } 
  // 如果 client_group 中有這個 kanbanId且沒有這個 ws，則新增一個
  if (client_group[kanbanId].indexOf(ws) === -1) {
    client_group[kanbanId].push(ws);
  }
}

// 發送訊息給所有 client
export const sendToKanbanClients = (kanbanId: string, data: any) => {
  // 取得指定 kanbanId 的 client group
  const clients = client_group[kanbanId];
  if (!clients) return;
  // 發送訊息給所有 client
  clients.forEach((client) => client.send(data)); 
};

export default wssKanban;
