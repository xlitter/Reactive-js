'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync');


gulp.task('watch', function () {
		browserSync.init({
			//远程代理
			proxy: 'localhost:9018',
			// //本地静态文件代理
			// serveStatic: ['./static']
			// server: './static'
		});
	gulp.watch('static/html/**/*.html',browserSync.reload);
	
	gulp.watch('static/scripts/**/*.js', browserSync.reload);
});
	