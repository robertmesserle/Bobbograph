class Trig

  @rad: (deg) ->
    deg * Math.PI / 180

  @deg: (rad) ->
    rad * 180 / Math.PI

  @getBaseAngleFromPoints: (dx, dy) ->
    angle = Math.atan(dy / dx)
    return Math.abs angle

  @getAngleFromPoints: (x1, y1, x2, y2) ->
    dx = x2 - x1
    dy = y2 - y1
    baseAngle = @getBaseAngleFromPoints(dx, dy)
    if dx > 0
      if dy > 0 then baseAngle
      else if dy < 0 then 2 * Math.PI - baseAngle
      else 0
    else if dx < 0
      if dy > 0 then Math.PI - baseAngle
      else if dy < 0 then Math.PI + baseAngle
      else Math.PI
    else
      if dy > 0 then Math.PI / 2
      else if dy < 0 then Math.PI * 1.5
      else 0

  @getDistanceBetweenPoints: (x1, y1, x2, y2) ->
    dx = x2 - x1
    dy = y2 - y1
    distance = Math.sqrt(dx * dx + dy * dy)

  @getPointFromAngle: (x, y, angle, distance) ->
    if angle is Math.PI then x: x - distance, y: y
    else if angle is Math.PI / 2 then x: x, y: y + distance
    else if angle is Math.PI * 1.5 then x: x, y: y - distance
    else if angle is 0 then x: x + distance, y: y
    else x: Math.cos(angle) * distance + x, y: Math.sin(angle) * distance + y