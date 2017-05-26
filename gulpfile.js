/**
 * Created by Curso on 16/05/2017.
 */


/**
 * Created by Enrique J. Ruiz on 10/05/2017.
 */
var gulp = require('gulp');
var babelify = require('babelify');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('compile-js',function() {
    return browserify('./src/js/scripts.js')
        .transform(babelify,{presets: ["env"]})
        .bundle()
        .pipe(source('all-min.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-css', function() {
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css','node_modules/bootstrap/dist/css/bootstrap-theme.min.css','src/css/normalize.css','src/css/styles.css'])
        .pipe(concat('styles-min.css'))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('minifonts-woff', function() {
    gulp.src(['node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'])
        .pipe(concat('fonts-min.woff'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task("default",['minify-css',"compile-js",'minifonts-woff']);

