Stats  = require( '../src/stats.coffee' )
Point  = require( '../src/point.coffee' )
expect = require( 'expect.js' )

describe( 'Stats', ->
  it( 'should calculate stats based on data', ->
    data = [ new Point( 1, 2 ), new Point( 2, 3 ), new Point( 3, 4 ) ]
    stats = new Stats( data )
    
    expect( stats.xmax ).to.be( 3 )
    expect( stats.xmin ).to.be( 1 )
    expect( stats.ymax ).to.be( 4 )
    expect( stats.ymin ).to.be( 2 )

    expect( stats.dx ).to.be( 2 )
    expect( stats.dy ).to.be( 2 )
  )
)
