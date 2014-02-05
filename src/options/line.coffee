FillOptions = require( './fill.coffee' )

class LineOptions

  width:  1
  fill:   '#000'
  smooth: false

  constructor: ( line = {}, @options ) ->
    for key, value of line then @[ key ] = value
    @fill = new FillOptions( @fill, @options )

module.exports = LineOptions
