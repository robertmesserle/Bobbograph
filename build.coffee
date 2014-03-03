{ exec }   = require( 'child_process' )
gulp       = require( 'gulp' )
gutil      = require( 'gulp-util' )
header     = require( 'gulp-header' )
uglify     = require( 'gulp-uglify' )
browserify = require( 'gulp-browserify' )
rename     = require( 'gulp-rename' )
coffee     = require( 'gulp-coffee' )
stylus     = require( 'gulp-stylus' )
lint       = require( 'gulp-coffeelint' )
nodemon    = require( 'gulp-nodemon' )
css        = require( 'gulp-minify-css' )

comment = """
  /*! Bobbograph v3.0 by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
  /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
  """
paths = {
  tests:  'test/**/*.coffee'
  coffee: 'src/**/*.coffee'
}

gulp.task( 'stylus', ->
  gulp.src( "styl/master.styl" )
    .pipe( stylus() )
    .pipe( rename( 'bobbograph.css' ) )
    .pipe( gulp.dest( 'dist' ) )
    .pipe( css() )
    .pipe( rename( 'bobbograph.min.css' ) )
    .pipe( gulp.dest( 'dist' ) )
)

gulp.task( 'coffee', [ 'test', 'lint' ], ->
  gulp.src( 'src/core.coffee', { read: false } )
    .pipe( browserify( { transform: [ 'coffeeify' ], extensions: [ '.coffee' ] } ) )
    .pipe( header( comment ) )
    .pipe( rename( 'bobbograph.js' ) )
    .pipe( gulp.dest( 'dist' ) )
    .pipe( gulp.dest( 'www/js' ) )
    .pipe( uglify( { preserveComments: 'some' } ) )
    .pipe( rename( 'bobbograph.min.js' ) )
    .pipe( gulp.dest( 'dist' ) )
)

gulp.task( 'lint', ->
  gulp.src( [ paths.coffee, paths.tests, 'build.coffee' ] )
    .pipe( lint( 'coffeelint.json' ) )
    .pipe( lint.reporter() )
)

gulp.task( 'test', ->
  exec( './node_modules/mocha/bin/mocha --colors --recursive --compilers coffee:coffee-script/register', ( e, out, err ) ->
    gutil.log( out, err )
  )
)

gulp.task( 'dev', ->
  nodemon( { script: 'www/server.coffee', ext: 'jade coffee styl' } ).on( 'restart', 'default' )
)

gulp.task( 'default', [ 'coffee', 'stylus' ] )

gulp.task( 'watch', [ 'coffee' ], ->
  gulp.watch( paths.tests, [ 'test' ] )
    .on( 'error', console.log.bind( console ) )
    .on( 'err',   console.log.bind( console ) )
  gulp.watch( paths.coffee, [ 'coffee' ] )
  gulp.watch( '/styl/**/*.styl', [ 'stylus' ] )
)
