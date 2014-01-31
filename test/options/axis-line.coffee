AxisLineOptions = require '../../src/options/axis-line.coffee'
expect = require 'expect.js'

describe 'AxisLineOptions', ->
  describe '#constructor()', ->
    it 'should work with no arguments', ->
      line = new AxisLineOptions
      expect( line ).to.be.ok()
      expect( line.increment ).to.be 0
    it 'should work with arguments', ->
      line = new AxisLineOptions increment: 1
      expect( line ).to.be.ok()
      expect( line.increment ).to.be 1
