FillOptions = require( '../../src/options/fill.coffee' )
expect      = require( 'expect.js' )

describe( 'FillOptions', ->
  describe( '#constructor()', ->
    it( 'should work with a basic color', ->
      fill = new FillOptions( '#f00', {} )
      expect( fill ).to.be.ok()
      expect( fill.get() ).to.be( '#f00' )
    )
  )
  describe( '#parseGradient()', ->
    gradient = FillOptions::parseGradient( [ '#f00', '#00f' ] )
    expect( gradient ).to.be.an( 'array' )
    expect( gradient ).not.to.be.empty()
    expect( gradient[0] ).to.eql( { color: '#f00', position: 0 } )
    expect( gradient[1] ).to.eql( { color: '#00f', position: 1 } )
  )
)
