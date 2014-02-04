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
    @left   = padding.left  or @x
    @right  = padding.right or @x
    @y      = padding.y     or @size
    @top    = padding.top   or @y
    @bottom = padding.top   or @y

module.exports = PaddingOptions
