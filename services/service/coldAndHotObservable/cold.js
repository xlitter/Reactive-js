'use strict';

let Rx = require('rx');

let source = null;
let observer1 = 'Observer 1';
let observer2 = 'Observer 2';

// source = Rx.Observable.interval(1000);
source = Rx.Observable.range(0 ,4);


source.subscribe((v) => {
	console.log(`${observer1} Next: ${v}`);
}, e=> {
	console.log(`${observer1} error : ${e.message}`);
}, () => {
	console.log(`${observer1}: Completed`);
});

setTimeout(() => {
	source.subscribe(v=> {
		console.log(`${observer2} Next: ${v}`);
	}, e=> {
		console.log(`${observer2} error: ${e.message}`);
	}, () => {
		console.log(`${observer2} : Completed`);
	});
}, 3000);



