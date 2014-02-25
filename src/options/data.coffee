class DataOptions

  vertex:    null
  maxPoints: null
  normalize: null

  constructor: ( props = {}, options ) ->
    @vertex = options.line.smooth
    for key, value of props
      @[ key ] = value

module.exports = DataOptions
