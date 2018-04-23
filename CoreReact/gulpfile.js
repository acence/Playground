﻿'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var glob = require('glob');

const vendors = ['axios', 'react', 'react-dom', 'redux', 'react-redux', 'underscore'];

gulp.task('build:js-vendor', () => {
    const b = browserify({
        debug: true
    });

    vendors.forEach(lib => {
        b.require(lib);
    });

    gulp.src('./node_modules/jquery/dist/jquery.js')
        .pipe(gulp.dest('./wwwroot/lib'));

    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('./wwwroot/lib'));


    gulp.src('./Scripts/Vendor/kendo.web-2016.2.714.js')
        .pipe(rename('kendo.js'))
        .pipe(gulp.dest('./wwwroot/lib'));

    b.bundle()
        .pipe(source('react.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./wwwroot/lib'));
});

gulp.task('build:js-app', () => {
    var moduleFiles = glob.sync('./Scripts/*.jsx');
    var modules = moduleFiles.map(function (entry) {
        browserify({
            entries: [entry],
            extensions: ['.js', '.jsx'],
            debug: true
        })
            .external(vendors) // Specify all vendors as external source
            .transform(babelify, { presets: ["es2015", "react"] })
            .bundle()
            .pipe(source(fixNameJSX(entry)))
            .pipe(buffer())
            .pipe(gulp.dest('./wwwroot/js'));
    });
});

gulp.task('build:css-vendor', () => {
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('./wwwroot/css'));

    gulp.src('./Styles/Vendor/kendo.common.css')
        .pipe(rename('kendo.css'))
        .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('build:css-sass', () => {
    return gulp.src('./Styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(fixNameCSS))
        .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('watch', function () {
    gulp.watch('./Styles/**/*.scss', ['build:css-sass']);
    gulp.watch('./Scripts/**/*.jsx', ['build:js-app']);
}); 

// helper functions
var fixNameJSX = function (name) {
    name = name.replace(/^.*[\\\/]/, '');
    name = name.charAt(0).toLowerCase() + name.slice(1);
    name = name.replace('.jsx', '.js');
    return name;
}
var fixNameCSS = function (name) {
    name.basename = name.basename.charAt(0).toLowerCase() + name.basename.slice(1);
}
// helper functions

gulp.task('default', ['build:css-vendor', 'build:css-sass', 'build:js-app', 'build:js-vendor']);