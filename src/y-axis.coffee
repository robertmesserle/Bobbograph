Axis = require( './axis.coffee' )

class YAxis extends Axis

  getLimits: ( stats ) -> [ stats.ymin, stats.ymax ]

module.exports = YAxis
