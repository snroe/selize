import gulp from 'gulp';

const copyLocales = () => {
  return gulp.src('locales/**/*')
    .pipe(gulp.dest('lib/locales'));
}

export default gulp.series(copyLocales);