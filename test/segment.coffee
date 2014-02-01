Segment = require '../src/segment.coffee'
Point   = require '../src/point.coffee'
expect  = require 'expect.js'

describe 'Segment', ->
  describe '#reduceAngle()', ->
    it 'should reduce angles so that they are within 360 degrees', ->
      expect( Segment.prototype.reduceAngle( Math.PI * 3 ) ).to.be Math.PI
      expect( Segment.prototype.reduceAngle( Math.PI * 2.25 ) ).to.be Math.PI / 4
  describe '#intersects()', ->
    it 'should find the point at which two lines intersect', ->
      s1 = new Segment( new Point( 0, 0 ), new Point( 2, 2 ), 5 )
      s2 = new Segment( new Point( 2, 0 ), new Point( 0, 2 ), 5 )
      point = s1.intersects( s2 )
      expect( point ).to.eql new Point( 1, 1 )
