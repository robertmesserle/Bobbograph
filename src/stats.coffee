module.exports = class Stats

  constructor: ( data ) ->
    @getRangeData data

  getRangeData: ( data ) ->
    xarr    = for point in data then point.x
    yarr    = for point in data then point.y

    @xmin   = Math.min.apply null, xarr
    @xmax   = Math.max.apply null, xarr
    @ymin   = Math.min.apply null, yarr
    @ymax   = Math.max.apply null, yarr

    @dx     = @xmax - @xmin
    @dy     = @ymax - @ymin
