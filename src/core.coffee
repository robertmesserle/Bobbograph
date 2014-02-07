Options      = require( './options.coffee' )
Data         = require( './data.coffee' )
Renderer     = require( './renderer.coffee' )
XAxis        = require( './x-axis.coffee' )
YAxis        = require( './y-axis.coffee' )

class Bobbograph

  clss: 'bbg-container'

  constructor: ( id, data, options ) ->
    @element   = @getElement( id )
    @options   = new Options( options, @element )
    @container = @getContainer( @element, @options )
    @context   = @getContext( @container )
    @data      = new Data( data, @options )
    @xAxis     = new XAxis( @options.xAxis, @container, @options, @data )
    @yAxis     = new YAxis( @options.yAxis, @container, @options, @data )

    new Renderer( @data.pixels, @context, @options, @options.line.smooth )

  getContainer: ( element, options ) ->
    container = document.createElement( 'div' )
    container.className = @clss
    element.appendChild( container )
    container

  getElement: ( id ) ->
    if typeof id is 'string' then document.getElementById( id ) or document.querySelector( id )
    else id[ 0 ] or id

  getContext: ( element ) ->
    canvas  = document.createElement( 'canvas' )
    canvas.setAttribute( 'height', @options.height )
    canvas.setAttribute( 'width',  @options.width )
    element.appendChild( canvas )
    context = canvas.getContext( '2d' )

window?.Bobbograph = Bobbograph
global?.Bobbograph = Bobbograph
