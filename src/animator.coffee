Easing = require( './easing.coffee' )

class Animator

  fps:      77
  duration: 1000
  start:    0
  end:      1
  easing:   Easing.curve
  callback: null

  constructor: ( options, @step ) ->
    for key, value of options then @[ key ] = value
    @startTime = +new Date()
    @wait      = Math.floor( 1000 / @fps )
    @play()

  stop: ->
    clearInterval( @interval )
    if @callback
      @callback()
      delete @callback

  play: ->
    @interval = setInterval( =>
      now = +new Date()
      time = now - @startTime
      @step( @easing( Math.min( time, @duration ), @start, @end - @start, @duration ) )
      @stop() if time > @duration
    )

module.exports = Animator
