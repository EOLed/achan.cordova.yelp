var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma');

gulp.task('lint', function () {
  gulp.src('src/**/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(['src/**/*.js', 'test/specs/**/*.js'],
                           ['lint', 'test']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('test', function () {
  return gulp.src(['bower_components/angular/angular.js',
                   'bower_components/angular-mocks/angular-mocks.js',
                   'bower_components/oauth-signature-js/dist/oauth-signature.js',
                   'test/mocks/**/*.js',
                   'src/**/*.js',
                   'test/specs/**/*.js'])
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
      }));
});
