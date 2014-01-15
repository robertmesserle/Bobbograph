class Point

  x:          null # x coordinate
  y:          null # y coordinate
  prev:       null # previous point in the graph
  next:       null # next point in the graph

  constructor: (@x, @y, @prev, @next) ->

  getAngle: ->
    p1 = @prev or @
    p2 = @next or @
    Trig.getAngleFromPoints p1, p2

  getNextAngle: ->
    Trig.getAngleFromPoints @, @next

  getPreviousAngle: ->
    Trig.getAngleFromPoints @prev, @