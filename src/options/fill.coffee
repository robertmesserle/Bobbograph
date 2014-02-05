class FillOptions

  constructor: ( fill, @options ) ->
    @type = @getType( fill )
    @fill = switch @type
      when 'gradient' then @parseGradient( fill )
      when 'color'    then fill

  getType: ( fill ) ->
    if fill instanceof Array then 'gradient'
    else 'color'

  parseGradient: ( fill ) ->
    count = fill.length - 1
    for stop, index in fill
      if typeof stop is 'string' then { color: stop, position: index / count }
      else stop

  get: ( context, type = @type, fill = @fill, options = @options ) ->
    switch type
      when 'color' then fill
      when 'gradient'
        gradient = context.createLinearGradient( 0, 0, options.width, 0 )
        for stop in fill then gradient.addColorStop( stop.position, stop.color )
        gradient

module.exports = FillOptions
