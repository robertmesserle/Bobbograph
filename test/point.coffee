expect = require( 'expect.js' )
Point  = require( '../src/point.coffee' )
Trig   = require( '../src/trig.coffee' )

describe( 'Point', ->
  describe( '#constructor()', ->
    it( 'should exist', ->
      expect( Point ).to.be.a( 'function' )
    )
    it( 'should set x and y', ->
      point = new Point( 5, 10 )
      expect( point.x ).to.be( 5 )
      expect( point.y ).to.be( 10 )
    )
  )
  describe( '#getAngle()', ->
    point = new Point( 0, 0 )
    it( 'should work for 45 degree angles', ->
      angle = point.getAngle( { x: 1, y: 1 } )
      expect( angle ).to.be( Math.PI / 4 )
    )
  )
  describe( '#getPointFromAngle()', ->
    origin = new Point( 0, 0 )
    it( 'should work with 90-degree angles', ->
      expect( origin.getPointFromAngle( Trig.rad(   0 ), 5 ) ).to.eql( new Point(  5,  0 ) )
      expect( origin.getPointFromAngle( Trig.rad(  90 ), 5 ) ).to.eql( new Point(  0,  5 ) )
      expect( origin.getPointFromAngle( Trig.rad( 180 ), 5 ) ).to.eql( new Point( -5,  0 ) )
      expect( origin.getPointFromAngle( Trig.rad( 270 ), 5 ) ).to.eql( new Point(  0, -5 ) )
    )
    it( 'should work with 45-degree angles', ->
      do ->
        point = origin.getPointFromAngle( Trig.rad( 45 ), Math.sqrt( 2 ) )
        expect( point.x ).to.be.about( 1 )
        expect( point.y ).to.be.about( 1 )
      do ->
        point = origin.getPointFromAngle( Trig.rad( 135 ), Math.sqrt( 2 ) )
        expect( point.x ).to.be.about( -1 )
        expect( point.y ).to.be.about( 1 )
      do ->
        point = origin.getPointFromAngle( Trig.rad( 225 ), Math.sqrt( 2 ) )
        expect( point.x ).to.be.about( -1 )
        expect( point.y ).to.be.about( -1 )
      do ->
        point = origin.getPointFromAngle( Trig.rad( 315 ), Math.sqrt( 2 ) )
        expect( point.x ).to.be.about( 1 )
        expect( point.y ).to.be.about( -1 )
    )
    it( 'should work with other angles', ->
      for point in [ new Point( 5, 3 ), new Point( -5, 3 ), new Point( -5, -3 ), new Point( 5, -3 ) ]
        do ( point ) ->
          angle     = Trig.getAngleFromPoints( origin, point )
          distance  = Trig.getDistanceBetweenPoints( origin, point )
          newPoint  = origin.getPointFromAngle( angle, distance )

          expect( newPoint.x ).to.be.about( point.x )
          expect( newPoint.y ).to.be.about( point.y )
    )
  )
)
