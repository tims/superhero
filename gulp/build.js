'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

gulp.task('build-wiredep-index', ['bower'], function () {
  return gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build-wiredep', ['build-wiredep-index']);

gulp.task('build-inject', ['build-wiredep-index', 'build-scripts'], function () {
  var scripts = gulp.src(['build/**/*.js', '!**/game.js'], {
    read: false,
    cwd: 'build'
  });
  var styles = gulp.src(['build/**/*.css'], {
    read: false,
    cwd: 'build'
  });

  return gulp.src('build/*.html')
    .pipe(plugins.inject(scripts, {addRootSlash: false}))
    .pipe(plugins.inject(styles, {addRootSlash: false}))
    .pipe(gulp.dest('build'));
});

gulp.task('build-copy-scripts', function () {
  return gulp
    .src(['app/**/*.js'])
    .pipe(gulp.dest('build/'));
});

gulp.task('build-copy-images', function () {
  return gulp
    .src(['app/images/*'])
    .pipe(gulp.dest('build/images'));
});

gulp.task('build-scripts', ['build-copy-scripts']);
gulp.task('build-index', ['build-wiredep', 'build-inject']);
gulp.task('build-assets', ['build-copy-images']);


gulp.task('build', [
  'build-assets',
  'build-index',
  'build-scripts'
]);

