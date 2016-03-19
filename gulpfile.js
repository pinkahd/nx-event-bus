const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const babel = require('gulp-babel');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('run-sequence');

const PATHS = {
    JS: [
        'src/js/nx-event-bus.js',
        'src/js/nx-event-bus-es6.js',
    ],
    BUILD_JS: './dist/js',
    BUILD_PATH: './dist',
    SOURCE_PATH: './src'
};

gulp.task('scripts', function() {
    return gulp.src(PATHS.JS)
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat('nx-event-bus.js')) // You can use other plugins that also support gulp-sourcemaps
            .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
            .pipe(gulp.dest(PATHS.BUILD_JS));
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server', ['build'], function() {
    return gulp.src(PATHS.BUILD_PATH)
        .pipe($.webserver({
            port: 8080,
            host: 'localhost',
            fallback: 'index.html',
            livereload: true,
            open: false
        }));
});

gulp.task('clean', function(cb) {
    rimraf(PATHS.BUILD_PATH, cb);
});

gulp.task('copy', function(cb) {
    return gulp.src(['src/**/*', '!./src/js/**/*'])
            .pipe(gulp.dest('./dist'));
});

gulp.task('copy:html', function(cb) {
    return gulp.src(PATHS.SOURCE_PATH + '/**/*.html')
             .pipe(gulp.dest(PATHS.BUILD_PATH));
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
    sequence('clean', ['copy', 'copy:html', 'scripts'], cb);
});

gulp.task('default', ['server'], function(cb) {
    gulp.watch(PATHS.JS, ['scripts']);
    cb();
});
