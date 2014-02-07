class Axis

  constructor: ( @axis, @wrapper, @options, @data ) ->
    [ @min, @max ] = @getLimits( @data.stats )
    @lines = @renderLines( @min, @max, @axis.increment )

  renderLines: ( min, max, increment ) ->
    for i in [ @getFirstLine( min, increment ) .. max ] then i

  getFirstLine: ( min, increment ) ->
    if min > 0
      rem = min % increment
      if rem then increment - rem + min else min
    else if min < 0
      rem = min % increment
      min - rem
    else min

module.exports = Axis
