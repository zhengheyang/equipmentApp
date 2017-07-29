var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function () {
    gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// 合并controllers
gulp.task('concat-controllers', function () {
    gulp.src(['./js/base.js', './js/main.js', './js/signIn.js', './templates/**/*.js'])
        .pipe(concat('controller.js'))
        .pipe(gulp.dest('./dist/js'));
        // .pipe(uglify())
});

gulp.task('auto', ['concat-controllers'], function () {
    gulp.watch(['./js/base.js', './js/main.js', './js/signIn.js', './templates/**/*.js'],['concat-controllers'], function (event) {
        console.log('Controller ' + event.path + 'was' + event.type);
    });
});
