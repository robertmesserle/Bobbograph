class Render

  constructor: (@pixels, @context, @options) ->
    if @options.dashed
      @renderDashed(@pixels, @context, @options.dashSize)
    else
      @renderSolid(@pixels, @context)

  renderDashed: (pixels, context, size) ->
    last = x: 0, y: pixels[ 0 ]
    context.moveTo last.x, last.y
    line = true
    for index in [ 1 .. pixels.length - 1 ]
      dist = Trig.getDistanceBetweenPoints last.x, last.y, index, pixels[ index ]
      if dist > size
        if line
          context.lineTo index, pixels[ index ]
          context.stroke()
        else
          context.beginPath()
          context.moveTo index, pixels[ index ]
        line = not line
        last = x: index, y: pixels[ index ]

  renderSolid: (pixels, context) ->
    context.moveTo 0, pixels[0]
    for index in [ 1 .. pixels.length - 1 ]
      context.lineTo index, pixels[ index ]
    context.stroke()
