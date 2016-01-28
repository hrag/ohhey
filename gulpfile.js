var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var stripCssComments = require('gulp-strip-css-comments');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var beep = require('beepbeep');
var preprocess = require('gulp-preprocess')


var preprocess_context;

var onError = function (err) {
	beep([0]);
	gutil.log(gutil.colors.green(err));
};

gulp.task('clean', function () {
	gulp.src('build/*', {
			read: false
		})
		.pipe(clean({
			force: true
		}));
});

gulp.task('js-reg', function () {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(preprocess(preprocess_context))
		.pipe(gulp.dest('./build'))
});

gulp.task('js-min', function () {
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(rename({
	 		extname: '.min.js'
		}))
		.pipe(preprocess(preprocess_context))
		.pipe(gulp.dest('./build'))
});

gulp.task('styles', function () {
	gulp.src('src/scss/**/*.scss')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(stripCssComments())
		.pipe(gulp.dest('./build'));
});


gulp.task('minify-css', function () {
	return gulp.src('build/**/*.css')
		.pipe(minifyCss({
			compatibility: 'ie9'
		}))
		.pipe(gulp.dest('./build'));
});

// gulp.task('debug-build', ['set-debug','index', 'assets', 'templates', 'angularjs', 'jslibs', 'jsuser', 'styles', 'minify-css']);
// gulp.task('release-build', ['set-release', 'index', 'assets', 'templates', 'angularjs', 'jslibs', 'jsuser', 'styles', 'minify-css']);
// gulp.task('preview-build', ['set-preview', 'index', 'assets', 'templates', 'angularjs', 'jslibs', 'jsuser', 'styles', 'minify-css']);

gulp.task('build', ['js-reg', 'js-min', 'styles', 'minify-css']);

gulp.task('watch', function () {
	gulp.watch(['src/js/**/*.js'], ['js-reg']);
	gulp.watch(['src/js/**/*.js'], ['js-min']);
	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch('build/**/*.css' ['minify-css']);
});

gulp.task('default', ['build', 'watch'])
// gulp.task('preview', ['preview-build', 'watch'])
// gulp.task('debug', ['debug-build', 'watch'])
// gulp.task('release', ['release-build', 'watch'])
