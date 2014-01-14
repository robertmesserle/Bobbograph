class Options

  # Size info
  height:             300
  width:              600

  # Visual details
  bevel:              false
  bevelIntensity:     1
  shineIntensity:     0.65
  shadowIntensity:    0.3
  smoothBevel:        false
  smoothGraph:        false
  lineWidth:          5
  color:              '#000'
  shadow:             false
  fill:               false
  verticalFill:       false

  # Smoothing info
  maxPoints:          false
  peaksAndValleys:    false
  verticalLineFill:   false
  smoothingMethod:    false
  normalRange:        false

  # Animation info
  animationDuration:  0
  easingMethod:       false
  callback:           false
  

  # Variables for cropping the graph
  maxX:               false
  maxY:               false
  minX:               false
  minY:               false
  percent:            1     # Percentage of the graph to render
  
  # Padding
  padding:            0
  xPadding:           null  # Default: padding
  yPadding:           null  # Default: padding
  leftPadding:        null  # Default: xPadding
  rightPadding:       null  # Default: xPadding
  topPadding:         null  # Default: yPadding
  bottomPadding:      null  # Default: yPadding
  
  # Canvas info
  usableWidth:        600
  usableHeight:       300

  constructor: (options = {}) ->
    for key, value of options then @[key] = value
    @calculatePadding()

  calculatePadding: ->
    @xPadding       ?= @padding
    @yPadding       ?= @padding
    @leftPadding    ?= @xPadding
    @rightPadding   ?= @xPadding
    @topPadding     ?= @yPadding
    @bottomPadding  ?= @yPadding
