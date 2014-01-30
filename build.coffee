gulp    = require 'gulp'
coffee  = require 'gulp-coffee'
concat  = require 'gulp-concat'
header  = require 'gulp-header'
footer  = require 'gulp-footer'
uglify  = require 'gulp-uglify'
rename  = require 'gulp-rename'

comment = "/* Bobbograph v2.0.0 by Robert Messerle - http://github.com/robertmesserle/Bobbograph.git */\n"
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
