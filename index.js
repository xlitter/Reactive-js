var express = require('express'),
	app = express(),
	handle = require('./services/controller/ajax');
	
app.use(express.static(__dirname+'/static'));
app.use(express.static(__dirname+'/node_modules'));

app.get('/', handle.list);
app.get('/list', handle.list);
app.get('/query/:id', handle.queryItemById);

app.listen(9018, function () {
	console.log('this server start at 9018 port');
});