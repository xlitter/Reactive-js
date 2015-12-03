/*globals Rx, $*/
(() => {
	'use strict';

	 var $list = $('#list'),
		$refresh = $('#refresh'),
		url = 'http://localhost:3000/list',
		// url = 'https://api.github.com/users',
		refreshClickStream = Rx.Observable.fromEvent($refresh, 'click'),
		listCloseClickStream = Rx.Observable.fromEventPattern((h) => {
			$list.on('click', '.close', h);
		}, (h) => {
			$list.off('click', '.close', h);
		}),
		reqStream = refreshClickStream
		//触发click事件,只对fromEvent内的click事件有效
			.startWith('startup click')
		//构建请求URL
			.map(() => {
				var startOffset = Math.floor(Math.random() * 50) + 1;
				return `${url}?since=${startOffset}`;
			}),
		//发起ajax请求,并将ajax promise结果转换为Observable,
		//通过flatMap取得Observable,然后subscribe获取response结果,map只能得到一个Observable
		rspStream = reqStream.flatMap(url=> Rx.Observable.fromPromise($.getJSON(url))),

		suggestionStream = listCloseClickStream
		//先触发一次点击事件,使rspStream中获得值
			.startWith('list click')
		//合并rspStream和listClickStream 
		//使其在点击close按钮和rspSream发生变化时都可以触发(click, list)=>{}方法的执行
			.combineLatest(rspStream, (...rest) => {
				let list = rest[1];
				return list[Math.floor(Math.random() * list.length)];
			})
		//合并refreshClickSream,使其点击refresh时先触发subscribe,传入null值
			.merge(refreshClickStream.map(() => null))
		//先refresh触发一次
			.startWith(null);


	function createElement(v) {
		return `<div class="item">
						<img class="avatar" src="${v.avatar_url}" alt="${v.login}">
						<span class="name">${v.login}</span>
						<i class="close">x</i>
						</div>`;
	}

	suggestionStream
		// .filter((...rest) => {
		// 	console.log('rest', rest);
		// });
		.subscribe(v => {
			//jshint -W030
			v && $list.empty().append(createElement(v)) || $list.empty();
		});

		// rspStream.subscribe((rsp) => {
		// $list.empty().append(rsp.map(v=> `<div class="item">
		// 				<img class="avatar" src="${v.avatar_url}" alt="${v.login}">
		// 				<span class="name">${v.login}</span>
		// 				<i class="close close1">x</i>
		// 				</div>`));

		// console.log('click');
		// },
		// null,
		// () => { console.log('completed'); });

		console.log('a');

})();