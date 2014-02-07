class XAxis

  constructor: ( @axis, @wrapper, @options ) ->

  getFirstLine: ( min, inc ) ->
    if min > 0
      rem = min % inc
      if rem then inc - rem + min else min
    else if min < 0
      rem = min % inc
      min - rem
    else min

module.exports = XAxis
