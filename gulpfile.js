var gulp = require('gulp'),
    sass = require('gulp-sass'),
//    compass = require('gulp-compass'), // TODO once I know how to use it.
    connect = require('gulp-connect');

var sassSources,
    htmlSources;

sassSources = ['components/sass/style.scss'];
htmlSources = '*.html';

gulp.task('html', function(){
    gulp.src(htmlSources)
        .pipe(connect.reload());
})

gulp.task('sass', function(){
    gulp.src('components/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
})

gulp.task('css', function(){
    gulp.src('components/vendor/**/*.css')
        .pipe(gulp.dest('css'));
})

gulp.task('fonts', function(){
    gulp.src('components/fonts/**/*')
        .pipe(gulp.dest('fonts'));
})

gulp.task('connect', function(){
    connect.server({
        root: '',
        livereload: true
    });    
})

gulp.task('watch', function(){
    gulp.watch(htmlSources, ['html']);
    gulp.watch('components/sass/**/*.scss', ['sass']);
})

//put watch on the end so it runs last
gulp.task('default', ['html', 'sass', 'css', 'fonts', 'connect', 'watch']);