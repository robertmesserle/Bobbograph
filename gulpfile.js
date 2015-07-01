(function () {
  var gulp = require('gulp');
  var gutil = require('gulp-util');
  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');
  var mocha = require('gulp-mocha');
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');

  gulp.task('default', [ 'test', 'uglify' ]);

  gulp.task('uglify', [ 'build' ], function () {
    gulp.src('dist/bobbograph.js')
        .pipe(uglify())
        .pipe(rename('bobbograph.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('www/js'));
  });

  gulp.task('build', function () {
    browserify()
        .add('src/Bobbograph.ts')
        .plugin('tsify', { noImplicitAny: true })
        .bundle()
        .pipe(source('bobbograph.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('www/js'));
  });

  gulp.task('test', function () {
    browserify()
        .add('src/Bobbograph.spec.ts')
        .plugin('tsify', { noImplicitAny: true })
        .bundle()
        .pipe(source('bobbograph.spec.js'))
        .pipe(gulp.dest('test'))
        .pipe(mocha({ reporter: 'progress' }));
  });

  gulp.task('watch', [ 'default' ], function () {
    gulp.watch('src/**/*.ts', [ 'default' ])
        .on('error', gutil.log)
        .on('err', gutil.log);
  });
})();
