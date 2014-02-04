module.exports = class BevelOptions

  shine:     0.35
  shadow:    0.15
  smooth:    false
  opacity:   1

  constructor: ( options ) ->
    if typeof options is 'object'
      for key, value of options
        @[ key ] = value
