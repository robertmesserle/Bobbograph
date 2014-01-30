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

gulp.task 'coffee', ->
  gulp.src( [ 'src/canvas.coffee', 'src/**' ] )
    .pipe( coffee bare: true )
    .pipe( concat 'bobbograph.js' )
    .pipe( header head )
    .pipe( footer foot )
    .pipe( gulp.dest '.' )

gulp.task 'spec', ->
  gulp.src( [ 'src/canvas.coffee', 'src/**' ] )
    .pipe( coffee bare: true )
    .pipe( concat 'bobbograph.js' )
    .pipe( header comment + head )
    .pipe( footer spec + foot )
    .pipe( rename 'bobbograph.spec.js' )
    .pipe( gulp.dest '.' )

gulp.task 'min', ->
  gulp.src( [ 'bobbograph.js' ] )
    .pipe( uglify() )
    .pipe( rename 'bobbograph.min.js' )
    .pipe( header comment )
    .pipe( gulp.dest '.' )
