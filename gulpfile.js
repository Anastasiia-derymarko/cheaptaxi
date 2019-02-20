	var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./build'));
});

gulp.task('sass:watch', function(){
  gulp.watch('./src/**/*.scss', gulp.parallel('sass'));
});