var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

var dependencies = [
	srcDestination('node_modules/bootstrap/dist/**/*', 'dist/cms/libs/bootstrap'),
	srcDestination('node_modules/systemjs/dist/system.src.js', 'dist/cms/libs/systemjs'),
	srcDestination('node_modules/zone.js/dist/zone.min.js', 'dist/cms/libs/zone.js'),
	srcDestination('node_modules/reflect-metadata/Reflect.js', 'dist/cms/libs/reflect-metadata'),
	srcDestination('loader/systemjs.config.js', 'dist/cms/loader'),
	srcDestination('node_modules/@angular/**/bundles/*.umd.js', 'dist/cms/libs/@angular'),
	srcDestination('node_modules/rxjs/**/*.js', 'dist/cms/libs/rxjs')
];

gulp.task('clean', function () {
	return del('dist')
});

gulp.task('build:libs', function () {
	dependencies.forEach((dep) => gulp.src(dep.src).pipe(gulp.dest(dep.dest)));
});

gulp.task('build:app', ['build:loader'], function () {
	var tsProject = ts.createProject('cms/tsconfig.json');
	var tsResult = gulp.src('cms/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/cms'));
});

gulp.task('build:html', function() {
	gulp.src('cms/**/*.html')
		.pipe(gulp.dest('dist/cms'));
	gulp.src('cms/index.html')
		.pipe(gulp.dest('dist/cms'));
});

gulp.task('build:login', function () {
	gulp.src('node_modules/bootstrap/dist/**/*')
		.pipe(gulp.dest('dist/login/bootstrap'));
	return gulp.src('login/**/*')
		.pipe(gulp.dest('dist/login'));
});

gulp.task('sass', function() {
	return gulp.src('cms/stylesheets/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/cms/stylesheets'));
});

gulp.task('watch', ['build', 'server'], function() {
	gulp.watch('cms/stylesheets/*.scss', ['sass']);
	gulp.watch('cms/**/*.html', ['build:html']);
	gulp.watch('cms/**/*.ts', ['build:app']);
	gulp.watch('cms/loader/systemjs.config.js', ['build:loader']);
});

gulp.task('build:loader', function() {
	gulp.src('cms/loader/systemjs.config.js')
		.pipe(gulp.dest('dist/cms/loader'));
});

gulp.task('server', function() { // starts and restarts the node server
	nodemon({
		script: 'server/server.js',
		watch: ['server/**/*.js'],
		ext: 'js'
	}).on('restart', () => {
		console.warn('Restarted the node daemon - server/server.js');
	});
});


gulp.task('build', function (callback) {
	runSequence('clean', 'build:libs', 'build:app', 'build:html', 'build:login', 'sass', callback);
});

gulp.task('default', ['build']);


/*
 Utility functions
 */

function srcDestination(src, destination) {
	if (!src || !destination) throw new Error('Both source and destination are required.');
	return {
		src: src,
		dest: destination
	}
}