PaddingOptions = require '../../src/options/padding.coffee'
expect         = require 'expect.js'

describe 'PaddingOptions', ->
  describe '#constructor()', ->
    it 'should work with no arguments', ->
      padding = new PaddingOptions
      expect( padding ).to.be.ok()
      expect( padding.size ).to.be 0
      expect( padding.x ).to.be 0
      expect( padding.y ).to.be 0
      expect( padding.top ).to.be 0
      expect( padding.right ).to.be 0
      expect( padding.bottom ).to.be 0
      expect( padding.left ).to.be 0
    it 'should override properly', ->
      padding = new PaddingOptions x: 1
      expect( padding ).to.be.ok()
      expect( padding.size ).to.be 0
      expect( padding.x ).to.be 1
      expect( padding.y ).to.be 0
      expect( padding.left ).to.be 1
      expect( padding.right ).to.be 1
      expect( padding.top ).to.be 0
      expect( padding.bottom ).to.be 0
