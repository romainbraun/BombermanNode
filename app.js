var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var users = [];
io.sockets.on('connection', function(socket) {
	

	socket.on('createBobTS', function(user) {
		users.push(user);
		//console.log(users);
		io.sockets.emit("createBobTC", users);	    
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