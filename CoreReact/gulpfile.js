'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var glob = require('glob');

const vendors = ['react', 'react-dom', 'redux', 'react-redux'];

gulp.task('build:js-vendor', () => {
    const b = browserify({
        debug: true
    });

    vendors.forEach(lib => {
        b.require(lib);
    });

    b.bundle()
        .pipe(source('vendor.js'))
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

gulp.task('build:css-sass', () => {
    'use strict';
    return gulp.src('./Styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(fixNameCSS))
        .pipe(gulp.dest('./wwwroot/css'));
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

gulp.task('default', ['build:css-sass', 'build:js-app', 'build:js-vendor']);