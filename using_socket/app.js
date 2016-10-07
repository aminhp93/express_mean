var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

var server = app.listen(3000, function(){
	console.log('listening on 3000');
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log("We are using socket");
	console.log(socket.id);
	// console.log(socket);
	// console.log(io);
	socket.on('button_clicked', function(data){
		console.log("Someone clicked a button! Reason: " + data.reason);
		// EMIT:
		socket.emit('server_response', {response: "sockets are the best"});
		// BROADCAST
		// socket.broadcast.emit('my_broadcast_event');
		// FULL BROADCAST
		// io.emit('my_full_broadcast_event');
	})
})

