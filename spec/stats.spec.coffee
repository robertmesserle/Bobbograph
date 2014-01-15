describe 'Stats', ->

  Stats = get 'Stats'
  Point = get 'Point'

  it 'should calculate stats based on data', ->
    data = [ new Point( 1, 2 ), new Point( 2, 3 ), new Point( 3, 4 ) ]
    stats = new Stats data

    expect( stats.xmax ).toBe 3
    expect( stats.xmin ).toBe 1
    expect( stats.ymax ).toBe 4
    expect( stats.ymin ).toBe 2

    expect( stats.dx ).toBe 2
    expect( stats.dy ).toBe 2