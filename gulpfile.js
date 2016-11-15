/*
 * @Author: accord
 * @Date:   2016-11-11 20:49:08
 * @Last Modified by:   accord
 * @Last Modified time: 2016-11-12 00:16:48
 */

'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const watch = require('gulp-watch');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const browserify = require('browserify');

const path = {
    vendor: [
        'vendor/jquery/dist/jquery.min.js',
        'vendor/bootstrap/dist/js/bootstrap.min.js',
    ],
    module: [
        'react',
        'react-router',
        'react-dom'
    ],
    js: 'app/**/*.js'
}

const dest_path = {
    js: './public/js'
}

/*
 |--------------------------------------------------------------------------
 | 合并前端框架
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', () => {
    return gulp.src(path.vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dest_path.js))
        .pipe(livereload());
});

/*
 |--------------------------------------------------------------------------
 | 合并第三方库
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', () => {
    return browserify()
        .require(path.module)
        .bundle()
        .pipe(source('vendor.bundle.js'))
        .pipe(gulp.dest(dest_path.js))
        .pipe(livereload());
});

/*
 |--------------------------------------------------------------------------
 | 编译es6,jsx
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', () => {
    return browserify('app/app.js')
        // .external(dependencies)
        .transform('babelify', { presets: ["es2015", "react"] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(livereload());
});

/*
 |--------------------------------------------------------------------------
 | 监控
 |--------------------------------------------------------------------------
 */
gulp.task('watch', () => {
	watch(path.js,() => {
		gulp.start('browserify');
	});
});

gulp.task('default', ['watch', 'browserify', 'vendor', 'browserify-vendor']);
