class WebSocketEventManager {
  constructor(url, onOpen) {
    this.events = {};
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log(`WebSockete opened at ${url}`);
      if(onOpen) onOpen();
    };

    this.ws.onmessage = (message) => {
      message = JSON.parse(message.data);
      if(!message.event) {
        console.log(`Invalid message received: ${message}`);
        return;
      }
      console.log(`Event ${message.event} received`);
      if(this.events[message.event]) this.events[message.event](message.data);
    };
  }

  addEventHandler(event, callback) {
    this.events[event] = callback;
  }

  sendMessage(event, data) {
    this.ws.send(JSON.stringify({ event, data }));
  }
}

export default WebSocketEventManager;
