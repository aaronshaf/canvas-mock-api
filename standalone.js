var express = require('express');
var app = express();
var port = 3001;
app.get('/', function(req, res) {
	res.send(':-)');
});
var middleware = require('./index');
middleware(app);
console.log('Listening to port ' + port);
app.listen(port);