describe 'Trig', ->

  Trig = get 'Trig'
  Point = get 'Point'

  describe 'Trig.rad', ->

    pi = Math.PI

    it 'should convert deg to rad', ->
      expect( Trig.rad 180 ).toBe pi
      expect( Trig.rad 90 ).toBe pi / 2
      expect( Trig.rad 45 ).toBe pi / 4

  describe 'Trig.getBaseAngleFromPoints()', ->

    it 'should work on 90 degree angles', ->
      expect( Trig.getBaseAngleFromPoints  1,  0 ).toBeCloseTo Trig.rad 0
      expect( Trig.getBaseAngleFromPoints  0,  1 ).toBeCloseTo Trig.rad 90
      expect( Trig.getBaseAngleFromPoints -1,  0 ).toBeCloseTo Trig.rad 0
      expect( Trig.getBaseAngleFromPoints  0, -1 ).toBeCloseTo Trig.rad 90

    it 'should work on 45 degree angles', ->
      expect( Trig.getBaseAngleFromPoints  1,  1 ).toBeCloseTo Trig.rad 45
      expect( Trig.getBaseAngleFromPoints -1,  1 ).toBeCloseTo Trig.rad 45
      expect( Trig.getBaseAngleFromPoints -1, -1 ).toBeCloseTo Trig.rad 45
      expect( Trig.getBaseAngleFromPoints  1, -1 ).toBeCloseTo Trig.rad 45

    it 'should work with other angles', ->
      expect( Trig.getBaseAngleFromPoints  1,  2 ).toBeCloseTo Trig.rad 63.5
      expect( Trig.getBaseAngleFromPoints -1,  2 ).toBeCloseTo Trig.rad 63.5
      expect( Trig.getBaseAngleFromPoints -1, -2 ).toBeCloseTo Trig.rad 63.5
      expect( Trig.getBaseAngleFromPoints  1, -2 ).toBeCloseTo Trig.rad 63.5

  describe 'Trig.getQuadrant()', ->

    it 'should provide correct quadrant for any angle', ->
      expect( Trig.getQuadrant  1,  1 ).toBe 1
      expect( Trig.getQuadrant -1,  1 ).toBe 2
      expect( Trig.getQuadrant -1, -1 ).toBe 3
      expect( Trig.getQuadrant  1, -1 ).toBe 4

  describe 'Trig.getAngleFromPoints()', ->

    it 'should work on 90 degree angles', ->
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point(  1,  0 ) ).toBeCloseTo Trig.rad 0
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point(  0,  1 ) ).toBeCloseTo Trig.rad 90
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point( -1,  0 ) ).toBeCloseTo Trig.rad 180
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point(  0, -1 ) ).toBeCloseTo Trig.rad 270

    it 'should work on 45 degree angles', ->
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point(  1,  1 ) ).toBeCloseTo Trig.rad 45
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point( -1,  1 ) ).toBeCloseTo Trig.rad 180 - 45
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point( -1, -1 ) ).toBeCloseTo Trig.rad 180 + 45
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point(  1, -1 ) ).toBeCloseTo Trig.rad 360 - 45

    it 'should work with other angles', ->
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point(  1,  2 ) ).toBeCloseTo Trig.rad 63.5
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point( -1,  2 ) ).toBeCloseTo Trig.rad 180 - 63.5
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point( -1, -2 ) ).toBeCloseTo Trig.rad 180 + 63.5
      expect( Trig.getAngleFromPoints new Point( 0, 0 ), new Point(  1, -2 ) ).toBeCloseTo Trig.rad 360 - 63.5

  describe 'Trig.getDistanceBetweenPoints()', ->

    it 'should work with 90-degree angles', ->
      expect( Trig.getDistanceBetweenPoints new Point( 1, 1 ), new Point( 1, 3 ) ).toBe 2
      expect( Trig.getDistanceBetweenPoints new Point( 1, 1 ), new Point( 3, 1 ) ).toBe 2

    it 'should work with other angles', ->
      expect( Trig.getDistanceBetweenPoints new Point( 1, 1 ), new Point( 2, 2 ) ).toBe Math.sqrt 2
      expect( Trig.getDistanceBetweenPoints new Point( 1, 1 ), new Point( 3, 2 ) ).toBe Math.sqrt 5

  describe 'Trig.getPointFromAngle()', ->

    it 'should work with 90-degree angles', ->
      expect( Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad(   0 ), 5 ).toEqual new Point  5,  0
      expect( Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad(  90 ), 5 ).toEqual new Point  0,  5
      expect( Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad( 180 ), 5 ).toEqual new Point -5,  0
      expect( Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad( 270 ), 5 ).toEqual new Point  0, -5

    it 'should work with 45-degree angles', ->
      do ->
        point = Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad( 45 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo 1
        expect( point.y ).toBeCloseTo 1

      do ->
        point = Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad( 135 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo -1
        expect( point.y ).toBeCloseTo 1

      do ->
        point = Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad( 225 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo -1
        expect( point.y ).toBeCloseTo -1

      do ->
        point = Trig.getPointFromAngle new Point( 0, 0 ), Trig.rad( 315 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo 1
        expect( point.y ).toBeCloseTo -1

    it 'should work with other angles', ->
      for point in [ new Point( 5, 3 ), new Point( -5, 3 ), new Point( -5, -3 ), new Point( 5, -3 ) ]
        do ( point ) ->
          angle     = Trig.getAngleFromPoints new Point( 0, 0 ), point
          distance  = Trig.getDistanceBetweenPoints new Point( 0, 0 ), point
          newPoint  = Trig.getPointFromAngle new Point( 0, 0 ), angle, distance

          expect( newPoint.x ).toBeCloseTo point.x
          expect( newPoint.y ).toBeCloseTo point.y