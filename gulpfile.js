const gulp      = require('gulp'),
    eslint      = require('gulp-eslint'),
    cssnano     = require('gulp-cssnano'),
    imagemin    = require('gulp-imagemin'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    sassLint    = require('gulp-sass-lint'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    babel       = require('gulp-babel'),
    concat      = require('gulp-concat');

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sassLint({configFile: './.sass-lint.yml'}))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('imagemin', function() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('sass-watch', ['sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('image-watch', ['imagemin'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['js', 'sass', 'imagemin'], function () {
    //serve from current directory
    // browserSync.init({
    //     server: {
    //         baseDir: "./",
    //     }
    // });
    //serve from domain
    browserSync.init({
        proxy: "localhost/wordpress/" /* replace with your vhost domain name like sitename.sj*/
    });
    gulp.watch("src/js/*.js", ['js-watch']);
    gulp.watch("src/sass/*.scss", ['sass-watch']);
    gulp.watch("src/images/*", ['image-watch']);
    gulp.watch("*.html").on("change", reload);
});

gulp.task('build', ['js', 'sass', 'imagemin']);
