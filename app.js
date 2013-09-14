var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


io.sockets.on('connection', function(socket) {
	socket.on('positionToServer', function(data) {		
		console.log(data);
	    io.sockets.emit("positionToClient", { positionTop : data.positionTop, positionLeft : data.positionLeft });
	});
});


app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res) {
  res.render('index.ejs', { title : 'Home' })
});

server.listen(3000);