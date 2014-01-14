describe 'util.js', ->

  Util = get 'Util'

  describe 'Util.getProperty()', ->

    obj = a: b: c: true

    it 'should return existing values', ->
      expect( Util.getProperty obj, 'a' ).toBe obj.a
      expect( Util.getProperty obj, 'a.b' ).toBe obj.a.b
      expect( Util.getProperty obj, 'a.b.c' ).toBe obj.a.b.c

    it 'should return undefined if not found', ->
      expect( Util.getProperty obj, 'x' ).toBeUndefined()
      expect( Util.getProperty obj, 'a.x' ).toBeUndefined()
      expect( Util.getProperty obj, 'a.b.x' ).toBeUndefined()
      expect( Util.getProperty obj, 'a.b.c.x' ).toBeUndefined()
      expect( Util.getProperty obj, 'x.x.x.x' ).toBeUndefined()

    it 'should return custom value if provided', ->
      un = []
      expect( Util.getProperty obj, 'x', un ).toBe un
      expect( Util.getProperty obj, 'a.x', un ).toBe un
      expect( Util.getProperty obj, 'a.b.x', un ).toBe un
      expect( Util.getProperty obj, 'a.b.c.x', un ).toBe un
      expect( Util.getProperty obj, 'x.x.x.x', un ).toBe un

  describe 'Util.minMax()', ->

    it 'should return the number if it is valid', ->
      for i in [ 1..5 ]
        expect( Util.minMax i, 1, 5 ).toBe i

    it 'should return min if the number is too low', ->
      expect( Util.minMax 1, 5, 10 ).toBe 5
      expect( Util.minMax 4, 5, 10 ).toBe 5

    it 'should return max if the number is too high', ->
      expect( Util.minMax 11, 5, 10 ).toBe( 10 )
      expect( Util.minMax 20, 5, 10 ).toBe( 10 )