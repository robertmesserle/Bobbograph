Axis = require( './axis.coffee' )

class XAxis extends Axis

  clss: 'bbg-x-axis'
  prop: 'left'

  getLimits: ( stats ) -> [ stats.xmin, stats.xmax ]

  scalePoint: ( value ) -> @data.scalePoint( value, @min, @max - @min, @options.usableWidth)

module.exports = XAxis
