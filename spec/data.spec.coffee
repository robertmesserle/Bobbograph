describe 'Data', ->

  Data = get 'Data'

  describe 'Data#formatData()', ->

    it 'should support plain numbers', ->
      data = [1, 2, 3, 4, 5]
      points = Data.prototype.formatData(data)
      expect( points[0] ).toEqual x: 0, y: 1
      expect( points[1] ).toEqual x: 1, y: 2
      expect( points[2] ).toEqual x: 2, y: 3
      expect( points[3] ).toEqual x: 3, y: 4
      expect( points[4] ).toEqual x: 4, y: 5

    it 'should support arrays', ->
      data = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
      points = Data.prototype.formatData(data)
      expect( points[0] ).toEqual x: 0, y: 1
      expect( points[1] ).toEqual x: 1, y: 2
      expect( points[2] ).toEqual x: 2, y: 3
      expect( points[3] ).toEqual x: 3, y: 4
      expect( points[4] ).toEqual x: 4, y: 5

    it 'should support objects', ->
      data = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 } ]
      points = Data.prototype.formatData(data)
      expect( points[0] ).toEqual x: 0, y: 1
      expect( points[1] ).toEqual x: 1, y: 2
      expect( points[2] ).toEqual x: 2, y: 3
      expect( points[3] ).toEqual x: 3, y: 4
      expect( points[4] ).toEqual x: 4, y: 5

  describe 'Data#getStats()', ->
    data = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 } ]
    stats = Data.prototype.getStats(data)

    it 'should have the proper x max', ->
      expect( stats.xmax ).toBe 4
    it 'should have the proper y max', ->
      expect( stats.ymax ).toBe 5

  describe 'Data#getPoints()', ->

    options = { width: 600, height: 300 }

    it 'should scale data to the graph dimensions', ->
      do ->
        raw     = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 } ]
        stats   = xmin: 0, xmax: 2, dx: 2, ymin: 1, ymax: 3, dy: 2
        points  = Data.prototype.getPoints(raw, options, stats)

        expect( points[0] ).toEqual x:   0, y:   0
        expect( points[1] ).toEqual x: 300, y: 150
        expect( points[2] ).toEqual x: 600, y: 300

      do ->
        raw     = [ { x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 } ]
        stats   = xmin: 0, xmax: 2, dx: 2, ymin: 1, ymax: 3, dy: 2
        points  = Data.prototype.getPoints(raw, options, stats)
        
        expect( points[0] ).toEqual x:   0, y: 0
        expect( points[1] ).toEqual x: 300, y: 300
        expect( points[2] ).toEqual x: 600, y: 150

  describe 'Data#getPixels()', ->
    options = { width: 600, height: 300 }
    raw     = [ { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 } ]
    stats   = xmin: 0, xmax: 2, dx: 2, ymin: 1, ymax: 3, dy: 2
    points  = Data.prototype.getPoints raw, options, stats

    describe 'curve = false', ->
      pixels  = Data.prototype.getPixels points, options.width, false
      
      it 'should have correct values for original points', ->
        expect( pixels[0] ).toBe 0
        expect( pixels[300] ).toBe 150
        expect( pixels[600] ).toBe 300

      it 'should have appropriate values for pixels between points', ->
        expect( pixels[150] ).toBe 75
        expect( pixels[450] ).toBe 225

    describe 'curve = true', ->
      pixels  = Data.prototype.getPixels points, options.width, true
      
      it 'should have correct values for original points', ->
        expect( pixels[0] ).toBe 0
        expect( pixels[300] ).toBe 150
        expect( pixels[600] ).toBe 300

      it 'should have appropriate values for pixels between points', ->
        expect( pixels[150] ).toBe 75
        expect( pixels[450] ).toBe 225