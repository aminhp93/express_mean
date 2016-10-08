var express = require('express.io');
var app = express().http().io();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');


app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.cookieParser());
app.use(express.session({secret: 'monkey'})); 


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
	socket.on('page_load', function(data){
		socket.emit('load_messages', {response: {user: data.user, message: messages}});		
		if (is_user(data.session.id) == false){
			socket.emit('get_user_name');
		}
	})

	socket.on('new_user', function(data){
		users.push({id:data.session.id, user: data.user});		
	})

	socket.on('add_message', function(data){
		var user = is_user(data.session.id);
		if (user){
			messages.push({user: user, message: data.message});
			io.emit("response_add_message", {user: user, message: data.message});
		}
	})
})

function is_user(id){
	for (var i=0; i < users.length; i++){
		if (id === users[i].id){
			return users[i].user
		}
	}
	return false
}