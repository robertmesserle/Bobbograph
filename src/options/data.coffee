class DataOptions

  vertex:    null
  maxPoints: null
  normalize: null

  constructor: ( props = {}, options ) ->
    @vertex = options.line.smooth
    for key, value of options
      @[ key ] = value

module.exports = DataOptions
