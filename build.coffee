gulp       = require 'gulp'
header     = require 'gulp-header'
uglify     = require 'gulp-uglify'
browserify = require 'gulp-browserify'
rename     = require 'gulp-rename'
mocha      = require 'gulp-mocha'
coffee     = require 'gulp-coffee'
jade       = require 'gulp-jade'
stylus     = require 'gulp-stylus'
lint       = require 'gulp-coffeelint'

comment = """
  /*! Bobbograph v2.0 by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
  /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
  """
paths =
  tests:  [ 'test/*.coffee', 'test/**/*.coffee' ]
  coffee: [ 'src/*.coffee',  'src/**/*.coffee'  ]

gulp.task 'jade', ->
  gulp.src( "www/src/index.jade" )
    .pipe( jade() )
    .pipe( rename 'index.html' )
    .pipe( gulp.dest 'www/pub' )

gulp.task 'stylus', ->
  gulp.src( "www/src/styl/master.styl" )
    .pipe( stylus() )
    .pipe( rename 'master.css' )
    .pipe( gulp.dest 'www/pub' )

gulp.task 'coffee', [ 'test', 'lint' ], ->
  gulp.src( 'src/core.coffee', read: false )
    .pipe( browserify( transform: [ 'coffeeify' ], extensions: [ '.coffee' ] ) )
    .pipe( header comment )
    .pipe( rename 'bobbograph.js' )
    .pipe( gulp.dest '.' )

gulp.task 'lint', ->
  gulp.src( paths.coffee.concat( paths.tests ) )
    .pipe( lint 'coffeelint.json' )
    .pipe( lint.reporter() )

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

gulp.task 'default', [ 'min', 'jade', 'stylus' ]

gulp.task 'watch', [ 'min' ], ->
  gulp.watch paths.tests,           [ 'test' ]
  gulp.watch paths.coffee,          [ 'min' ]
  gulp.watch 'www/src/index.jade',  [ 'jade' ]
  gulp.watch 'www/src/styl/*.styl', [ 'stylus' ]
