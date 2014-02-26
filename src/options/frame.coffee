class FrameOptions

  xmin: null
  xmax: null
  ymin: null
  ymax: null

  constructor: ( props ) ->
    for key, value of props then @[ key ] = value

module.exports = FrameOptions
