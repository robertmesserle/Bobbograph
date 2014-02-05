Trig = require( './trig.coffee' )

class Point

  constructor: ( @x, @y ) ->

  getAngle: ( point ) ->
    [ p1, p2 ] = if point.x > @x then [ this, point ] else [ point, this ]
    Trig.getAngleFromPoints( p1, p2 )

  offsetPoint: ( prev = this, next = this, offset, angleOffset ) ->
    angle = Trig.getAngleFromPoints( prev, next )
    perp  = angle + angleOffset
    point = @getPointFromAngle( perp, offset )

  getPointFromAngle: ( angle, distance ) ->
    point = Trig.getPointFromAngle( this, angle, distance )
    new Point( point.x, point.y )

module.exports = Point
