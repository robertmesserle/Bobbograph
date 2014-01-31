Trig = require './trig.coffee'
Point = require './point.coffee'

module.exports = class Segment

  constructor: ( @p1, @p2, @offset ) ->
    @angle        = @reduceAngle Trig.getAngleFromPoints @p1, @p2
    @slope        = ( @p2.y - @p1.y ) / ( @p2.x - @p1.x )
    @yint         = @p1.y - @slope * @p1.x

    @topAngle     = @angle + Trig.rad 90
    @bottomAngle  = @angle - Trig.rad 90

    @corner1      = @p1.getPointFromAngle @topAngle, @offset
    @corner2      = @p2.getPointFromAngle @topAngle, @offset
    @corner3      = @p2.getPointFromAngle @bottomAngle, @offset
    @corner4      = @p1.getPointFromAngle @bottomAngle, @offset

  reduceAngle: ( angle ) ->
    while angle > Math.PI
      angle -= 2 * Math.PI
    angle

  intersects: ( segment ) ->
    x = ( segment.yint - @yint ) / ( @slope - segment.slope )
    y = @slope * x + @yint
    new Point x, y
