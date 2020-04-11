const WebSocket = require("ws");

const WebSocketEventManager = require("./websocket-event-manager");
const events = require("../shared/src/events");
const Player = require("./player");

const port = 1234;
const wss = new WebSocket.Server({ port }, () => {
  console.log(`WebSocket server started on port ${port}`)
});

const wsem = new WebSocketEventManager(wss);

let playerCount = 0;
const players = {};

wsem.addEventHandler(events.c_join, (ws, data) => {
  playerCount++;
  console.log(`Player join: ${data.name}`);
  if(playerCount > 1) wsem.sendMessage(ws, events.s_playersJoined, { names: Object.keys(players).map(key => players[key].name) });
  players[ws.id] = new Player(data.name);

  wsem.broadcastMessage(events.s_playersJoined, { names: [data.name] }, ws);
});

wsem.addEventHandler(events.c_playerLeft, (ws) => {
  playerCount--;
  const name = players[ws.id].name;
  delete players[ws.id];

  wsem.broadcastMessage(events.s_playerLeft, { name });
});

wsem.addEventHandler(events.c_blockMoved, (ws, data) => {
  const outgoingData = {
    player: players[ws.id].name,
    movement: data.movement
  }
  wsem.broadcastMessage(events.s_blockMoved, outgoingData, ws);
});

wsem.addEventHandler(events.c_newBlock, (ws, data) => {
  const outgoingData = {
    player: players[ws.id].name,
    blockType: data.blockType,
    points: data.points
  }

  wsem.broadcastMessage(events.s_newBlock, outgoingData, ws);
});

// TODO: make player manager
