Axis = require( './axis.coffee' )

class YAxis extends Axis

  clss: 'bbg-y-axis'
  prop: 'bottom'

  getLimits: ( stats ) -> [ stats.ymin, stats.ymax ]

  scalePoint: ( value ) -> @data.scalePoint( value, @min, @max - @min, @options.usableHeight )

module.exports = YAxis
