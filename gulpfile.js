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
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    postcssDiscardDuplicates = require('postcss-discard-duplicates'),
    postcssDiscardEmpty = require('postcss-discard-empty'),
    postcssFlexbugsFixes = require('postcss-flexbugs-fixes'),
    postcssRoundSubpixels = require('postcss-round-subpixels'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    htmlmin = require('gulp-htmlmin'),
    zip = require('gulp-zip'),
    useref = require('gulp-useref');

/* description */
var templateData = require('./app/description/page-description.json'),
    hbsFiles = require('./app/description/pages.json');

/* pathConfig */
var entryPoint = './app/js/index.js',
    browserDir = './build',
    sassWatchPath = './app/scss/**/*.scss',
    jsWatchPath = './app/js/**/*.js',
    hbsWatchPath = ['./app/hbs/**/*.hbs'];
    htmlWatchPath = './build/*.html';
    fontsWatchPath = './app/fonts/*.*';
/**/

/* hbs */
gulp.task('hbs', function () {
        templateData,
        options = {
            ignorePartials: true,
            batch : [
                //If need add more direction here
                './app/hbs/informations',
                './app/hbs/components',
                './app/hbs/pages',
                './app/hbs/'
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
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.reload({stream: true}));
});
/**/

/* JS ES5 */
gulp.task('js-ES5', function () {
    return gulp.src(jsWatchPath)
        .pipe(sourcemaps.init())
        .pipe(useref())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js/'))
});
/**/

/* Scss */
gulp.task('scss', function () {
    return gulp.src('./app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
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

/* Fonts */
gulp.task('fonts', function() {
    return gulp.src(fontsWatchPath)
        .pipe(gulp.dest('build/fonts/'));
});
/**/

/* Watch */
gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['scss']);
    gulp.watch(hbsWatchPath, ['hbs']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});
/**/

/* Watch-ES5 */
gulp.task('watch-ES5', function () {
    gulp.watch(jsWatchPath, ['js-ES5']);
    gulp.watch(sassWatchPath, ['scss']);
    gulp.watch(hbsWatchPath, ['hbs']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});
/**/

/* Run project (ES6)*/
gulp.task('run', ['js', 'hbs', 'scss', 'watch', 'fonts', 'browser-sync']);
/**/

/* Run project (ES5)*/
gulp.task('run-ES5', ['js-ES5', 'hbs', 'scss', 'watch-ES5', 'fonts', 'browser-sync']);
/**/

// Production Styles w/o lint, source maps & with compression to optimize speed
gulp.task('hbs-prod', function() {
    return gulp.src(htmlWatchPath)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeCommentsFromCDATA: true,
            minifyJS: true,
            minifyCSS: true,
            ignoreCustomFragments: [/{{[\s\S]*?}}/]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scss-prod', function () {
    return gulp.src(sassWatchPath)
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
                browsers: ['last 3 versions']
            }),
            postcssDiscardDuplicates,
            postcssDiscardEmpty,
            postcssRoundSubpixels,
            postcssFlexbugsFixes
        )
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js-prod', function (cb) {
    pump([
            gulp.src('./build/js/*.js'),
            uglify('./build/js/*.js'),
            gulp.dest('dist/js')
        ],
        cb
    );
});

gulp.task('img-prod', function() {
    return gulp.src('build/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true,
            svgoPlugins: [{removeViewBox: true}]
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
    return gulp.src(fontsWatchPath)
        .pipe(gulp.dest('dist/fonts/'));
});

/* Build project */
gulp.task('build', ['hbs-prod', 'scss-prod', 'js-prod', 'fonts', 'img-prod']);
/**/

/* Archive */
gulp.task('zip', function () {
    gulp.src('dist/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('zip'))
});
/**/