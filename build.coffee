{ exec }   = require( 'child_process' )
gulp       = require( 'gulp' )
gutil      = require( 'gulp-util' )
header     = require( 'gulp-header' )
uglify     = require( 'gulp-uglify' )
browserify = require( 'gulp-browserify' )
rename     = require( 'gulp-rename' )
coffee     = require( 'gulp-coffee' )
jade       = require( 'gulp-jade' )
stylus     = require( 'gulp-stylus' )
lint       = require( 'gulp-coffeelint' )
connect    = require( 'gulp-connect' )

comment = """
  /*! Bobbograph v3.0 by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
  /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
  """
paths = {
  tests:  'test/**/*.coffee'
  coffee: 'src/**/*.coffee'
}

gulp.task( 'jade', ->
  gulp.src( "www/src/index.jade" )
    .pipe( jade() )
    .pipe( rename( 'index.html' ) )
    .pipe( gulp.dest( 'www/pub' ) )
    .pipe( connect.reload() )
)

gulp.task( 'stylus', ->
  gulp.src( "www/src/styl/master.styl" )
    .pipe( stylus( { use: [ 'nib' ], import: [ 'nib' ] } ) )
    .pipe( rename( 'master.css' ) )
    .pipe( gulp.dest( 'www/pub' ) )
    .pipe( connect.reload() )
)

gulp.task( 'coffee', [ 'test', 'lint' ], ->
  gulp.src( 'src/core.coffee', { read: false } )
    .pipe( browserify( { transform: [ 'coffeeify' ], extensions: [ '.coffee' ] } ) )
    .pipe( header( comment ) )
    .pipe( rename( 'bobbograph.js' ) )
    .pipe( gulp.dest( '.' ) )
    .pipe( gulp.dest( 'www/pub/js' ) )
    .pipe( uglify( { preserveComments: 'some' } ) )
    .pipe( rename( 'bobbograph.min.js' ) )
    .pipe( gulp.dest( '.' ) )
    .pipe( connect.reload() )
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

gulp.task( 'connect', connect.server( {
  root: "#{__dirname}/www/pub"
  port: 1337
  livereload: true
  open: {
    browser: 'chrome'
  }
} ) )

gulp.task( 'default', [ 'coffee', 'jade', 'stylus' ] )

gulp.task( 'watch', [ 'coffee', 'connect' ], ->
  gulp.watch( paths.tests, [ 'test' ] )
    .on( 'error', console.log.bind( console ) )
    .on( 'err',   console.log.bind( console ) )
  gulp.watch( paths.coffee, [ 'coffee' ] )
  gulp.watch( 'www/src/index.jade', [ 'jade' ] )
  gulp.watch( 'www/src/styl/**/*.styl', [ 'stylus' ] )
)
