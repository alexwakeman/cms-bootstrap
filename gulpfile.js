var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

gulp.task('clean', function () {
	return del('dist')
});

/*
 JS dependencies, order is important
 */
var jsNPMDependencies = [
	'bootstrap/dist/**/*',
	'systemjs/dist/system.src.js',
	'zone.js/dist/zone.min.js',
	'reflect-metadata/temp/Reflect.js'
];

gulp.task('build:libs', function () {
	var mappedPaths = jsNPMDependencies.map(file => path.resolve('node_modules', file));
	gulp.src(mappedPaths, {base: 'node_modules'})
		.pipe(gulp.dest('dist/libs'));
	gulp.src('loader/systemjs.config.js')
		.pipe(gulp.dest('dist/libs/loader'));
	gulp.src('node_modules/@angular/**/bundles/*.umd.js')
		.pipe(gulp.dest('dist/libs/@angular'));
	gulp.src('node_modules/angular2-in-memory-web-api/*.js')
		.pipe(gulp.dest('dist/libs/angular2-in-memory-web-api'));
	gulp.src('node_modules/rxjs/**/*.js')
		.pipe(gulp.dest('dist/libs/rxjs'));
});

gulp.task('build:app', function () {
	var tsProject = ts.createProject('cms/tsconfig.json');
	var tsResult = gulp.src('cms/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));

	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});

gulp.task('build:html', function() {
	gulp.src('cms/**/*.html')
		.pipe(gulp.dest('dist'));
	gulp.src('cms/index.html')
		.pipe(gulp.dest('dist'));
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
		.pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('watch', ['build', 'server'], function() {
	gulp.watch('cms/stylesheets/*.scss', ['sass']);
	gulp.watch('cms/**/*.html', ['build:html']);
	gulp.watch('cms/**/*.ts', ['build:app']);
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