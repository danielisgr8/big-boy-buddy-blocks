const WebSocket = require("ws");

const WebSocketEventManager = require("./websocket-event-manager");
const events = require("../client/src/events");
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
  console.log(`Player join: ${data.name} (${id})`);
  wsem.sendMessage(ws, events.s_playersJoined, { names: Object.keys(players).map(key => players[key].name) });
  players[ws] = new Player(id, data.name);

  wsem.broadcastMessage(events.s_playersJoined, { names: [data.name] }, ws);
});

wsem.addEventHandler(events.c_blockMoved, (ws, data) => {
  const outgoingData = {
    player: players[ws].name,
    movement: data.movement
  }
  wsem.broadcastMessage(events.s_blockMoved, outgoingData, ws);
});

wsem.addEventHandler(events.c_newBlock, (ws, data) => {
  const outgoingData = {
    player: players[ws].name,
    blockType: data.blockType,
    points: data.points
  }

  wsem.broadcastMessage(events.s_newBlock, outgoingData, ws);
});

wsem.addEventHandler(events.c_playerLeft, (ws) => {
  wsem.broadcastMessage(events.s_playerLeft, { name: players[ws].name });
});

// TODO: make player manager
// TODO: handle player leaving
