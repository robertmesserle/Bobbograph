Options      = require './options.coffee'
Data         = require './data.coffee'
CurvedRender = require './curved-render.coffee'
LinearRender = require './linear-render.coffee'
XAxis        = require './x-axis.coffee'

class Bobbograph

  constructor: ( id, data, options ) ->
    @element = document.getElementById id
    @options = new Options options
    @context = @getContext @element
    @data    = new Data data, @options

    if @options.line.smooth
      new CurvedRender @data.pixels, @context, @options
    else
      new LinearRender @data.points, @context, @options

    @xAxis = new XAxis @options.xAxis, @element, @options

  getContext: ( element ) ->
    canvas  = document.createElement 'canvas'
    canvas.setAttribute 'height', @options.height
    canvas.setAttribute 'width',  @options.width
    element.appendChild canvas
    context = canvas.getContext '2d'

window?.Bobbograph = Bobbograph
global?.Bobbograph = Bobbograph
