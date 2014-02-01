Trig = require '../src/trig.coffee'
expect = require 'expect.js'

describe 'Trig', ->
  describe 'rad()', ->
    pi = Math.PI
    it 'should convert deg to rad', ->
      expect( Trig.rad 180 ).to.be pi
      expect( Trig.rad 90 ).to.be pi / 2
      expect( Trig.rad 45 ).to.be pi / 4
  describe 'getBaseAngleFromPoints()', ->
    it 'should work on 90 degree angles', ->
      expect( Trig.getBaseAngleFromPoints 1, 0 ).to.be Trig.rad 0
      expect( Trig.getBaseAngleFromPoints 0, 1 ).to.be Trig.rad 90
      expect( Trig.getBaseAngleFromPoints -1, 0 ).to.be Trig.rad 0
      expect( Trig.getBaseAngleFromPoints 0, -1 ).to.be Trig.rad 90
    it 'should work on 45 degfree angles', ->
      expect( Trig.getBaseAngleFromPoints 1, 1 ).to.be Trig.rad 45
      expect( Trig.getBaseAngleFromPoints -1, 1 ).to.be Trig.rad 45
      expect( Trig.getBaseAngleFromPoints -1, -1 ).to.be Trig.rad 45
      expect( Trig.getBaseAngleFromPoints 1, -1 ).to.be Trig.rad 45
    it 'should work on other angles', ->
      expect( Trig.getBaseAngleFromPoints 1, 2 ).to.be.near Trig.rad 63.5
      expect( Trig.getBaseAngleFromPoints -1, 2 ).to.be.near Trig.rad 63.5
      expect( Trig.getBaseAngleFromPoints -1, -2 ).to.be.near Trig.rad 63.5
      expect( Trig.getBaseAngleFromPoints 1, -2 ).to.be.near Trig.rad 63.5
