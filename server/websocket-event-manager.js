class WebSocketEventManager {
  constructor(wss) {
    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        this.handleEvent(ws, message);
      });

      // TODO: handle client disconnect
    });

    this.wss = wss;
    this.events = {};
  }

  addEventHandler(eventName, callback) {
    this.events[eventName] = callback;
  }

  handleEvent(ws, message) {
    console.log(message);
    message = JSON.parse(message);
    if(this.events[message.event]) this.events[message.event](ws, message.data);
  }

  sendMessage(ws, event, data) {
    ws.send(JSON.stringify({
      event,
      data
    }));
  }

  broadcastMessage(event, data, wsIgnore) {
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
