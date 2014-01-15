class Trig

  @rad: (deg) ->
    deg * Math.PI / 180

  @deg: (rad) ->
    rad * 180 / Math.PI

  @getBaseAngleFromPoints: (dx, dy) ->
    angle = Math.atan(dy / dx)
    return Math.abs angle

  @getQuadrant: (dx, dy) ->
    if dy >= 0
      if dx >= 0 then 1
      else 2
    else
      if dx < 0 then 3
      else 4

  @getAngleFromPoints: (p1, p2) ->
    dx          = p2.x - p1.x
    dy          = p2.y - p1.y
    baseAngle   = @getBaseAngleFromPoints dx, dy

    switch @getQuadrant dx, dy
      when 1 then baseAngle
      when 2 then Math.PI - baseAngle
      when 3 then Math.PI + baseAngle
      when 4 then 2 * Math.PI - baseAngle

  @getDistanceBetweenPoints: (p1, p2) ->
    dx = p2.x - p1.x
    dy = p2.y - p1.y
    distance = Math.sqrt(dx * dx + dy * dy)

  @getPointFromAngle: (origin, angle, distance) ->
    { x, y } = origin
    if angle is Math.PI
      new Point x - distance, y
    else if angle is Math.PI / 2
      new Point x, y + distance
    else if angle is Math.PI * 1.5
      new Point x, y - distance
    else if angle is 0
      new Point x + distance, y
    else
      new Point Math.cos(angle) * distance + x, Math.sin(angle) * distance + y