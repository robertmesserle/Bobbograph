LineOptions      = require( './options/line.coffee' )
FillOptions      = require( './options/fill.coffee' )
PaddingOptions   = require( './options/padding.coffee' )
AxisLineOptions  = require( './options/axis-line.coffee' )
BevelOptions     = require( './options/bevel.coffee' )
DataOptions      = require( './options/data.coffee' )
FrameOptions     = require( './options/frame.coffee' )
ShadowOptions    = require( './options/shadow.coffee' )
AnimationOptions = require( './options/animation.coffee' )

class Options

  height: 300
  width:  600

  constructor: ( options = {}, element ) ->
    if element
      @height = @getSize( 'height', element )
      @width  = @getSize( 'width',  element )

    for key, value of options then @[ key ] = value

    @line         = new LineOptions( @line, this )
    @fill         = new FillOptions( @fill, this ) if @fill?
    @padding      = new PaddingOptions( @padding, @line.width )
    @xAxis        = new AxisLineOptions( @xAxis )
    @yAxis        = new AxisLineOptions( @yAxis )
    @bevel        = new BevelOptions( @bevel ) if @bevel?
    @usableWidth  = @width  - @padding.left - @padding.right
    @usableHeight = @height - @padding.top  - @padding.bottom
    @data         = new DataOptions( @data, this )
    @frame        = new FrameOptions( @frame )
    @shadow       = new ShadowOptions( @shadow ) if @shadow?
    @animation    = new AnimationOptions( @animation ) if @animation?

  adjustSize: ( elem, name, extra, styles ) ->
    cssExpand = [ 'top', 'right', 'bottom', 'left' ]
    index     = if extra is 'border' then 4 else if name is 'width' then 1 else 0
    value     = 0
    for i in [ index .. 3 ] by 2
      side = cssExpand[ i ]
      if extra is 'content'
        value -= parseInt( styles.getPropertyValue( "padding-#{ side }" ), 10 ) or 0
      value -= parseInt( styles.getPropertyValue( "border-#{ side }-width" ), 10 ) or 0
    console.log( 'adjustedValue', value )
    value

  getSize: ( name, elem ) ->
    str    = name.charAt( 0 ).toUpperCase() + name.substr( 1 )
    value  = elem[ "offset#{ str }" ]
    styles = getComputedStyle( elem )
    extra  = if elem.style.boxSizing is 'border-box' then 'border' else 'content'
    value + @adjustSize( elem, name, extra, styles )

module.exports = Options
