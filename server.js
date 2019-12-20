const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

var TaskNames = [
    {task: "Interface"},
    {task: "FrontEnd"},
    {task: "BackEnd"},
    {task: "Gay"},
    {task: ""}
];

app.get("/data", (req, res) => {
  res.send(TaskNames);
});

io.on('connection', (socket) => {
  console.log("user coneccted");
})

app.post("/data", (req, res) => {
  io.emit('message', req.body);
  TaskNames.push(req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var server = http.listen(3000, () => {
  console.log("Listening to port " + server.address().port);
});