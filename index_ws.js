const express = require("express");
const server = require("http").createServer();
const app = express();
const PORT = 3000;

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});
server.on("request", app);

server.listen(PORT, function () {
  console.log("Listening on " + PORT);
});

/* Web socket */
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server: server });
wss.on("connection", function (ws) {
  nm_client = wss.clients.size;
  console.log("Client connected", nm_client);
  wss.broadcast(`current visitors: ${nm_client}`);
  ws.readyState === ws.OPEN && ws.send("Welcome to the chat room");
  ws.on("close", function (msg) {
    console.log("Client disconnected", nm_client);
  });
});

wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
    client.send(data);
  });
};
