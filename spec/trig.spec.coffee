describe 'Trig', ->

  Trig = get 'Trig'

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

  describe 'Trig.getAngleFromPoints()', ->

    it 'should work on 90 degree angles', ->
      expect( Trig.getAngleFromPoints 0, 0,  1,  0 ).toBeCloseTo Trig.rad 0
      expect( Trig.getAngleFromPoints 0, 0,  0,  1 ).toBeCloseTo Trig.rad 90
      expect( Trig.getAngleFromPoints 0, 0, -1,  0 ).toBeCloseTo Trig.rad 180
      expect( Trig.getAngleFromPoints 0, 0,  0, -1 ).toBeCloseTo Trig.rad 270

    it 'should work on 45 degree angles', ->
      expect( Trig.getAngleFromPoints 0, 0,  1,  1 ).toBeCloseTo Trig.rad 45
      expect( Trig.getAngleFromPoints 0, 0, -1,  1 ).toBeCloseTo Trig.rad 180 - 45
      expect( Trig.getAngleFromPoints 0, 0, -1, -1 ).toBeCloseTo Trig.rad 180 + 45
      expect( Trig.getAngleFromPoints 0, 0,  1, -1 ).toBeCloseTo Trig.rad 360 - 45

    it 'should work with other angles', ->
      expect( Trig.getAngleFromPoints 0, 0,  1,  2 ).toBeCloseTo Trig.rad 63.5
      expect( Trig.getAngleFromPoints 0, 0, -1,  2 ).toBeCloseTo Trig.rad 180 - 63.5
      expect( Trig.getAngleFromPoints 0, 0, -1, -2 ).toBeCloseTo Trig.rad 180 + 63.5
      expect( Trig.getAngleFromPoints 0, 0,  1, -2 ).toBeCloseTo Trig.rad 360 - 63.5

  describe 'Trig.getDistanceBetweenPoints()', ->

    it 'should work with 90-degree angles', ->
      expect( Trig.getDistanceBetweenPoints 1, 1, 1, 3 ).toBe 2
      expect( Trig.getDistanceBetweenPoints 1, 1, 3, 1 ).toBe 2

    it 'should work with other angles', ->
      expect( Trig.getDistanceBetweenPoints 1, 1, 2, 2 ).toBe Math.sqrt 2
      expect( Trig.getDistanceBetweenPoints 1, 1, 3, 2 ).toBe Math.sqrt 5

  describe 'Trig.getPointFromAngle()', ->

    it 'should work with 90-degree angles', ->
      expect( Trig.getPointFromAngle 0, 0, 0, 5 ).toEqual x: 5, y: 0
      expect( Trig.getPointFromAngle 0, 0, Trig.rad( 90 ), 5 ).toEqual x: 0, y: 5
      expect( Trig.getPointFromAngle 0, 0, Trig.rad( 180 ), 5 ).toEqual x: -5, y: 0
      expect( Trig.getPointFromAngle 0, 0, Trig.rad( 270 ), 5 ).toEqual x: 0, y: -5

    it 'should work with 45-degree angles', ->
      do ->
        point = Trig.getPointFromAngle 0, 0, Trig.rad( 45 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo 1
        expect( point.y ).toBeCloseTo 1

      do ->
        point = Trig.getPointFromAngle 0, 0, Trig.rad( 135 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo -1
        expect( point.y ).toBeCloseTo 1

      do ->
        point = Trig.getPointFromAngle 0, 0, Trig.rad( 225 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo -1
        expect( point.y ).toBeCloseTo -1

      do ->
        point = Trig.getPointFromAngle 0, 0, Trig.rad( 315 ), Math.sqrt( 2 )
        expect( point.x ).toBeCloseTo 1
        expect( point.y ).toBeCloseTo -1

    it 'should work with other angles', ->
      for point in [ { x: 5, y: 3 }, { x: -5, y: 3 }, { x: -5, y: -3 }, { x: 5, y: -3 } ]
        do ( point ) ->
          angle = Trig.getAngleFromPoints 0, 0, point.x, point.y
          distance = Trig.getDistanceBetweenPoints 0, 0, point.x, point.y
          newPoint = Trig.getPointFromAngle 0, 0, angle, distance
          expect( newPoint.x ).toBeCloseTo point.x
          expect( newPoint.y ).toBeCloseTo point.y