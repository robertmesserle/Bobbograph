XAxis  = require( '../src/x-axis.coffee' )
expect = require( 'expect.js' )

describe( 'XAxis', ->
  describe( 'getFirstLine()', ->
    it( 'should work with decimals', ->
      expect( XAxis::getFirstLine( 0.75, 0.2 ) ).to.be.about( 0.8 )
      expect( XAxis::getFirstLine( 0.3 , 0.2 ) ).to.be.about( 0.4 )
      expect( XAxis::getFirstLine( 0.0 , 0.1 ) ).to.be.about( 0 )
      expect( XAxis::getFirstLine( 1.7 , 0.3 ) ).to.be.about( 1.8 )
    )
    it( 'should work with whole numbers', ->
      expect( XAxis::getFirstLine( 10, 3 ) ).to.be( 12 )
      expect( XAxis::getFirstLine(  9, 2 ) ).to.be( 10 )
      expect( XAxis::getFirstLine( 27, 3 ) ).to.be( 27 )
      expect( XAxis::getFirstLine( 19, 9 ) ).to.be( 27 )
    )
    it( 'should work with negative numbers', ->
      expect( XAxis::getFirstLine( -3, 2 ) ).to.be( -2 )
      expect( XAxis::getFirstLine( -10, 3 ) ).to.be( -9 )
      expect( XAxis::getFirstLine( -11, 3 ) ).to.be( -9 )
      expect( XAxis::getFirstLine( -12, 3 ) ).to.be( -12 )
    )
  )
)
