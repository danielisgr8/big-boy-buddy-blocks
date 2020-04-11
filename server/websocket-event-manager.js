const uuid = require("uuid");

const events = require("../client/src/events");

class WebSocketEventManager {
  constructor(wss) {
    wss.on("connection", (ws) => {
      ws.id = uuid.v4();

      ws.on("message", (message) => {
        this.handleEvent(ws, message);
      });

      ws.on("close", (code, reason) => {
        this.handleEvent(ws, JSON.stringify({ event: events.c_playerLeft, data: { code, reason } }));
      });
    });

    this.wss = wss;
    this.events = {};
  }

  addEventHandler(eventName, callback) {
    this.events[eventName] = callback;
  }

  handleEvent(ws, message) {
    console.log(`Receiving: ${message}`);
    message = JSON.parse(message);
    if(this.events[message.event]) this.events[message.event](ws, message.data);
  }

  sendMessage(ws, event, data) {
    console.log(`Sending: ${{ event, data }}`);
    ws.send(JSON.stringify({
      event,
      data
    }));
  }

  broadcastMessage(event, data, wsIgnore) {
    console.log(`Sending: ${JSON.stringify({ event, data })}`);
    this.wss.clients.forEach((ws) => {
      if(ws === wsIgnore) return;
      ws.send(JSON.stringify({
        event,
        data
      }));
    });
  }
}

module.exports = WebSocketEventManager;
