const WebSocket = require("ws");

const WebSocketEventManager = require("./websocket-event-manager");
const events = require("./events");
const Player = require("./player");

const port = 1234;
const wss = new WebSocket.Server({ port }, () => {
  console.log(`WebSocket server started on port ${port}`)
});

const wsem = new WebSocketEventManager(wss);

let playerCount = 0;
const players = {};

wsem.addEventHandler(events.c_join, (ws, data) => {
  const id = playerCount++;
  console.log(`Player join: ${data.name}`);
  players[ws] = new Player(id, data.name);

  wsem.broadcastMessage(events.playerJoined, { name: data.name }, ws);
});

wsem.addEventHandler(events.c_pieceMoved, (ws, data) => {
  const outgoingData = {
    player: players[ws].name,
    position: data.position
  }
  wsem.broadcastMessage(events.s_updatePiece, outgoingData, ws);
});

wsem.addEventHandler(events.c_playerLeft, (ws) => {
  wsem.broadcastMessage(events.s_playerLeft, { name: players[ws].name });
});

// TODO: make player manager
// TODO: handle player leaving
