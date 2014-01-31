Data   = require '../src/data.coffee'
Point  = require '../src/point.coffee'
expect = require 'expect.js'

describe 'Data', ->
  describe '#constructor()', ->
  describe '#formatData()', ->
    it 'should support plain numbers', ->
      data   = [ 1, 2, 3, 4, 5 ]
      points = Data.prototype.formatData data

      expect( points[ 0 ] ).to.eql new Point 0, 1
      expect( points[ 1 ] ).to.eql new Point 1, 2
      expect( points[ 2 ] ).to.eql new Point 2, 3
      expect( points[ 3 ] ).to.eql new Point 3, 4
      expect( points[ 4 ] ).to.eql new Point 4, 5
    it 'should support arrays', ->
      data   = [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ]
      points = Data.prototype.formatData data

      expect( points[ 0 ] ).to.eql new Point 0, 1
      expect( points[ 1 ] ).to.eql new Point 1, 2
      expect( points[ 2 ] ).to.eql new Point 2, 3
      expect( points[ 3 ] ).to.eql new Point 3, 4
      expect( points[ 4 ] ).to.eql new Point 4, 5
    it 'should support arrays', ->
      data   = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 } ]
      points = Data.prototype.formatData data

      expect( points[ 0 ] ).to.eql new Point 0, 1
      expect( points[ 1 ] ).to.eql new Point 1, 2
      expect( points[ 2 ] ).to.eql new Point 2, 3
      expect( points[ 3 ] ).to.eql new Point 3, 4
      expect( points[ 4 ] ).to.eql new Point 4, 5
  describe '#getPoints()', ->
    options = usableWidth: 600, usableHeight: 300

    it 'should scale data to graph dimensions', ->
      do ->
        raw = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 } ]
        stats = xmin: 0, xmax: 2, dx: 2, ymin: 1, ymax: 3, dy: 2
        points = Data.prototype.getPoints raw, options, stats

        expect( points[ 0 ] ).to.eql new Point 0, 0
        expect( points[ 1 ] ).to.eql new Point 300, 150
        expect( points[ 2 ] ).to.eql new Point 600, 300
      do ->
        raw = [ { x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 } ]
        stats = xmin: 0, xmax: 2, dx: 2, ymin: 1, ymax: 3, dy: 2
        points = Data.prototype.getPoints raw, options, stats

        expect( points[ 0 ] ).to.eql new Point 0, 0
        expect( points[ 1 ] ).to.eql new Point 300, 300
        expect( points[ 2 ] ).to.eql new Point 600, 150
  describe '#getPixels()', ->
    options = usableWidth: 600, usableHeight: 300
    raw     = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 } ]
    stats   = xmin: 0, xmax: 2, dx: 2, ymin: 1, ymax: 3, dy: 2
    points  = Data.prototype.getPoints raw, options, stats

    describe 'curve = false', ->
      pixels = Data.prototype.getPixels points, options.width, false

      it 'should have correct values for original points', ->
        expect( pixels[ 0 ] ).to.eql new Point 0, 0
        expect( pixels[ 300 ] ).to.eql new Point 300, 150
        expect( pixels[ 600 ] ).to.eql new Point 600, 300
      it 'should have appropriate values for pixels between points', ->
        expect( pixels[ 150 ] ).to.eql new Point 150, 75
        expect( pixels[ 450 ] ).to.eql new Point 450, 225
    describe 'curve = true', ->
      pixels = Data.prototype.getPixels points, options.width, true

      it 'should have correct values for original points', ->
        expect( pixels[ 0 ] ).to.eql new Point 0, 0
        expect( pixels[ 300 ] ).to.eql new Point 300, 150
        expect( pixels[ 600 ] ).to.eql new Point 600, 300
      it 'should have appropriate values for pixels between points', ->
        expect( pixels[ 150 ] ).to.eql new Point 150, 75
        expect( pixels[ 450 ] ).to.eql new Point 450, 225
