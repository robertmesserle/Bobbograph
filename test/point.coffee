expect = require 'expect.js'
Point  = require '../src/point.coffee'

describe 'Point', ->
  describe '#constructor()', ->
    it 'should exist', ->
      expect( Point ).to.be.a 'function'
    it 'should set x and y', ->
      point = new Point 5, 10
      expect( point.x ).to.be 5
      expect( point.y ).to.be 10
  describe '#getAngle()', ->
    point = new Point 0, 0
    it 'should work for 45 degree angles', ->
      angle = point.getAngle x: 1, y: 1
      console.log( angle )
      expect( angle ).to.be Math.PI / 2
