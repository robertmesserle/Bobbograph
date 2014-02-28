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

  clear: ->
    @context.clearRect( 0, 0, @options.width, @options.height )

  line: ( point ) ->
    left = @scaleX( point.x )
    top  = @scaleY( point.y )
    if @continue
      @context.lineTo( left, top )
    else
      @context.moveTo( left, top )
      @continue = true

  arc: ( point, radius, angle1, angle2, ccw ) ->
    left = @scaleX( point.x )
    top  = @scaleY( point.y )
    @context.arc( left, top, radius, -angle1, -angle2, ccw )

  arcTo: ( point1, point2, radius ) ->
    @context.arcTo( @scaleX( point1.x ), @scaleY( point1.y ), @scaleX( point2.x ), @scaleY( point2.y ), radius )

  bezierCurveTo: ( point1, point2, point3 ) ->
    @context.bezierCurveTo( @scaleX( point1.x ), @scaleY( point1.y ), @scaleX( point2.x ), @scaleY( point2.y ), @scaleX( point3.x ), @scaleY( point3.y ) )

  stroke: ( fill ) ->
    if fill then @context.strokeStyle = fill
    @context.stroke()

  fill: ( fill ) ->
    if fill then @context.fillStyle = fill.get?( @context ) or fill
    @context.fill()

module.exports = Canvas
