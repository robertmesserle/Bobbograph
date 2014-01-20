class PaddingOptions

  top    : null
  bottom : null
  left   : null
  right  : null
  x      : null
  y      : null

  constructor: ( padding = {}, lineWidth = 0 ) ->
    @size   = padding.size  or lineWidth
    @x      = padding.x     or @size
    @top    = padding.top   or @x
    @bottom = padding.top   or @x
    @y      = padding.y     or @size
    @left   = padding.left  or @y
    @right  = padding.right or @y
