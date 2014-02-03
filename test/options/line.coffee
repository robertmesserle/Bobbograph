LineOptions = require '../../src/options/line.coffee'
expect      = require 'expect.js'

describe 'LineOptions', ->
  describe '#constructor()', ->
    it 'should work without any arguments', ->
      line = new LineOptions
      expect( line ).to.be.ok()
      expect( line.width ).to.be 1
      expect( line.smooth ).to.be false
    it 'should work with properties', ->
      line = new LineOptions width: 2, smooth: true
      expect( line ).to.be.ok()
      expect( line.width ).to.be 2
      expect( line.smooth ).to.be true
