'use strict';

let Mock = require('mockjs');

let mockRnd = Mock.Random;

let tpl = function () {
	return {
		avatar_url: mockRnd.image('125x125',mockRnd.color()),
		login: mockRnd.name(),
		age: mockRnd.integer(1, 50),
		desc: mockRnd.title(25)
	};
};

let handle = {
	list: function (req, res) {
		let cnt = Number(req.query.since) || 10;
		let result = Mock.mock(function (cnt) {
			let result = [];
			for (let i = 0; i < cnt; i++) {
				result.push(tpl());
			}
			return result;
		}.call(null, cnt));
		res.send(result);

	},
	queryItemById: function (req, res) {
		let queryTpl = Object.assign({ id: req.params.id }, tpl);
		res.send(Mock.mock(queryTpl));
	}
};


module.exports = handle;
