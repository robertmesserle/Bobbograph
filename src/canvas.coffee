class Canvas

  scaleX: ( x ) ->
    @options.padding.left + x

  scaleY: ( y ) ->
    @options.usableHeight - y + @options.padding.top

  begin: ->
    @continue = false
    @context.beginPath()

  close: ->
    @context.closePath()
    @continue = false

  line: ( point ) ->
    left = @scaleX point.x
    top  = @scaleY point.y
    if @continue
      @context.lineTo left, top
    else
      @context.moveTo left, top
      @continue = true

  arc: ( point, radius, angle1, angle2, ccw ) ->
    left = @scaleX point.x
    top  = @scaleY point.y
    @context.arc left, top, radius, -angle1, -angle2, ccw

  stroke: ( color ) ->
    if color then @context.strokeStyle = color
    @context.stroke()

  fill: ( color ) ->
    if color then @context.fillStyle = color
    @context.fill()
