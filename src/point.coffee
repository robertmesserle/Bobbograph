class Point

  x:          null # x coordinate
  y:          null # y coordinate
  prev:       null # previous point in the graph
  next:       null # next point in the graph
  prevAngle:  null # the angle between the previous point and the current node
  nextAngle:  null # the angle between the current node and the next node
  angle:      null # the angle between the previous node and the next node

  constructor: (@x, @y) ->

  setPrevious: (@prev) ->
    @prevAngle  = Trig.getAngleFromPoints @prev, @
    @angle      = Trig.getAngleFromPoints @prev, @next or @

  setNext: (@next) ->
    @nextAngle  = Trig.getAngleFromPoints @, @next
    @angle      = Trig.getAngleFromPoints @prev or @, @next