Stats  = require( './stats.coffee' )
Point  = require( './point.coffee' )
Easing = require( './easing.coffee' )

class Data

  constructor: ( data, @options ) ->
    @data   = @formatData( data )
    @data   = @shrinkData( @data )
    @stats  = new Stats( @data )
    @points = @getPoints()
    @pixels = @getPixels( @points, @options.usableWidth, @options.line?.smooth )

  shrinkData: ( data, max = @options.data.maxPoints ) ->
    return data unless max
    len = data.length
    div = Math.ceil( len / max )
    max = Math.ceil( len / div )
    arr = for i in [ 0 .. max - 1 ]
      start = div * i
      end   = Math.min( len, start + div )
      delta = end - start
      [ x, y ] = [ 0, 0 ]
      for j in [ start .. end - 1 ]
        point = data[ j ]
        x += point.x
        y += point.y
      new Point( x / delta, y / delta )

  scalePoint: ( val, min, delta, scale ) ->
    scoped    = val - min
    percent   = scoped / delta
    scaled    = percent * scale

  getPoints: ->
    { usableWidth, usableHeight } = @options
    { xmin, ymin, dx, dy }        = @stats
    for point, index in @data when @isVertex( @data, index, @options.data.vertex )
      x = @scalePoint( point.x, xmin, dx, usableWidth )
      y = @scalePoint( point.y, ymin, dy, usableHeight )
      new Point( x, y )

  isVertex: ( data, index, vertex ) ->
    return true unless vertex
    point = data[ index ].y
    prev  = data[ index - 1 ]?.y
    next  = data[ index + 1 ]?.y
    return true unless prev? and next?
    return true if prev > point and next > point
    return true if prev < point and next < point
    return true if prev is point and next isnt point
    return true if prev isnt point and next is point
    return false

  sortMethod: ( a, b ) ->
    a.x - b.x

  formatData: ( data ) ->
    if typeof data[ 0 ] is 'number'
      for val, index in data
        new Point( index, val )
    else if data[ 0 ] instanceof Array
      points = for val, index in data
        new Point( val[ 0 ], val[ 1 ] )
      points.sort( @sortMethod )
    else if data[ 0 ] and data[ 0 ].x? and data[ 0 ].y?
      points = for val, index in data
        new Point( val.x, val.y )
      points.sort( @sortMethod )

  getPixels: ( points, width, curve ) ->
    method = if curve then Easing.curve else Easing.linear
    pixels = new Array( width )
    for point in points
      if lastPoint?
        for index in [ Math.round( lastPoint.x ) .. Math.round( point.x ) ]
          y = method( index - lastPoint.x, lastPoint.y,
                      point.y - lastPoint.y, point.x - lastPoint.x )
          pixels[ index ] = new Point( index, y )
      lastPoint = point
    pixels

module.exports = Data
