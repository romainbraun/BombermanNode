var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var users = [];
io.sockets.on('connection', function(socket) {
	
	//console.log('connection')
	var numberConnection = io.sockets.clients().length;
	
	socket.emit("retriveCharactersTC", { users : users, connection : numberConnection, players : users.length });

	socket.on('createBobTS', function(user) {
		users.push(user);
		console.log('create perso');
		io.sockets.emit("createBobTC", user);	    
	});

	socket.on('updatePositionTS', function(user) {		
		//console.log(user);
	    io.sockets.emit("updatePositionTC", user);
	});

});


app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res) {
  res.render('index.ejs', { title : 'Home' })
});

server.listen(3000);