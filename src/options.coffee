class Options

  # Size info
  height  : 300
  width   : 600
  line    : null
  padding : null

  constructor: ( options = {} ) ->
    for key, value of options then @[ key ] = value
    @line         = new Line    @line
    @padding      = new Padding @padding, @line.width
    @usableWidth  = @width  - @padding.left - @padding.right
    @usableHeight = @height - @padding.top  - @padding.bottom
