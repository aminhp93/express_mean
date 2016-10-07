var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

app.post('/result', function(request, response){
	response.render('result', {info: request.body});
})

app.listen(3000, function(){
	console.log("Listening on port 3000");
})

