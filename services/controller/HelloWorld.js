'use strict';
var express = require('express'),
	app = express();

app.get('/', (req, res, next) => {
	res.send('Hello world');
		console.log('first');
	 next();
}, [(req, rsp ,next) =>{
	console.log('a1'),
	next();
}, (req, rsp, next)=>{
	console.log('a2');
	next();
}],(req, rsp, next)=>{
	console.log('this is end 2');
	next();
}, (req, rsp, next)=>{
	console.log('this is end ');
	// rsp.end();
	//  rsp.send('Hello world');
});

app.listen(9018, function () {
	console.log('Server is start 9018');
});