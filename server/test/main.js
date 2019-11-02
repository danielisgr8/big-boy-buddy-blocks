const ws = new WebSocket("ws://localhost:1234");

ws.onopen = () => {
  console.log("opened");

  ws.send(JSON.stringify({
    event: "c_join",
    data: {
      name: Math.random().toString()
    }
  }));
};

ws.onmessage = (message) => {
  console.log(message.data);
}
