class Point

  x:          null # x coordinate
  y:          null # y coordinate
  prev:       null # previous point in the graph
  next:       null # next point in the graph
  angle:      null # angle at the current point (calculated)
  nextAngle:  null # angle of the line connecting the next point
  prevAngle:  null # angle of the line connecting the previous point

  constructor: (@x, @y, @prev, @next) ->
    if @prev
      @prevAngle = @getAngle @prev, @
    if @next
      @nextAngle = @getAngle @, @next
    @angle = if @prev and @next then @getAngle @prev, @next else @prevAngle or @nextAngle

  getAngle: (p1, p2) ->
    Trig.getAngleFromPoints p1, p2