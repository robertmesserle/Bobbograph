class Options

  # Size info
  height  : 300
  width   : 600

  constructor: ( options = {} ) ->
    for key, value of options then @[ key ] = value
    @line         = new LineOptions     @line
    @padding      = new PaddingOptions  @padding, @line.width
    @xAxis        = new AxisLineOptions @xAxis
    @yAxis        = new AxisLineOptions @yAxis
    @usableWidth  = @width  - @padding.left - @padding.right
    @usableHeight = @height - @padding.top  - @padding.bottom
