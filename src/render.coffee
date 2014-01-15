class Render extends Canvas

  constructor: (@pixels, @context, @options) ->
    @renderSolid @pixels, @options.lineWidth

  renderLine: (pixels, lineWidth, angleOffset) ->
    for pixel, index in pixels
      prev    = pixels[ index - 1 ]
      next    = pixels[ index + 1 ]
      @line pixel.offsetPoint prev, next, lineWidth, angleOffset

  renderCap: (point, right, offset) ->
    if right
      @arc point, offset, -Math.PI / 2, Math.PI / 2
    else
      @arc point, offset, Math.PI / 2, -Math.PI / 2

  renderSolid: (pixels, lineWidth) ->
    offset = lineWidth / 2
    angle  = Math.PI / 2
    @begin()
    @renderLine pixels, offset, angle
    @renderCap  pixels[ pixels.length - 1 ], true, offset
    @renderLine pixels.slice().reverse(), offset, angle
    @renderCap  pixels[ 0 ], false, offset
    # Stroke the line (ohhhhh yea)
    @close()
    @stroke()
