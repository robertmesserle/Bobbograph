class Options

  # Size info
  height        : 300
  width         : 600

  # Visual details
  lineWidth     : 10
  color         : '#000'

  # Smoothing info
  smoothGraph   : false

  # Padding
  padding       : null

  # Canvas info
  usableWidth   : null
  usableHeight  : null

  constructor: ( options = {} ) ->
    for key, value of options then @[ key ] = value
    @padding      = new Padding @padding, @lineWidth
    @usableWidth  = @width  - @padding.left - @padding.right
    @usableHeight = @height - @padding.top  - @padding.bottom
