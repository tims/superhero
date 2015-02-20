var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

gulp.task('webserver-serve', ['build'], function() {
  return gulp.src('build')
    .pipe(plugins.webserver({
      root: 'build',
      fallback: 'index.html',
      port: 9000,
      livereload: true,
      filter: function (fileName) {
        return !fileName.match(/(\.scss|\.map)$/);
      }
    }));
});

gulp.task('webserver', ['webserver-serve']);
