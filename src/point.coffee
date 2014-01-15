class Point

  constructor: (@x, @y) ->

  getAngle: (point) ->
    [ p1, p2 ] = if point.x > @x then [ @, point ] else [ point, @ ]
    Trig.getAngleFromPoints p1, p2