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
  describe( '#getType()', ->
    it( 'should return the correct type for a gradient', ->
      type = FillOptions.prototype.getType( [] )
      expect( type ).to.be( 'gradient' )
    )
    it( 'should return the correct type for a color', ->
      type = FillOptions.prototype.getType( '#f00' )
      expect( type ).to.be( 'color' )
    )
  )
  describe( '#parseGradient()', ->
    gradient = FillOptions.prototype.parseGradient( [ '#f00', '#00f' ] )
    expect( gradient ).to.be.an( 'array' )
    expect( gradient ).not.to.be.empty()
    expect( gradient[0] ).to.eql( { color: '#f00', position: 0 } )
    expect( gradient[1] ).to.eql( { color: '#00f', position: 1 } )
  )
)
