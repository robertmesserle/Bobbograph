class Bobbograph

  constructor: (id, data, options) ->
    @options = new Options options
    @context = @getContext id
    @data    = new Data data, @options
    new Render @data.pixels, @context, @options

  getContext: (id) ->
    element = document.getElementById(id)
    canvas  = document.createElement('canvas')
    canvas.setAttribute 'height', @options.height
    canvas.setAttribute 'width',  @options.width
    element.appendChild(canvas)
    context = canvas.getContext('2d')