class Stats

  constructor: ( @data, @options = {} ) ->
    for key, value of @options.frame then @[ key ] = value
    @getRangeData()

  getRangeData: ->
    xarr    = for point in @data then point.x
    yarr    = for point in @data then point.y

    @xmin   ?= Math.min.apply( null, xarr )
    @xmax   ?= Math.max.apply( null, xarr )
    @ymin   ?= Math.min.apply( null, yarr )
    @ymax   ?= Math.max.apply( null, yarr )

    @dx     = @xmax - @xmin
    @dy     = @ymax - @ymin

module.exports = Stats
