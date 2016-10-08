var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
// var session = require('express-session');


app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({secret: 'codingdojorocks'}));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

var server = app.listen(3000, function(){
	console.log("Listening on port 3000");
})

var users = [];
var messages = [];

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.on('check_user', function(data){
		if (is_user(data.user) === true){
			socket.emit("error_message");
		} else {
			users.push(data.user);
			console.log('amin');
			console.log(messages);
			socket.emit('load_messages', {current_user: data.user, message: messages});
		}		
	})

	socket.on('create_message', function(data){
		messages.push({name: data.user, message: data.message})
		// console.log(messages);
		io.emit('response_message', {response: data});
	})
})


function is_user(user){
	for (var i = 0; i < users.length; i++){
		if (user == users[i]){
			return true;
		}
	}
	return false;
}