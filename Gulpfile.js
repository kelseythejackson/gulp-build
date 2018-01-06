const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const maps = require('gulp-sourcemaps');
const imgMin = require('gulp-imagemin');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const replace = require('gulp-replace');
const del = require('del');
const browserSync = require('browser-sync').create();

gulp.task('scripts', ()=> {
    return gulp.src(['./js/jquery-3.2.1.min.js','./js/circle/autogrow.js', './js/circle/circle.js', './js/global.js'])
        .pipe(maps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('.'))
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('styles', () => {
   return gulp.src('./sass/**/*.scss')
       .pipe(maps.init())
       .pipe(sass())
       .pipe(gulp.dest('./css'))
       .pipe(cleanCss())
       .pipe(rename('all.min.css'))
       .pipe(maps.write('.'))
       .pipe(gulp.dest('./dist/styles'))
       .pipe(browserSync.stream());
});

gulp.task('images', () => {
    return gulp.src('./images/*')
        .pipe(imgMin())
        .pipe(gulp.dest('./dist/content'))
});

gulp.task('html', ['scripts', 'styles', 'images'], () => {
    return gulp.src('./index.html')
    .pipe(useref())
    .pipe(replace('images/', 'content/'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('serve', () => {
    browserSync.init({
        server: '.'
    });

    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch('./dest/index.html').on('change', browserSync.reload);
});

gulp.task('clean', ()=> {
    del(['dist']);
 });

 gulp.task('build', ['html'], () => {
     return gulp.src(['./icons/**/**/*'])
        .pipe(gulp.dest('./dist/icons'));
 });

 gulp.task('default', ['clean'], () => {
    gulp.start('build');
    gulp.start('serve');
 });