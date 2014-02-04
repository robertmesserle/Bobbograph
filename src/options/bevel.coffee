module.exports = class BevelOptions

  intensity: 1
  shine:     0.35
  shadow:    0.15
  smooth:    false

  constructor: ( options ) ->
    if typeof options is 'object'
      for key, value of options
        @[ key ] = value
