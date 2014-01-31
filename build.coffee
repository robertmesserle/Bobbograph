gulp       = require 'gulp'
header     = require 'gulp-header'
uglify     = require 'gulp-uglify'
browserify = require 'gulp-browserify'
rename     = require 'gulp-rename'

comment = """
  /*! Bobbograph (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
  /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
  """

gulp.task 'coffee', ->
  gulp.src( 'src/core.coffee', read: false )
    .pipe( browserify( transform: [ 'coffeeify' ], extensions: [ '.coffee' ] ) )
    .pipe( header comment )
    .pipe( rename 'bobbograph.js' )
    .pipe( gulp.dest '.' )


gulp.task 'min', [ 'coffee' ], ->
  gulp.src( 'bobbograph.js' )
    .pipe( uglify() )
    .pipe( header comment )
    .pipe( rename 'bobbograph.min.js' )
    .pipe( gulp.dest '.' )
