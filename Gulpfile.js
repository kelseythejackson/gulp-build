// Require the correct modules
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const maps = require('gulp-sourcemaps');
const imgMin = require('gulp-imagemin');
const useref = require('gulp-useref');
const run = require('run-sequence');
const replace = require('gulp-replace');
const del = require('del');
const browserSync = require('browser-sync').create();


gulp.task('scripts', ()=> { // concatinates, minifies, renames and creates sourcemaps for the javascript
    return gulp.src(['./src/js/jquery-3.2.1.min.js','./src/js/circle/autogrow.js', './src/js/circle/circle.js', './src/js/global.js'])
        .pipe(maps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('.'))
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('sass', () => { // processes the sass
    return gulp.src('./src/sass/**/*.scss')
       .pipe(maps.init())
       .pipe(sass())
       .pipe(maps.write('.'))
       .pipe(gulp.dest('./src/css'))
});

gulp.task('styles', ['sass'], () => { // renames, minifies and creates sourcemaps for the css
   return gulp.src('./src/css/global.css')
       .pipe(maps.init())
       .pipe(rename('all.min.css'))
       .pipe(csso())
       .pipe(maps.write('.'))
       .pipe(gulp.dest('./dist/styles'))
       .pipe(browserSync.stream());

});

gulp.task('images', () => { // optimizes the images
    return gulp.src('./src/images/*')
        .pipe(imgMin())
        .pipe(gulp.dest('./dist/content'))
});

gulp.task('icons', () => { // copies over the contents of the icons folder
     return gulp.src(['./src/icons/**/**/*'])
        .pipe(gulp.dest('./dist/icons'));
});

gulp.task('html',['icons'], () => { // replaces the css and js code blocks, and replaces 'images' with 'content'
    return gulp.src('./src/index.html')
    .pipe(useref())
    .pipe(replace('images/', 'content/'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('serve', () => { // launches the server and watches for the sass or html changes
    browserSync.init({
        server: './src'
    });

    gulp.watch('./src/sass/**/*.scss', ['styles']);
    gulp.watch('./src/index.html', ['styles']).on('change', browserSync.reload);
});

gulp.task('clean', ()=> { // deletes the 'dist' and 'src/css' folder
    del(['dist', './src/css']);
});

 gulp.task('build', ['clean'], (callback) => { // runs the full build
     run('sass','icons', 'html', 'scripts', 'images', 'styles', callback);
 });

 gulp.task('default', ['build'], () => { // runs the full build and launches the server
    gulp.start('serve');
 });

