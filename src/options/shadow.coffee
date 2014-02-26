FillOptions = require( './fill.coffee' )

class ShadowOptions

  x: 0
  y: 0
  fill: null

  constructor: ( props ) ->
    for key, value of props then @[ key ] = value

module.exports = ShadowOptions
