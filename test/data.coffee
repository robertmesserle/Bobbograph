Data   = require( '../src/data.coffee' )
Point  = require( '../src/point.coffee' )
expect = require( 'expect.js' )

describe( 'Data', ->
  describe( '#formatData()', ->
    it( 'should support plain numbers', ->
      data   = [ 1, 2, 3, 4, 5 ]
      points = Data::formatData( data )

      expect( points[ 0 ] ).to.eql( new Point( 0, 1 ) )
      expect( points[ 1 ] ).to.eql( new Point( 1, 2 ) )
      expect( points[ 2 ] ).to.eql( new Point( 2, 3 ) )
      expect( points[ 3 ] ).to.eql( new Point( 3, 4 ) )
      expect( points[ 4 ] ).to.eql( new Point( 4, 5 ) )
    )
    it( 'should support arrays', ->
      data   = [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ]
      points = Data::formatData( data )

      expect( points[ 0 ] ).to.eql( new Point( 0, 1 ) )
      expect( points[ 1 ] ).to.eql( new Point( 1, 2 ) )
      expect( points[ 2 ] ).to.eql( new Point( 2, 3 ) )
      expect( points[ 3 ] ).to.eql( new Point( 3, 4 ) )
      expect( points[ 4 ] ).to.eql( new Point( 4, 5 ) )
    )
    it( 'should support arrays', ->
      data   = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 } ]
      points = Data::formatData( data )

      expect( points[ 0 ] ).to.eql( new Point( 0, 1 ) )
      expect( points[ 1 ] ).to.eql( new Point( 1, 2 ) )
      expect( points[ 2 ] ).to.eql( new Point( 2, 3 ) )
      expect( points[ 3 ] ).to.eql( new Point( 3, 4 ) )
      expect( points[ 4 ] ).to.eql( new Point( 4, 5 ) )
    )
  )
  describe( '#getPoints()', ->
    it( 'should scale data to graph dimensions', ->
      options = { usableWidth: 600, usableHeight: 300, data: {} }
      do ->
        data = new Data( [ 1, 2, 3 ], options )
        points = data.getPoints()

        expect( points[ 0 ] ).to.eql( new Point(   0,   0 ) )
        expect( points[ 1 ] ).to.eql( new Point( 300, 150 ) )
        expect( points[ 2 ] ).to.eql( new Point( 600, 300 ) )
      do ->
        data = new Data( [ 1, 3, 2 ], options )
        points = data.getPoints()

        expect( points[ 0 ] ).to.eql( new Point(   0,   0 ) )
        expect( points[ 1 ] ).to.eql( new Point( 300, 300 ) )
        expect( points[ 2 ] ).to.eql( new Point( 600, 150 ) )
    )
    it( 'should remove non-vertex points when vertex-mode is enabled', ->
      options = { usableWidth: 600, usableHeight: 300, data: { vertex: true } }
      data = new Data( [ 1, 2, 3, 2, 1 ], options )
      points = data.getPoints()
      
      expect( points ).to.be.an( 'array' )
      expect( points.length ).to.be( 3 )
    )
  )
  describe( '#getPixels()', ->
    options = { usableWidth: 600, usableHeight: 300, data: {} }
    data    = new Data( [ 1, 2, 3 ], options )
    points  = data.getPoints()

    describe( 'curve = false', ->
      pixels = Data::getPixels( points, options.width, false )

      it( 'should have correct values for original points', ->
        expect( pixels[   0 ] ).to.eql( new Point(   0,   0 ) )
        expect( pixels[ 300 ] ).to.eql( new Point( 300, 150 ) )
        expect( pixels[ 600 ] ).to.eql( new Point( 600, 300 ) )
      )
      it( 'should have appropriate values for pixels between points', ->
        expect( pixels[ 150 ] ).to.eql( new Point( 150,  75 ) )
        expect( pixels[ 450 ] ).to.eql( new Point( 450, 225 ) )
      )
    )
    describe( 'curve = true', ->
      pixels = Data::getPixels( points, options.width, true )

      it( 'should have correct values for original points', ->
        expect( pixels[   0 ] ).to.eql( new Point(   0,   0 ) )
        expect( pixels[ 300 ] ).to.eql( new Point( 300, 150 ) )
        expect( pixels[ 600 ] ).to.eql( new Point( 600, 300 ) )
      )
      it( 'should have appropriate values for pixels between points', ->
        expect( pixels[ 150 ] ).to.eql( new Point( 150,  75 ) )
        expect( pixels[ 450 ] ).to.eql( new Point( 450, 225 ) )
      )
    )
  )
  describe( '#shrinkData()', ->
    it( 'should support easily divisible sets', ->
      data    = Data::formatData( [ 1, 2, 3, 4, 5, 6 ] )
      max     = 3
      newData = Data::shrinkData( data, max )

      expect( newData.length ).to.be( 3 )
      expect( newData[ 0 ].x ).to.be( 0.5 )
      expect( newData[ 0 ].y ).to.be( 1.5 )
      expect( newData[ 1 ].x ).to.be( 2.5 )
      expect( newData[ 1 ].y ).to.be( 3.5 )
      expect( newData[ 2 ].x ).to.be( 4.5 )
      expect( newData[ 2 ].y ).to.be( 5.5 )
    )
    it( 'should support non-divisible sets', ->
      data    = Data::formatData( [ 1, 2, 3, 4, 5, 6, 7 ] )
      max     = 3
      newData = Data::shrinkData( data, max )

      expect( newData.length ).to.be( 3 )
      expect( newData[ 0 ].x ).to.be( 1 )
      expect( newData[ 0 ].y ).to.be( 2 )
      expect( newData[ 1 ].x ).to.be( 4 )
      expect( newData[ 1 ].y ).to.be( 5 )
      expect( newData[ 2 ].x ).to.be( 6 )
      expect( newData[ 2 ].y ).to.be( 7 )
    )
  )
)
