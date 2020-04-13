const http = require('http');
const fs = require('fs');
const cors = require('cors');
const express= require('express');
// const app = express();
app.use(express.static('/'));

app.use(cors());
// Chargement du fichier index.html affiché au client
const server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
const io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log((socket));
    console.log(` Un client est connecté !` );
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


server.listen(8080,()=>{
    console.log("server is running on 8080");
});