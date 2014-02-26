class AnimationOptions

  duration: 1000
  callback: null

  constructor: ( props ) ->
    for key, value of props then @[ key ] = value

module.exports = AnimationOptions
