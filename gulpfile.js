'use strict';
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    flatten = require('gulp-flatten');

function useMin(appName) {
    return gulp.src(['apps/' + appName + '/**', '!**/images/**'])
        .pipe(usemin({
            css: [rev()],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest('dist/' + appName));
}
function useMinBase() {
    return gulp.src(['*.html', "*.css", "*.js","!gulpfile.js"])
        .pipe(usemin({
            css: [rev()],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest('dist/'));
}
function copyImages(appName) {
    return gulp.src('apps/' + appName +
        '/images/**').pipe(flatten()).pipe(gulp.dest('dist/' + appName + '/images/'));
}

gulp.task('use-min-optus', function () {
    return useMin('optus')
});



gulp.task('copy-iar-images', function () {
    return copyImages('iar')
});

gulp.task('use-min-base',function () {
    return useMinBase();
})

gulp.task('install-fonts', function () {
    return gulp.src('**/{bootstrap,font-awesome}/fonts/*.*').pipe(flatten()).pipe(gulp.dest('dist/fonts/'))
});

gulp.task('use-min', ['install-fonts', 'use-min-base','use-min-iar', 'copy-iar-images', 'use-min-tfn','use-min-servicensw','copy-servicensw-images'])

gulp.task('connect', function () {
    connect.server({
        root: '.',
        port: 9000,
        livereload: true
    });
});

// Html reload
gulp.task('html', function () {
    return gulp.src('apps/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src('apps/**/*.js').pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src('apps/**/*.css').pipe(connect.reload());
});

gulp.task('clean', function () {
    return gulp.src(['dist', '_site'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('default', ['connect', 'watch']);

gulp.task('build-dist', ['clean'], function () {
    gulp.run('use-min');
});

gulp.task('build', ['build-dist']);

gulp.task('watch', function () {
    gulp.watch(['apps/**/*.html', 'apps/**/*.js', 'apps/**/*.css'], ['html', 'js', 'css']);
});