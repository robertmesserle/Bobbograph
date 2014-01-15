class Segment

  constructor: ( @p1, @p2, @offset ) ->
    @angle        = @reduceAngle Trig.getAngleFromPoints( @p1, @p2 )
    @slope        = ( @p2.y - @p1.y ) / ( @p2.x - @p1.x )
    @yint         = @p1.y - @slope * @p1.x

    @topAngle     = @angle + Trig.rad( 90 )
    @bottomAngle  = @angle - Trig.rad( 90 )

    @corner1      = Trig.getPointFromAngle( @p1, @topAngle, @offset )
    @corner2      = Trig.getPointFromAngle( @p2, @topAngle, @offset )
    @corner3      = Trig.getPointFromAngle( @p2, @bottomAngle, @offset )
    @corner4      = Trig.getPointFromAngle( @p1, @bottomAngle, @offset )

  reduceAngle: ( angle ) ->
    while angle > Math.PI
      angle -= 2 * Math.PI
    angle

  intersects: ( segment ) ->
    x = ( segment.yint - @yint ) / ( @slope - segment.slope )
    y = @slope * x + @yint
    new Point x, y