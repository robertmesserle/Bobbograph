Options  = require( './options.coffee' )
Data     = require( './data.coffee' )
Renderer = require( './renderer.coffee' )
XAxis    = require( './x-axis.coffee' )
YAxis    = require( './y-axis.coffee' )
Animator = require( './animator.coffee' )

class Bobbograph

  clss: 'bbg-container'

  constructor: ( id, data, options ) ->
    @element   = @getElement( id )
    @options   = new Options( options, @element )
    @container = @getContainer()
    @element.appendChild( @container )
    @canvas    = @getCanvas()
    @container.appendChild( @canvas )
    @context   = @getContext()
    @data      = new Data( data, @options )
    @xAxis     = new XAxis( @options.xAxis, @container, @options, @data )
    @yAxis     = new YAxis( @options.yAxis, @container, @options, @data )

    if @options.animation
      new Animator( @options.animation, ( percentage ) =>
        pixels = @data.pixels.slice( 0, @data.pixels.length * percentage )
        new Renderer( pixels, @context, @options )
      )
    else new Renderer( @data.pixels, @context, @options )

  getContainer: ->
    container = document.createElement( 'div' )
    container.className = @clss
    container

  getElement: ( id ) ->
    if typeof id is 'string' then document.getElementById( id ) or document.querySelector( id )
    else id[ 0 ] or id

  getCanvas: ->
    canvas  = document.createElement( 'canvas' )
    canvas.setAttribute( 'height', @options.height )
    canvas.setAttribute( 'width',  @options.width )
    canvas

  getContext: ->
    context = @canvas.getContext( '2d' )

window?.Bobbograph = Bobbograph
module?.exports    = Bobbograph
