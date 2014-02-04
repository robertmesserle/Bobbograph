module.exports = class BevelOptions

  intensity: 1
  shine:     0.65
  shadow:    0.3
  smooth:    false

  constructor: ( options ) ->
    if typeof options is 'object'
      for key, value of options
        @[ key ] = value
