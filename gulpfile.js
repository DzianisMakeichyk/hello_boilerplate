/**
 * Created by Dzianis Makeichyk on 02/12/2017.
 */
var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename');

/* pathConfig */
var entryPoint = './app/js/index.js',
    browserDir = './build',
    sassWatchPath = './app/scss/**/*.scss',
    jsWatchPath = './app/js/**/*.js',
    hbsWatchPath = ['./app/hbs/*/*.hbs'];
    htmlWatchPath = './build/*.html';

/**/

/* hbsFiles */
var hbsFiles = [
    /* Define Tab Names */
        "index"
    ];
/**/

/**/
/* hbs */
gulp.task('hbs', function () {
        templateData = {
            locale: 'pl_PL'
        };
        options = {
            ignorePartials: true,
            batch : [
                './app/hbs/',
                './app/hbs/components',
                './app/hbs/pages'
            ],
            helpers : {
                capitals : function(str){
                    return str.toUpperCase();
                }
            }
        };

    for (var i = 0; i < hbsFiles.length; i++) {
        gulp.src('./app/hbs/pages/' + hbsFiles[i] + '.hbs')
            .pipe(handlebars(templateData, options))
            .pipe(rename(hbsFiles[i] + '.html'))
            .pipe(gulp.dest('./build'));
    }
});
/**/

/* JS */
gulp.task('js', function () {
    return browserify(entryPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.reload({stream: true}));
});
/**/

/* Scss */
gulp.task('sass', function () {
    return gulp.src(sassWatchPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({stream: true}));
});
/**/

/* browserSync */
gulp.task('browser-sync', function () {
    browserSync.init({
        "server": {
            "baseDir": browserDir
        }
    });
});
/**/

/* Watch */
gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(hbsWatchPath, ['hbs']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

/**/

/* Run project */
gulp.task('run', ['js', 'hbs', 'sass', 'watch', 'browser-sync']);
/**/