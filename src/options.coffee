LineOptions     = require( './options/line.coffee' )
PaddingOptions  = require( './options/padding.coffee' )
AxisLineOptions = require( './options/axis-line.coffee' )
BevelOptions    = require( './options/bevel.coffee' )
DataOptions     = require( './options/data.coffee' )

class Options

  height: 300
  width:  600

  constructor: ( options = {}, element ) ->
    @height = @getStyle( element, 'height' ) or @height
    @width  = @getStyle( element, 'width' )  or @width
    for key, value of options then @[ key ] = value
    @line         = new LineOptions( @line, this )
    @padding      = new PaddingOptions( @padding, @line.width )
    @xAxis        = new AxisLineOptions( @xAxis )
    @yAxis        = new AxisLineOptions( @yAxis )
    @bevel        = new BevelOptions( @bevel ) if @bevel?
    @usableWidth  = @width  - @padding.left - @padding.right
    @usableHeight = @height - @padding.top  - @padding.bottom
    @data         = new DataOptions( @data, this )

  getPadding: ( styles, direction ) ->
    parseInt( styles.getPropertyValue( "padding-#{ direction }" ), 10 )
    
  getStyle: ( element, style ) ->
    return unless styles = getComputedStyle?( element )
    size = parseInt( styles.getPropertyValue( style ), 10 )
    switch styles.getPropertyValue( 'box-sizing' )
      when 'border-box'
        switch style
          when 'height' then size - @getPadding( styles, 'top' )  - @getPadding( styles, 'bottom' )
          when 'width'  then size - @getPadding( styles, 'left' ) - @getPadding( styles, 'right' )
          else size
      else size

module.exports = Options
