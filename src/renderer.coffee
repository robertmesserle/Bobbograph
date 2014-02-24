Canvas = require( './canvas.coffee' )

class Render extends Canvas

  constructor: ( @pixels, @context, @options ) ->
    @render( @options.line.width, @options.bevel )
    if @options.bevel?.smooth
      bevel = @options.bevel.clone()
      for lineWidth in [ @options.line.width - 2 .. 2 ] by -2
        bevel.opacity /= 2
        @render( lineWidth, bevel )

  render: ( lineWidth, bevel ) ->
    @renderFill() if @options.fill
    @renderSolid( lineWidth, @options.line.fill )
    if bevel
      @renderHighlight( lineWidth, bevel )
      @renderShadow(    lineWidth, bevel )

  renderFill: ->
    offset = @options.line.width / 2
    bottom = -offset
    first  = @pixels[ 0 ]
    last   = @pixels[ @pixels.length - 1 ]
    right  = last.x + offset
    left   = first.x - offset

    for pixel, index in @pixels then @line( pixel )
    
    @line( { x: right, y: last.y  } )
    @line( { x: right, y: bottom  } )
    @line( { x: left,  y: bottom  } )
    @line( { x: left,  y: first.y } )
    @close()
    @fill( @options.fill )

  renderLine: ( pixels, offset, angleOffset ) ->
    for pixel, index in pixels
      prev    = pixels[ index - 1 ]
      next    = pixels[ index + 1 ]
      point = pixel.offsetPoint( prev, next, offset, angleOffset )
      @line( point )

  renderCap: ( point, right, offset ) ->
    angle = Math.PI / 2
    if right
      @arc( point, offset, angle, -angle )
    else
      @arc( point, offset, -angle, angle )

  renderShadow: ( lineWidth, bevel) ->
    offset = lineWidth / 2
    angle = Math.PI / 2
    @begin()

    for pixel in @pixels then @line( pixel )
    @arc( @pixels[ @pixels.length - 1 ], offset, 0, -angle )
    @renderLine( @pixels.slice().reverse(), offset, angle )
    @arc( @pixels[ 0 ], offset, -angle, Math.PI )

    @close()
    @fill( "rgba( 0, 0, 0, #{bevel.shadow * bevel.opacity} )" )

  renderHighlight: ( lineWidth, bevel ) ->
    offset = lineWidth / 2
    angle = Math.PI / 2
    @begin()

    @renderLine( @pixels, offset, angle )
    @arc( @pixels[ @pixels.length - 1 ], offset, angle, 0 )
    for pixel in @pixels.slice().reverse() then @line( pixel )
    @arc( @pixels[ 0 ], offset, Math.PI, angle )

    @close()
    @fill( "rgba( 255, 255, 255, #{bevel.shine * bevel.opacity} )" )

  renderSolid: ( lineWidth, fill ) ->
    offset = lineWidth / 2
    angle  = Math.PI / 2
    @begin()

    @renderLine( @pixels, offset, angle )
    @renderCap(  @pixels[ @pixels.length - 1 ], true, offset )
    @renderLine( @pixels.slice().reverse(), offset, angle )
    @renderCap(  @pixels[ 0 ], false, offset )
    
    @close()
    @fill( fill )

module.exports = Render
