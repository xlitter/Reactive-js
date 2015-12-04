'use strict';
let Rx = require('rx');

console.log('Current time', Date.now());
let source = Rx.Observable.interval(1000);

let hot = source.publish();
let observer1 = 'Observer 1';
let observer2 = 'Observer 2';

hot.subscribe(x=> {
	console.log(`${observer1} Next: ${x}`);
}, e=> {
	console.log(`${observer1} error: ${e.message}`);
}, () => {
	console.log(`${observer1} : completed`);
});
setTimeout(() => {
	// hot.connect();
	console.log('Current Time after connect:', Date.now());
	setTimeout(() => {
		
		console.log('Current Time after 2nd subscription: ', Date.now());
		
		hot.subscribe(x=> {
			console.log(`${observer2} Next: ${x}`);
		}, e=> {
			console.log(`${observer2} error: ${e.message}`);
		}, () => {
			console.log(`${observer2} : completed`);
		});
	}, 3000);
}, 3000);

var source1 = Rx.Observable.interval(5000).take(2);
var proj = Rx.Observable.range(100, 3);
// var resultSeq = source1.flatMap(proj);
var resultSeq = proj;
 resultSeq.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e.message),
  () => console.log('onCompleted'));




