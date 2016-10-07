var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	// response.send('Hello Express');
	response.render('index', {title: 'mYExpress project'})
})

app.post('/users', function(request, response){
	// var users_array = [
	//     {name: "Michael", email: "michael@codingdojo.com"}, 
 //        {name: "Jay", email: "jay@codingdojo.com"}, 
 //        {name: "Brendan", email: "brendan@codingdojo.com"}, 
 //        {name: "Andrew", email: "andrew@codingdojo.com"}
	// ];
	// response.render('users', {users: users_array});
	console.log('Post DATA \n\n', request.body);
	response.redirect('/');
})

app.get('/users/:id', function(request, response){
	console.log("The user id request is:", request.params.id);
	response.send("You requested the user with id:" + request.params.id);
})


app.listen(3000, function(){
	console.log("Listening on 3000");
})