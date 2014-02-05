Trig   = require( '../src/trig.coffee' )
Point  = require( '../src/point.coffee' )
expect = require( 'expect.js' )

describe( 'Trig', ->
  describe( 'rad()', ->
    pi = Math.PI
    it( 'should convert deg to rad', ->
      expect( Trig.rad( 180 ) ).to.be( pi )
      expect( Trig.rad(  90 ) ).to.be( pi / 2 )
      expect( Trig.rad(  45 ) ).to.be( pi / 4 )
    )
  )
  describe( 'getBaseAngleFromPoints()', ->
    it( 'should work on 90 degree angles', ->
      expect( Trig.getBaseAngleFromPoints(  1,  0 ) ).to.be( Trig.rad(  0 ) )
      expect( Trig.getBaseAngleFromPoints(  0,  1 ) ).to.be( Trig.rad( 90 ) )
      expect( Trig.getBaseAngleFromPoints( -1,  0 ) ).to.be( Trig.rad(  0 ) )
      expect( Trig.getBaseAngleFromPoints(  0, -1 ) ).to.be( Trig.rad( 90 ) )
    )
    it( 'should work on 45 degfree angles', ->
      expect( Trig.getBaseAngleFromPoints(  1,  1 ) ).to.be( Trig.rad( 45 ) )
      expect( Trig.getBaseAngleFromPoints( -1,  1 ) ).to.be( Trig.rad( 45 ) )
      expect( Trig.getBaseAngleFromPoints( -1, -1 ) ).to.be( Trig.rad( 45 ) )
      expect( Trig.getBaseAngleFromPoints(  1, -1 ) ).to.be( Trig.rad( 45 ) )
    )
    it( 'should work on other angles', ->
      expect( Trig.getBaseAngleFromPoints(  1,  2 ) ).to.be.near( Trig.rad( 63.5 ) )
      expect( Trig.getBaseAngleFromPoints( -1,  2 ) ).to.be.near( Trig.rad( 63.5 ) )
      expect( Trig.getBaseAngleFromPoints( -1, -2 ) ).to.be.near( Trig.rad( 63.5 ) )
      expect( Trig.getBaseAngleFromPoints(  1, -2 ) ).to.be.near( Trig.rad( 63.5 ) )
    )
  )
  describe( 'getQuadrant()', ->
    it( 'should provide the correct quadrant for any angle', ->
      expect( Trig.getQuadrant(  1,  1 ) ).to.be( 1 )
      expect( Trig.getQuadrant( -1,  1 ) ).to.be( 2 )
      expect( Trig.getQuadrant( -1, -1 ) ).to.be( 3 )
      expect( Trig.getQuadrant(  1, -1 ) ).to.be( 4 )
    )
  )
  describe( 'getAngleFromPoint()', ->
    it( 'should work on 90 degree angles', ->
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point(  1,  0 ) ) ).to.be.about( Trig.rad(   0 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point(  0,  1 ) ) ).to.be.about( Trig.rad(  90 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point( -1,  0 ) ) ).to.be.about( Trig.rad( 180 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point(  0, -1 ) ) ).to.be.about( Trig.rad( 270 ) )
    )
    it( 'should work on 45 degree angles', ->
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point(  1,  1 ) ) ).to.be.about( Trig.rad(       45 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point( -1,  1 ) ) ).to.be.about( Trig.rad( 180 - 45 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point( -1, -1 ) ) ).to.be.about( Trig.rad( 180 + 45 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point(  1, -1 ) ) ).to.be.about( Trig.rad( 360 - 45 ) )
    )
    it( 'should work with other angles', ->
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point(  1,  2 ) ) ).to.be.about( Trig.rad(       63.5 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point( -1,  2 ) ) ).to.be.about( Trig.rad( 180 - 63.5 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point( -1, -2 ) ) ).to.be.about( Trig.rad( 180 + 63.5 ) )
      expect( Trig.getAngleFromPoints( new Point( 0, 0 ), new Point(  1, -2 ) ) ).to.be.about( Trig.rad( 360 - 63.5 ) )
    )
  )
  describe( 'getDistanceBetweenPoints()', ->
    it( 'should work with 90-degree angles', ->
      expect( Trig.getDistanceBetweenPoints( new Point( 1, 1 ), new Point( 1, 3 ) ) ).to.be( 2 )
      expect( Trig.getDistanceBetweenPoints( new Point( 1, 1 ), new Point( 3, 1 ) ) ).to.be( 2 )
    )
    it( 'should work with other angles', ->
      expect( Trig.getDistanceBetweenPoints( new Point( 1, 1 ), new Point( 2, 2 ) ) ).to.be( Math.sqrt( 2 ) )
      expect( Trig.getDistanceBetweenPoints( new Point( 1, 1 ), new Point( 3, 2 ) ) ).to.be( Math.sqrt( 5 ) )
    )
    it( 'should work for the same point', ->
      expect( Trig.getDistanceBetweenPoints( new Point( 0, 0 ), new Point( 0, 0 ) ) ).to.be( 0 )
      expect( Trig.getDistanceBetweenPoints( new Point( 1, 1 ), new Point( 1, 1 ) ) ).to.be( 0 )
    )
  )
)
