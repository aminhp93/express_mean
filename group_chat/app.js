var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

var server = app.listen(3000, function(){
	console.log("listening on port 3000");
})

var users = [];
var messages = [];

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket){
	socket.on('check_user', function(data){
		if (is_user(data.user) == true){
			socket.emit('existing_user', {error: "this name has been used"});
		} else {
			users.push(data.user);
			socket.emit('load_messages', {response: {user: data.user, message: messages}});		
		}
	})
	socket.on('add_message', function(data){
		messages.push(data);
		io.emit("response_add_message", {response: data});
	})
})

function is_user(user){
	for (var i=0; i < users.length; i++){
		if (user == users[i]){
			return true
		}
	}
	return false
}