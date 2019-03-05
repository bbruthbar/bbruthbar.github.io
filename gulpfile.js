'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var htmlSources = '*.html';
var sassSources = './components/sass/**/*.scss';
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src(sassSources)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('css', function(){
	return gulp.src('components/vendor/**/*.css')
		.pipe(gulp.dest('css'));
})

gulp.task('serve', gulp.series('sass','css', function(done) {

	browserSync.init({
			port: "8080",
			server: "./"
	});

	gulp.watch(sassSources, gulp.series('sass'));
	gulp.watch(sassSources).on('change', browserSync.reload);
	gulp.watch(htmlSources).on('change', browserSync.reload);

	done();
}));