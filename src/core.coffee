Options      = require( './options.coffee' )
Data         = require( './data.coffee' )
Renderer     = require( './renderer.coffee' )
XAxis        = require( './x-axis.coffee' )

class Bobbograph

  constructor: ( id, data, options ) ->
    @element = @getElement( id )
    @options = new Options( options, @element )
    @context = @getContext( @element )
    @data    = new Data( data, @options )

    new Renderer( @data.pixels, @context, @options, @options.line.smooth )

    @xAxis = new XAxis( @options.xAxis, @element, @options )

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
