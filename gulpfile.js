var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');

require('require-dir')('./gulp');

gulp.task('bower', function () {
  return plugins.bower()
    .pipe(gulp.dest('bower_components'));
});

gulp.task('default', function (cb) {
  runSequence('clean', 'webserver', cb);
});

gulp.task('clean', function () {
  return gulp.src(['build'])
    .pipe(vinylPaths(del));
});
