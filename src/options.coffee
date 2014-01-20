class Options

  # Size info
  height:             300
  width:              600

  # Visual details
  lineWidth:          10
  color:              '#000'
  fill:               false

  # Smoothing info
  smoothGraph:        false

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

  constructor: ( options = {} ) ->
    for key, value of options then @[ key ] = value
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
