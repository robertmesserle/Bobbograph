Canvas  = require './canvas.coffee'
Segment = require './segment.coffee'

module.exports = class LinearRender extends Canvas

  constructor: ( @points, @context, @options ) ->
    @renderSolid @points, @options.line.width, @options.line.color

  getSegments: ( points, offset ) ->
    for index in [ 1 .. points.length - 1 ]
      new Segment points[ index - 1 ], points[ index ], offset

  renderLine: (points, offset) ->
    segments = @getSegments points, offset
    for segment, index in segments
      next = segments[ index + 1 ]
      @line segment.corner1 unless index
      if next
        if segment.angle > next.angle
          @line segment.corner2
          @arc next.p1, offset, segment.topAngle, next.topAngle
        else
          s1 = new Segment segment.corner1, segment.corner2, 0
          s2 = new Segment next.corner1, next.corner2, 0
          @line s1.intersects s2
      else
        @arc segment.p2, offset, segment.topAngle, segment.bottomAngle
    reverse = segments.slice().reverse()
    for segment, index in reverse
      next = reverse[ index + 1 ]
      if next
        if segment.angle > next.angle
          @line segment.corner4
          @arc next.p2, offset, segment.bottomAngle, next.bottomAngle
        else
          s1 = new Segment segment.corner3, segment.corner4, 0
          s2 = new Segment next.corner3, next.corner4, 0
          @line s1.intersects s2
      else
        @arc segment.p1, offset, segment.bottomAngle, segment.topAngle

  renderSolid: ( points, lineWidth, color ) ->
    offset = lineWidth / 2
    @begin()

    @renderLine points, offset, true
    
    @close()
    @fill color
