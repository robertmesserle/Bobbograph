class Render

  constructor: (@pixels, @context, @options) ->
    # Move to starting point
    @context.moveTo 0, @pixels[0]
    # Handle the rest of the pixels
    for index in [ 1 .. @pixels.length - 1 ]
      @context.lineTo index, @pixels[ index ]
    @context.stroke()
