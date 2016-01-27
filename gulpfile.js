var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var stripCssComments = require('gulp-strip-css-comments');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');

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

gulp.task('index', function () {
	gulp.src(['src/index.html'])
		.pipe(preprocess(preprocess_context))
		.pipe(gulp.dest('./build'))
});

gulp.task('templates', function () {
	gulp.src(['src/app/**/*.html'])
		.pipe(gulp.dest('./build'))
});

gulp.task('assets', function () {
	gulp.src(['src/assets/img/**/*'])
		.pipe(gulp.dest('./build/img'))
	gulp.src(['src/assets/fonts/**/*'])
		.pipe(gulp.dest('./build/fonts'))
	gulp.src(['src/assets/css/**/*'])
		.pipe(gulp.dest('./build/css'))
});

gulp.task('angularjs', function () {
	gulp.src(['src/app/**/app.module.js', 'src/app/**/*.js'])
		.pipe(plumber({
			errorHandler: onError
		}))
		//.pipe(sourcemaps.init())
		.pipe(preprocess(preprocess_context))
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		//.pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/js'))
});


gulp.task('jslibs', function () {
	return gulp.src('src/assets/js/**/*.js')
		.pipe(plumber({
			errorHandler: onError
		}))
		//.pipe(uglify())
		/*.pipe(rename({
	 		extname: '.min.js'
		}))*/
		.pipe(preprocess(preprocess_context))
		.pipe(gulp.dest('./build/js'))
});

gulp.task('jsuser', function () {
	return gulp.src('src/assets/js/*.js')
		.pipe(plumber({
			errorHandler: onError
		}))
		//.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
});

gulp.task('styles', function () {
	gulp.src('src/assets/scss/**/*.scss')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(stripCssComments())
		.pipe(gulp.dest('./build/css/'));
});


gulp.task('minify-css', function () {
	return gulp.src('build/css/**/*.css')
		.pipe(minifyCss({
			compatibility: 'ie9'
		}))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('set-debug', function () {
	preprocess_context = {
		context: {
			DEBUG: true
		}
	};
});
gulp.task('set-preview', function () {
	preprocess_context = {
		context: {
			PREVIEW: true
		}
	};
});
gulp.task('set-release', function () {
	preprocess_context = {
		context: {
			RELEASE: true
		}
	};
});

gulp.task('debug-build', ['set-debug','index', 'assets', 'templates', 'angularjs', 'jslibs', 'jsuser', 'styles', 'minify-css']);
gulp.task('release-build', ['set-release', 'index', 'assets', 'templates', 'angularjs', 'jslibs', 'jsuser', 'styles', 'minify-css']);
gulp.task('preview-build', ['set-preview', 'index', 'assets', 'templates', 'angularjs', 'jslibs', 'jsuser', 'styles', 'minify-css']);

gulp.task('watch', function () {
	gulp.watch('src/**/*.html', ['index']);
	gulp.watch(['src/assets/img/**/*', 'src/assets/fonts/*', 'src/assets/css/**/*'], ['assets']);
	gulp.watch('src/app/**/*.html', ['templates']);
	gulp.watch(['src/app/**/app.module.js', 'src/app/**/app.states.js', 'src/app/**/*.js'], ['angularjs']);
	gulp.watch('src/assets/js/**/*.js', ['jslibs']);
	gulp.watch('src/assets/js/*.js', ['jsuser']);
	gulp.watch('src/assets/scss/**/*.scss', ['styles']);
	gulp.watch('build/css/**/*.css' ['minify-css']);
});

gulp.task('default', ['preview-build', 'watch'])
gulp.task('preview', ['preview-build', 'watch'])
gulp.task('debug', ['debug-build', 'watch'])
gulp.task('release', ['release-build', 'watch'])
