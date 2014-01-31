Options = require '../src/options.coffee'
expect = require 'expect.js'

describe 'Options', ->
  describe '#constructor()', ->
    it 'should work without arguments', ->
      options = new Options
      expect( options ).to.be.ok()
      expect( options.width ).to.be 600
      expect( options.height ).to.be 300
    it 'should work with arguments', ->
      options = new Options height: 1, width: 2
      expect( options ).to.be.ok()
      expect( options.width ).to.be 2
      expect( options.height ).to.be 1
