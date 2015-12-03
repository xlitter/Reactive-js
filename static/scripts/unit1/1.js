$(function () {
	'use strict';
	var $input = $('#input'),
		$result = $('#result'),
		keyups = Rx.Observable.fromEvent($input, 'keyup')
			.map(e => e.target.value)
			.filter(text => text.length > 2)
			// .throttle(500)
			.debounce(100)
			.distinctUntilChanged();


		function search(term) {
			return $.ajax({
				url: 'http://en.wikipedia.org/w/api.php',
				dataType: 'jsonp',
				data: {
					action: 'opensearch',
					format: 'json',
					search: term
				}
			});
		}

		keyups.flatMapLatest(search).subscribe(data=> {
			console.log('data', data);
			var res = data[1];
	
			$result.empty().append(res.map(v=> {
				return `<li>${v}</li>`;
			}).join(''));

		});


});