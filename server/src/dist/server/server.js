"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
function createAction(type, game = 0, sender = '', content = '') {
    return JSON.stringify(new Action(type, sender, content, game));
}
function forwardAction(action, ws, msg) {
    // Forward this action to all other game participants
    console.log("1!");
    console.log(typeof (servers[action.game]));
    if (servers[action.game] != undefined) {
        console.log("2!");
        if (servers[action.game] != ws) {
            servers[action.game].send(msg);
        }
        players[action.game].forEach(client => {
            console.log("3!");
            if (client != ws) {
                client.send(msg);
                console.log("Forward!");
            }
        });
    }
}
function registerUser(action, ws, msg) {
    if (action.game in servers) {
        if (action.sender in players[action.game]) {
            ws.send(createAction("REJECT_USER", action.game, "", "Username already in use"));
        }
        else {
            players[action.game].push(ws);
            servers[action.game].send(msg);
            ws.send(createAction("CONFIRM_USER", action.game, action.sender, action.content));
        }
    }
    else {
        ws.send(createAction("REJECT_USER", action.game, "", "Invalid code"));
    }
}
class Action {
    constructor(type, sender, content, game) {
        this.type = type;
        this.sender = sender;
        this.content = content;
        this.game = game;
    }
}
exports.Action = Action;
var servers = {};
var players = {};
wss.on('connection', (ws) => {
    const extWs = ws;
    extWs.isAlive = true;
    ws.on('pong', () => {
        extWs.isAlive = true;
    });
    ws.on('message', (msg) => {
        const action = JSON.parse(msg);
        setTimeout(() => {
            switch (action.type) {
                case "GET_TOKEN":
                    var gameID = Math.floor(1000 + Math.random() * 9000);
                    servers[gameID] = ws;
                    players[gameID] = [];
                    ws.send(createAction("CONFIRM_TOKEN", gameID));
                    break;
                case "REGISTER_USER":
                    registerUser(action, ws, msg);
                    break;
                case "SUBMIT_GUESS":
                    // Pass to android server
                    if (servers[action.game] != undefined) {
                        servers[action.game].send(msg);
                    }
                    else {
                        ws.send(createAction("INVALID_GAME"));
                    }
                    break;
                case "CORRECT_ANSWER":
                case "INCORRECT_ANSWER":
                    // Pass to player's phone
                    if (players[action.game] != undefined) {
                        if (players[action.game][action.sender] != undefined) {
                            players[action.game][action.sender].send(msg);
                        }
                        else {
                            ws.send(createAction("INVALID_USER"));
                        }
                    }
                    else {
                        ws.send(createAction("INVALID_GAME"));
                    }
                case "GAME_OVER":
                case "NEW_SONG":
                case "TIME_UP":
                case "START_GAME":
                    forwardAction(action, ws, msg);
                    break;
                default:
                    ws.send(createAction("INVALID_ACTION"));
            }
        }, 1000);
    });
    //send immediatly a feedback to the incoming connection    
    ws.send(createAction("CONNECTION_ESTABLISHED"));
    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});
setInterval(() => {
    wss.clients.forEach((ws) => {
        const extWs = ws;
        if (!extWs.isAlive)
            return ws.terminate();
        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 10000);
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
//# sourceMappingURL=server.js.map