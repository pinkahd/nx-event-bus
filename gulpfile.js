const gulp = require("gulp");
const babel = require("gulp-babel");
const rimraf = require("rimraf");

const PATHS = {
  JS: ["lib/nx-event-bus.js"],
  BUILD: "./dist/"
};

gulp.task("clean", function(cb) {
  rimraf(PATHS.BUILD, cb);
});

// Builds your entire app once, without starting a server
gulp.task("build", ['clean'], function(cb) {
  return gulp
  .src(PATHS.JS)
  .pipe(
    babel({
      presets: ["es2015"]
    })
  )
  .pipe(gulp.dest(PATHS.BUILD));
});

gulp.task("default", function(cb) {
  gulp.watch(PATHS.JS, ["build"]);
  cb();
});
