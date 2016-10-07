var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

var server = app.listen(3000, function(){
	console.log('Listening on port 3000');
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log("WE ARE USING SOCKET");
	console.log(socket.id);

	socket.on('random_number', function(data){
		var number = Math.floor(Math.random() * 1000);
		socket.emit('update_message', {response: data});
		socket.emit('update_number', {response: number})
	})
})