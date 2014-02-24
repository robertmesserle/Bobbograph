class FillOptions

  vertical: false
  gradient: false
  color:    false

  constructor: ( fill, @options ) ->
    @color    = @getColor( fill )
    @gradient = @getGradient( fill )
    @vertical = fill.vertical or @vertical

  getColor: ( fill ) ->
    switch typeof fill
      when 'string' then fill
      else fill.color or @gradient

  getGradient: ( fill ) ->
    if fill instanceof Array then @parseGradient( fill )
    else if fill.gradient then @parseGradient( fill.gradient )
    else @gradient

  parseGradient: ( fill ) ->
    count = fill.length - 1
    for stop, index in fill
      if typeof stop is 'string' then { color: stop, position: index / count }
      else stop

  get: ( context ) ->
    return @color if @color
    gradient =
      if @vertical then context.createLinearGradient( 0, 0, 0, @options.height )
      else context.createLinearGradient( 0, 0, @options.width, 0 )
    for stop in @gradient then gradient.addColorStop( stop.position, stop.color )
    gradient

module.exports = FillOptions
