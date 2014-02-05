BevelOptions = require( '../../src/options/bevel.coffee' )
expect       = require( 'expect.js' )

describe( 'BevelOptions', ->
  describe( '#constructor()', ->
    it( 'should work without arguments', ->
      bevel = new BevelOptions()
      expect( bevel ).to.be.ok()
      expect( bevel.shine ).to.be( 0.35 )
      expect( bevel.shadow ).to.be( 0.15 )
      expect( bevel.smooth ).to.be( false )
      expect( bevel.opacity ).to.be( 1 )
    )
    it( 'should work with custom values', ->
      bevel = new BevelOptions( { smooth: true } )
      expect( bevel ).to.be.ok()
      expect( bevel.smooth ).to.be( true )
    )
  )
  describe( '#clone()', ->
    bevel = new BevelOptions()
    clone = bevel.clone()

    it( 'should support cloning', ->
      clone = bevel.clone()
      expect( clone ).to.be.ok()
      expect( clone.options ).to.be.eql( bevel.options )
      
      clone.smooth = true
      expect( clone.smooth ).to.be( true )
      expect( bevel.smooth ).to.be( false )
    )
  )
)
