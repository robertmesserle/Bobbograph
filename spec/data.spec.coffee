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

  describe 'Data#getPoints()', ->

    options = { width: 600, height: 300 }

    do ->
      raw = [ 1, 2, 3 ]
      points = Data.prototype.getPoints(raw, options)
      expect( points[0] ).toEqual x:   0, y:   0
      expect( points[1] ).toEqual x: 300, y: 150
      expect( points[2] ).toEqual x: 600, y: 300

    do ->
      raw = [ 1, 3, 2 ]
      points = Data.prototype.getPoints(raw, options)
      expect( points[0] ).toEqual x:   0, y: 0
      expect( points[1] ).toEqual x: 300, y: 300
      expect( points[2] ).toEqual x: 600, y: 150