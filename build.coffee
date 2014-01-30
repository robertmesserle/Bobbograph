gulp    = require 'gulp'
coffee  = require 'gulp-coffee'
concat  = require 'gulp-concat'
header  = require 'gulp-header'
footer  = require 'gulp-footer'
uglify  = require 'gulp-uglify'
rename  = require 'gulp-rename'

comment = """
  /*! Bobbograph (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
  /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
  """
head    = "(function ( root ) {\n"
spec    = "\nroot.spec = function ( str ) { return eval( str ); };"
foot    = "\nroot.Bobbograph = Bobbograph;\n})( this );"

parseCoffee = ( filename, head, foot ) ->
  gulp.src( [ 'src/canvas.coffee', 'src/**' ] )
    .pipe( coffee bare: true )
    .pipe( concat filename )
    .pipe( header head )
    .pipe( footer foot )
    .pipe( gulp.dest '.' )

gulp.task 'coffee', ->
  parseCoffee 'bobbograph.js', comment + head, foot

gulp.task 'spec', ->
  parseCoffee 'bobbograph.spec.js', comment + head, spec + foot

gulp.task 'min', [ 'coffee' ], ->
  gulp.src( [ 'bobbograph.js' ] )
    .pipe( uglify() )
    .pipe( rename 'bobbograph.min.js' )
    .pipe( header comment )
    .pipe( gulp.dest '.' )
