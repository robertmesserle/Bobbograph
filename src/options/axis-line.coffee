class AxisLineOptions

  increment : 0

  constructor: ( axis = {} ) ->
    for key, value of axis then @[ key ] = value

module.exports = AxisLineOptions
