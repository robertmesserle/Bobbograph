class Util

  @excanvas: typeof G_vmlCanvasManager isnt 'undefined'

  @getProperty: (obj, namespace, notFoundValue) ->
    return notFoundValue unless obj?
    for part in namespace.split('.')
      obj = obj[ part ]
      return notFoundValue unless obj?
    return obj

  @minMax: (num, min, max) ->
    if num > max then max
    else if num < min then min
    else num
