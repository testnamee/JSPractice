var gulp = require('gulp'),
  watch = require('gulp-watch'),
  autoprefixer = require('autoprefixer'),
  cssImport = require('postcss-import'),
  postcss = require('gulp-postcss'),
  nested = require('postcss-nested'),
  simplevars = require('postcss-simple-vars'),
  mixins = require('postcss-mixins'),
  webpack = require('gulp-webpack'),
  browsersync = require('browser-sync').create();

gulp.task('watch', function() {
  browsersync.init({
    server: {
      baseDir: 'app',
    },
  });

  watch('./app/css/**/*.css', function() {
    gulp.start('cssInject');
  });

  watch('./app/index.html', function() {
    browsersync.reload();
  });
});

gulp.task('cssInject', ['style'], function() {
  return gulp.src('./app/temp/styles/main.css').pipe(browsersync.stream());
});

gulp.task('style', function() {
  return gulp
    .src('./app/css/main/main.css')
    .pipe(postcss([autoprefixer, cssImport, simplevars, mixins, nested]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'))
    .pipe(browsersync.stream());
});
