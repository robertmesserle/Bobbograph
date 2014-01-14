module.exports = ( grunt ) ->

  header =
    banner:
      """
      /*! Bobbograph (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
      /*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */
      """
    js:
      """
      ( function ( root ) {
      """

  footer =
    spec:
      """
        root.get = function (str) { return eval(str) };
      })(this);
      """
    js:
      """
      if ( typeof define === 'function' && define.amd ) define( function () { return Bobbograph } )
      else root.Bobbograph = Bobbograph
      } )( this )
      """

  grunt.initConfig
    # Compile .coffee files into .js files and send them to the 'tmp' directory
    coffee:
      core:
        expand: true
        cwd: 'src'
        src: [ '*.coffee', '**/*.coffee' ]
        dest: 'tmp'
        ext: '.js'
        options:
          bare: true
    # Combine the compiled .js files into a single .js file
    concat:
      core:
        options:
          stripBanners: true
          banner: "#{ header.banner }\n\n#{ header.js }\n"
          footer: "#{ footer.js }"
        src: [ 'tmp/*.js' ]
        dest: 'bobbograph.js'
      spec:
        options:
          stripBanners: true
          banner: "#{ header.js }\n"
          footer: "#{ footer.spec }"
        src: [ 'tmp/*.js' ]
        dest: 'bobbograph.spec.js'
    # Create a minified .min.js copy of the combined .js
    uglify:
      options:
        mangle: false
        banner: "#{ header.banner }\n\n"
      compile:
        files: 'bobbograph.min.js': [ 'bobbograph.js' ]
    # Remove the 'tmp' directory
    clean: 
      tmp: [ 'tmp' ]
    # Watch for changes
    watch:
      scripts:
        files: [ 'Gruntfile.coffee', 'src/*.coffee' ]
        tasks: [ 'coffee', 'concat', 'uglify', 'clean:tmp' ]
    connect:
      server:
        options:
          port: 8383
          base: '.'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', [ 'coffee', 'concat', 'uglify', 'clean:tmp' ]
