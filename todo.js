this.anim_duration     = obj.duration                 || 0;                                 // number:      duration of the animation (animation will be skipped if set to 0)
this.callback          = obj.callback                 || false;                             // function:    function to be called after the animation completes
this.normal_range      = max_min( obj.normal_range    || 0, 0, raw_data.length - 2 );       // number:      range to be used for moving average (0 means no normalization will occur)
this.percent           = if_defined( obj.percent,        1 );                               // number:      a number between 0 and 1 to determine what percentage of the graph you would like to show
