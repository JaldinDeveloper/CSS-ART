const gulp = require('gulp');
const useref = require('gulp-useref');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const { series } = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task("build-css", function () {
    return gulp.src('./styles/**/*.scss')
        .pipe(useref())
        .pipe(sass({ style: 'expanded' }))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
});

gulp.task('reload', function(cb){
    browserSync.reload();
    cb();
});

gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    
    gulp.watch('*.html', series('reload'));
    gulp.watch('./styles/*.scss', series('build-css', 'reload'));
});
