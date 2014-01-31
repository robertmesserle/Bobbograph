module.exports = class LineOptions

  width  : 1
  color  : '#000'
  smooth : false

  constructor: ( line = {} ) ->
    for key, value of line then @[ key ] = value
