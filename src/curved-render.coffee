Canvas = require './canvas.coffee'

class CurvedRender extends Canvas

  constructor: ( @pixels, @context, @options ) ->
    @render @pixels, @options.line.width, @options.line.fill, @options.bevel
    if @options.bevel?.smooth
      bevel = @options.bevel.clone()
      for lineWidth in [ @options.line.width - 2 .. 2 ] by -2
        bevel.opacity /= 2
        @render @pixels, lineWidth, @options.line.fill, bevel
      console.log( @options.bevel, bevel )

  render: ( pixels, lineWidth, fill, bevel ) ->
    @renderSolid pixels, lineWidth, fill
    if bevel
      @renderHighlight pixels, lineWidth, bevel
      @renderShadow    pixels, lineWidth, bevel

  renderLine: ( pixels, offset, angleOffset ) ->
    for pixel, index in pixels
      prev    = pixels[ index - 1 ]
      next    = pixels[ index + 1 ]
      @line pixel.offsetPoint prev, next, offset, angleOffset

  renderCap: ( point, right, offset ) ->
    angle = Math.PI / 2
    if right
      @arc point, offset, angle, -angle
    else
      @arc point, offset, -angle, angle

  renderShadow: ( pixels, lineWidth, bevel) ->
    offset = lineWidth / 2
    angle = Math.PI / 2
    @begin()

    for pixel in pixels then @line pixel
    @arc pixels[ pixels.length - 1 ], offset, 0, -angle
    @renderLine pixels.slice().reverse(), offset, angle
    @arc pixels[ 0 ], offset, -angle, Math.PI

    @close()
    @fill "rgba( 0, 0, 0, #{bevel.shadow * bevel.opacity} )"

  renderHighlight: ( pixels, lineWidth, bevel ) ->
    offset = lineWidth / 2
    angle = Math.PI / 2
    @begin()

    @renderLine pixels, offset, angle
    @arc pixels[ pixels.length - 1 ], offset, angle, 0
    for pixel in pixels.slice().reverse() then @line pixel
    @arc pixels[ 0 ], offset, Math.PI, angle

    @close()
    @fill "rgba( 255, 255, 255, #{bevel.shine * bevel.opacity} )"

  renderSolid: ( pixels, lineWidth, fill ) ->
    offset = lineWidth / 2
    angle  = Math.PI / 2
    @begin()

    @renderLine pixels, offset, angle
    @renderCap  pixels[ pixels.length - 1 ], true, offset
    @renderLine pixels.slice().reverse(), offset, angle
    @renderCap  pixels[ 0 ], false, offset
    
    @close()
    @fill fill

module.exports = CurvedRender
