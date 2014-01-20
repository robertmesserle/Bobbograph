class Padding

  top    : null
  bottom : null
  left   : null
  right  : null
  x      : null
  y      : null

  constructor: ( padding = {} ) ->
    @size   = padding.size  or 0
    @x      = padding.x     or @size
    @top    = padding.top   or @x
    @bottom = padding.top   or @x
    @y      = padding.y     or @size
    @left   = padding.left  or @y
    @right  = padding.right or @y
