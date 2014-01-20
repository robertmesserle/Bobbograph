class AxisLineOptions

  increment : 0

  constructor: ( axis = {} ) ->
    for key, value in axis then @[ key ] = value
