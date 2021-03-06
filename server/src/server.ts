import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
}

export class Action {
    constructor(
        public type: string,
        public sender: string,
        public content: string,
        public game: number
    ) { }
}

function createAction(type: string, game = 0, sender = '', content = ''): string {
    return JSON.stringify(new Action(type, sender, content, game));
}

var forwardAction = (action, ws, msg): void => {
    // Forward this action to all other game participants
    if (servers[action.game] != ws) {
        servers[action.game].send(msg);
    }
    players[action.game].forEach(client => {
        if (client != ws) {
            client.send(msg);
        }
    });
}

var registerUser = (action, ws, msg): void => {
    if (action.sender in players[action.game]) {
        ws.send(createAction("REJECT_USER", action.game, "", "Username already in use"));
    } else {
        players[action.game].push(ws);
        servers[action.game].send(msg);
        ws.send(createAction("CONFIRM_USER", action.game, action.sender, action.content));
    }
}

var forwardToServer = (action, ws, msg): void => {
    servers[action.game].send(msg);
}

var respondToUser = (action, ws, msg): void => {
    if (players[action.game][action.sender] != undefined) {
        players[action.game][action.sender].send(msg);
    } else {
        ws.send(createAction("INVALID_USER"));
    }
}

var actionHandlers = {
    "REGISTER_USER": registerUser,
    "SUBMIT_GUESS": forwardToServer,
    "CORRECT_ANSWER": respondToUser,
    "INCORRECT_ANSWER": respondToUser,
    "GAME_OVER": forwardAction,
    "NEW_SONG": forwardAction,
    "TIME_UP": forwardAction,
    "START_GAME": forwardAction,
};

function processAction(action, ws, msg) {
    if (action.type == "GET_TOKEN") {
        var gameID = Math.floor(1000 + Math.random() * 9000);
        servers[gameID] = ws
        players[gameID] = []
        ws.send(createAction("CONFIRM_TOKEN", gameID));
    } else if (servers[action.game] != undefined) {
        if (action.type in actionHandlers) {
            actionHandlers[action.type](action, ws, msg);
        } else {
            ws.send(createAction("INVALID_ACTION"));
        }
    } else {
        ws.send(createAction("INVALID_GAME"));
    }
}

var servers = {}
var players = {}

wss.on('connection', (ws: WebSocket) => {
    const extWs = ws as ExtWebSocket;
    extWs.isAlive = true;
    ws.on('pong', () => {
        extWs.isAlive = true;
    });

    ws.on('message', (msg: string) => {
        try {
            const action = JSON.parse(msg) as Action;
            setTimeout(() => { processAction(action, ws, msg) }, 1000);
        } catch {
            setTimeout(() => { ws.send(createAction("INVALID_ACTION_SYNTAX")) }, 1000);
        }
    });

    //immediate feedback
    ws.send(createAction("CONNECTION_ESTABLISHED"));

    ws.on('error', (err) => {
        // TODO: remove client from storage
        console.warn(`Client disconnected - reason: ${err}`);
    })
});

setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {
        const extWs = ws as ExtWebSocket;
        if (!extWs.isAlive) return ws.terminate();
        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 10000);

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
