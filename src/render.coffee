class Render

  constructor: (@pixels, @context, @options) ->
    if @options.dashed then @renderDashed @pixels, @context, @options.dashSize
    else @renderSolid @pixels, @context

  move: (point) ->
    @context.beginPath()
    @context.moveTo point.x, point.y
  line: (point) ->
    @context.lineTo point.x, point.y
  stroke: ->
    @context.stroke()

  renderDashed: (pixels, context, size) ->
    move = false
    last = null
    for point, index in pixels
      if last
        dist = Trig.getDistanceBetweenPoints( last, point )
        if dist > size
          last = point
          if move
            @move point
          else
            @line point
            @stroke()
          move = not move
      else
        @move last = point

  renderSolid: (pixels, context) ->
    context.moveTo 0, pixels[ 0 ]
    for index in [ 1 .. pixels.length - 1 ]
      context.lineTo index, pixels[ index ]
    context.stroke()