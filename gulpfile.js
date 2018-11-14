const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const clean = require('gulp-clean');
 
gulp.task('clean', function () {
    return gulp.src('./build/assets/css/style.css', {read: false})
        .pipe(clean());
});

gulp.task('css', ['clean'], () => gulp.src('./src/assets/css/style.css').pipe(
  postcss([
    postcssPresetEnv(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('./build/assets/css/')
));

gulp.task('default', ['clean'], function() {
  gulp.start('css')
});