Axis = require( './axis.coffee' )

class XAxis extends Axis

  getLimits: ( stats ) -> [ stats.xmin, stats.xmax ]

module.exports = XAxis
