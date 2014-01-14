class Data

  constructor: (data, @options) ->
    @data   = @formatData data
    @stats  = @getStats @data
    @points = @getPoints @data, @options, @stats
    @pixels = @getPixels @points, @options.width, @options.smoothGraph

  scalePoint: (val, min, delta, scale) ->
    scoped    = val - min
    percent   = scoped / delta
    scaled    = percent * scale

  getPoints: (data, options, stats) ->
    for point in data
      x: @scalePoint(point.x, stats.xmin, stats.dx, options.width)
      y: @scalePoint(point.y, stats.ymin, stats.dy, options.height)

  getStats: (data) ->
    xarr = for point in data then point.x
    yarr = for point in data then point.y

    stats =
      xmin: Math.min.apply(null, xarr)
      xmax: Math.max.apply(null, xarr)
      ymin: Math.min.apply(null, yarr)
      ymax: Math.max.apply(null, yarr)

    stats.dx = stats.xmax - stats.xmin
    stats.dy = stats.ymax - stats.ymin

    return stats

  formatData: (data) ->
    sort = (a, b) -> a.x - b.x
    if typeof data[0] is 'number' then for val, index in data then x: index, y: val
    else if data[0] instanceof Array then ( for val, index in data then x: val[0], y: val[1] ).sort sort
    else if data[0] and data[0].x? and data[0].y? then data.sort sort

  getPixels: (points, width, curve) ->
    method = if curve then Easing.curve else Easing.linear
    pixels = new Array(width)
    for point in points
      if lastPoint?
        for index in [ lastPoint.x .. point.x ]
          pixels[ index ] = method index - lastPoint.x, lastPoint.y, point.y - lastPoint.y, point.x - lastPoint.x
      lastPoint = point
    pixels