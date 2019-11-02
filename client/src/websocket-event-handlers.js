import WebSocketEventManager from "./websocket-event-manager";
import events from "./events";

/*
  All this code will be run inside some React component once
    we switch to the "game" state (after the user submits their username)
*/

const wsem = new WebSocketEventManager("ws://localhost:1234", () => {
  // TODO: replace "user" with chosen username
  wsem.sendMessage(events.c_join, { name: "user" });
});

wsem.addEventHandler(events.s_playerJoined, (data) => {
  // TODO: use data.player to get new player username
});

wsem.addEventHandler(events.s_playerLeft, (data) => {
  // TODO: this isn't actually supported yet, but remove data.player from list of players
});

wsem.addEventHandler(events.s_updatePiece, (data) => {
  // TODO: data.player, data.position
  // TODO: data.position is a 2d array: [x, y]
});

// TODO: this should be called whenever the position of a block changes
// TODO: `position` should be a 2d array: [x, y]
const onPieceMoved = (position) => {
  wsem.sendMessage(events.c_pieceMoved, { position });
}
