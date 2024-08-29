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
process.on("SIGINT", () => {
  wss.clients.forEach((client) => client.close());
  server.close(() => {
    shutdown();
  });
});

/** Websocket **/
const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server: server });

wss.on("connection", function connection(ws) {
  const numClients = wss.clients.size;

  console.log("clients connected: ", numClients);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("welcome!");
  }
  db.run("INSERT INTO visitors (count,timestamp) VALUES (?,?)", [
    numClients,
    new Date().toISOString(),
  ]);
  ws.on("close", function close() {
    wss.broadcast(`Current visitors: ${wss.clients.size}`);
    console.log("A client has disconnected");
  });

  ws.on("error", function error() {
    //
  });
});

/**
 * Broadcast data to all connected clients
 * @param  {Object} data
 * @void
 */
wss.broadcast = function broadcast(data) {
  console.log("Broadcasting: ", data);
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
/** End Websocket **/
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory:");
db.serialize(function () {
  db.run("CREATE TABLE visitors ( count INT,timestamp TEXT)");
});

function getCount() {
  db.each("SELECT * FROM visitors ", function (err, row) {
    console.log("Count: ", row.count);
  });
}

function shutdown() {
  console.log("Shutting down db");

  getCount();
  db.close();
}
