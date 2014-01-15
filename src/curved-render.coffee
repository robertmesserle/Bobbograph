class CurvedRender extends Canvas

  constructor: (@pixels, @context, @options) ->
    @renderSolid @pixels, @options.lineWidth

  renderLine: (pixels, offset, angleOffset) ->
    for pixel, index in pixels
      prev    = pixels[ index - 1 ]
      next    = pixels[ index + 1 ]
      @line pixel.offsetPoint prev, next, offset, angleOffset

  renderCap: (point, right, offset) ->
    angle = Math.PI / 2
    if right
      @arc point, offset, angle, -angle
    else
      @arc point, offset, -angle, angle

  renderSolid: (pixels, lineWidth) ->
    offset = lineWidth / 2
    angle  = Math.PI / 2
    @begin()

    @renderLine pixels, offset, angle
    @renderCap  pixels[ pixels.length - 1 ], true, offset
    @renderLine pixels.slice().reverse(), offset, angle
    @renderCap  pixels[ 0 ], false, offset
    
    @close()
    @stroke()
