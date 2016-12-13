var gulp = require('gulp'),
	jslint = require('gulp-jslint'),
	jshint = require('gulp-jshint'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	reload      = browserSync.reload;

gulp.task('js', function () {
	return gulp.src('./src/js/*.js')
		.pipe(jshint())
    	.pipe(jshint.reporter('default'))
		.pipe(uglify())
      	.pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('imagemin', function() {
	return gulp.src('./src/images/**/*.jpg')
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
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/js/*.js", ['js-watch']);
    gulp.watch("src/sass/*.scss", ['sass-watch']);
    gulp.watch("src/image/*.jpg", ['image-watch']);
    gulp.watch("*.html").on("change", reload);
});
