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
  lineWidth:          10
  color:              '#000'
  shadow:             false
  fill:               false
  verticalFill:       false
  dashed:             false
  dashSize:           5

  # Smoothing info
  maxPoints:          false
  peaksAndValleys:    false
  verticalLineFill:   false
  smoothGraph:        false
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
  padding:            null  # Default: lineWidth
  xPadding:           null  # Default: padding
  yPadding:           null  # Default: padding
  leftPadding:        null  # Default: xPadding
  rightPadding:       null  # Default: xPadding
  topPadding:         null  # Default: yPadding
  bottomPadding:      null  # Default: yPadding
  
  # Canvas info
  usableWidth:        null
  usableHeight:       null

  constructor: (options = {}) ->
    for key, value of options then @[key] = value
    @calculatePadding()

  calculatePadding: ->
    @padding        ?= @lineWidth
    @xPadding       ?= @padding
    @yPadding       ?= @padding
    @leftPadding    ?= @xPadding
    @rightPadding   ?= @xPadding
    @topPadding     ?= @yPadding
    @bottomPadding  ?= @yPadding

    @usableWidth    = @width - @leftPadding - @rightPadding
    @usableHeight   = @height - @topPadding - @bottomPadding
