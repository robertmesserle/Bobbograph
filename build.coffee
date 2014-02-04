gulp       = require 'gulp'
header     = require 'gulp-header'
uglify     = require 'gulp-uglify'
browserify = require 'gulp-browserify'
rename     = require 'gulp-rename'
mocha      = require 'gulp-mocha'
coffee     = require 'gulp-coffee'

comment = """
  /*! Bobbograph v2.0 by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
  /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
  """
paths =
  tests: [ 'test/**.coffee', 'test/**/*.coffee' ]
  coffee: [ 'src/core.coffee' ]

gulp.task 'coffee', [ 'test' ], ->
  gulp.src( 'src/core.coffee', read: false )
    .pipe( browserify( transform: [ 'coffeeify' ], extensions: [ '.coffee' ] ) )
    .pipe( header comment )
    .pipe( rename 'bobbograph.js' )
    .pipe( gulp.dest '.' )

gulp.task 'test', ->
  gulp.src( paths.tests, read: false )
    .pipe( coffee bare: true )
    .pipe( mocha() )

gulp.task 'min', [ 'coffee' ], ->
  gulp.src( 'bobbograph.js' )
    .pipe( uglify() )
    .pipe( header comment )
    .pipe( rename 'bobbograph.min.js' )
    .pipe( gulp.dest '.' )
    .pipe( gulp.dest 'www/pub/js' )

gulp.task 'default', [ 'min' ]

gulp.task 'watch', [ 'min' ], ->
  gulp.watch paths.tests, [ 'test' ]
  gulp.watch paths.coffee, [ 'min' ]
