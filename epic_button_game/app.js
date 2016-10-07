var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

var server = app.listen(3000, function(){
	console.log("Listening on port 3000");
})

var io = require('socket.io').listen(server);

var new_number = 0;

io.sockets.on('connection', function(socket){
	console.log("WE ARE USING SOCKET");
	console.log(socket.id);
	socket.on('number_of_user', function(data){
		new_number += 1;
		console.log(new_number);
		socket.emit('update_number', {response: new_number})
	})

	socket.on('reset', function(data){
		new_number = 0;
		socket.emit('reset_number', {response: "Nothing"})
	})


})