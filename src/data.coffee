class Data

  constructor: (data, @options) ->
    @points = @getPoints(data)

  getPoints: (raw, options = @options) ->
    data  = @formatData(raw)
    xarr  = for point in data then point.x
    xmin  = Math.min.apply(null, xarr)
    xmax  = Math.max.apply(null, xarr)
    dx    = xmax - xmin
    yarr  = for point in data then point.y
    ymin  = Math.min.apply(null, yarr)
    ymax  = Math.max.apply(null, yarr)
    dy    = ymax - ymin
    scalePoint = (val, min, delta, scale) ->
      scoped    = val - min
      percent   = scoped / delta
      scaled    = percent * scale
    for point in data
      x: scalePoint(point.x, xmin, dx, options.width)
      y: scalePoint(point.y, ymin, dy, options.height)

  formatData: (data) ->
    if typeof data[0] is 'number' then for val, index in data then x: index, y: val
    else if data[0] instanceof Array then for val, index in data then x: val[0], y: val[1]
    else if data[0] and data[0].x? and data[0].y? then data
