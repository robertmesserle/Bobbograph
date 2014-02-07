class Axis

  constructor: ( @axis, @wrapper, @options, @data ) ->
    [ @min, @max ] = @getLimits( @data.stats )
    @lines = @getLineData()
    @wrapper.appendChild( @renderLines() )

  getLineData: ( increment = @axis.increment ) ->
    for i in [ @getFirstLine( @min, increment ) .. @max ] by increment
      { number: i, pos: @scalePoint( i ) + 'px' }

  renderLines: ->
    axis = document.createElement( 'ul' )
    axis.className = "#{ @clss } bbg-axis"
    for line in @lines.slice().reverse()
      elem = document.createElement( 'li' )
      elem.style[ @prop ] = line.pos
      text = document.createElement( 'div' )
      text.innerText = line.number
      elem.appendChild( text )
      axis.appendChild( elem )
    axis

  getFirstLine: ( min = @min, increment = @axis.increment ) ->
    if min > 0
      rem = min % increment
      increment - rem + min
    else if min < 0
      rem = min % increment
      if rem then min - rem else min + increment - rem
    else increment

module.exports = Axis
