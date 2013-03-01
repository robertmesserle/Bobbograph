/*! Bobbograph v2.1 by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
/*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */

( function ( $ ) {
  'use strict';
  var easing_methods = {
      ease_out_quad:    function ( x, t, b, c, d ) { return -c *(t/=d)*(t-2) + b; },
      ease_in_out_quad: function ( x, t, b, c, d ) { return (t/=d/2) < 1 ? c/2*t*t + b : -c/2 * ((--t)*(t-2) - 1) + b; },
      linear:           function ( x, t, b, c, d ) { return t/d*c+b; }
    },
    trig = {
            get_angle_from_points: function ( x1, y1, x2, y2 ) { var dy = y2 - y1, dx = x2 - x1, angle = Math.atan( dy / dx ); return ( ( dx > 0 ? angle : Math.PI + angle ) + Math.PI * 2 ) % ( Math.PI * 2 ); },
            get_point_from_angle: function ( x, y, angle, distance ) { return { x: Math.cos( angle ) * distance + x, y: Math.sin( angle ) * distance + y }; }
    },
    excanvas = typeof G_vmlCanvasManager !== 'undefined';
  function get_property ( obj, namespace, not_found_value ) {
    if ( typeof obj === 'undefined' )   return typeof not_found_value !== 'undefined' ? not_found_value : false;
    if ( namespace.indexOf( '.' ) < 0 ) return typeof obj[ namespace ] !== 'undefined' ? obj[ namespace ] : typeof not_found_value !== 'undefined' ? not_found_value : false;
    var namespace_array  = namespace.split('.'),
      namespace_length = namespace_array.length,
      val              = obj, i;
    for ( i = 0; i < namespace_length; i++ )
      if ( typeof( val = val[ namespace_array[ i ] ] ) === 'undefined' )
        return typeof not_found_value !== 'undefined' ? not_found_value : false;
    return typeof val !== 'undefined' ? val : typeof not_found_value !== 'undefined' ? not_found_value : false;
  }
  function get_child ( obj, key, not_found_value ) { return typeof obj !== 'undefined' && typeof obj[ key ] !== 'undefined' ? obj[ key ] : typeof not_found_value !== 'undefined' ? not_found_value : false; }
  function if_defined( val, not_found_value ) { return typeof val !== 'undefined' ? val : typeof not_found_value !== 'undefined' ? not_found_value : false; }
  function max_min( num, min, max ) { return num > max ? max : num < min ? min : num; }

  //-- Object.create polyfill
  Object.create || ( Object.create = ( function () {
    function Obj () {}
    return function ( proto ) {
      Obj.prototype = proto;
      return new Obj;
    };
  } )() );

  // Bobbograph Main Object
  function Bobbograph ( $container, raw_data, obj ) {
    if ( !obj ) obj = {};
    this.height            = obj.height                   || $container.height();               // number:      canvas height
    this.width             = obj.width                    || $container.width();                // number:      canvas width
    this.bevel             = obj.bevel                    || false;                             // boolean:     whether or not to bevel the line
    this.bevel_intensity   = obj.bevel_intensity          || 1;                                 // number:      opacity value for the bevel effect
    this.shine_intensity   = obj.shine_intensity          || 0.65;                              // number:      opacity for the shine portion of the bevel
    this.shadow_intensity  = obj.shadow_intensity         || 0.3;                               // number:      opacity for the shadow portion of the bevel
    this.smooth_bevel      = obj.smooth_bevel             || false;                             // boolean:     whether or not you want the bevel effect to be smoothed (may cause performance hit)
    this.smooth_graph      = obj.smooth_graph             || false;                             // boolean:     whether or not you want the lines to be curved for a smoother looking graph
    this.line_width        = obj.line_width               || 5;                                 // number:      width of the line
    this.max_num_points    = obj.max_num_points           || false;                             // number:      an optional maximum number of points for the graph (will change data values)
    this.peaks_and_valleys = obj.peaks_and_valleys        || false;                             // boolean:     do you want to remove points between peaks and valleys?
    this.padding           = obj.padding                  || 0;                                 // number:      padding to be applied to all 4 sides (overridden by more specific padding values)
    this.color             = obj.color                    || '#000';                            // mixed:       color or gradient for the line
    this.vert_line_fill    = obj.vert_line_fill           || false;                             // boolean:     if the color is a gradient, this will force it to be a vertical gradient
    this.shadow            = obj.shadow                   || false;                             // boolean:     do you want a shadow to be applied?
    this.anim_duration     = obj.duration                 || 0;                                 // number:      duration of the animation (animation will be skipped if set to 0)
    this.dividers          = obj.dividers                 || false;                             // array:       array of objects specifying division sets
    this.fill              = obj.fill                     || false;                             // mixed:       color or gradient to fill the space beneath the line
    this.vertical_fill     = obj.vertical_fill            || false;                             // boolean:     if a fill gradient is provided, do you want it to be vertical?
    this.callback          = obj.callback                 || false;                             // function:    function to be called after the animation completes
    this.easing_method     = obj.easing_method            || easing_methods.ease_out_quad;      // function:    function to determine the animation easing logic (must follow jQuery easing plugin method structure)
    this.smoothing_method  = obj.smoothing_method         || easing_methods.ease_in_out_quad;   // function:    function to determine the graph smoothing (must follow jQuery easing plugin method structure)
    this.normal_range      = max_min( obj.normal_range    || 0, 0, raw_data.length - 2 );       // number:      range to be used for moving average (0 means no normalization will occur)
    this.max_x             = if_defined( obj.max_x,          false );                           // number:      manually specify the maximum x value for the graph (applies to graph scaling)
    this.max_y             = if_defined( obj.max_y,          false );                           // number:      manually specify the maximum y value for the graph (applies to graph scaling)
    this.min_x             = if_defined( obj.min_x,          false );                           // number:      manually specify the minimum x value for the graph (applies to graph scaling)
    this.min_y             = if_defined( obj.min_y,          false );                           // number:      manually specify the minimum y value for the graph (applies to graph scaling)
    this.percent           = if_defined( obj.percent,        1 );                               // number:      a number between 0 and 1 to determine what percentage of the graph you would like to show
    this.x_padding         = if_defined( obj.x_padding,      this.padding );                    // number:      padding to be applied to left and right
    this.y_padding         = if_defined( obj.y_padding,      this.padding );                    // number:      padding to be applied to top and bottom
    this.left_padding      = if_defined( obj.left_padding,   this.x_padding );                  // number:      padding to be applied to the left
    this.right_padding     = if_defined( obj.right_padding,  this.x_padding );                  // number:      padding to be applied to the right
    this.top_padding       = if_defined( obj.top_padding,    this.y_padding );                  // number:      padding to be applied to the top
    this.bottom_padding    = if_defined( obj.bottom_padding, this.y_padding );                  // number:      padding to be applied to the bottom

    this.usable_width      = this.width  - this.left_padding - this.right_padding;
    this.usable_height     = this.height - this.top_padding  - this.bottom_padding;

    //-- child objects
    this.data              = new BobbographData( this, Object.create( raw_data ) );
    new BobbographRender( this, $container );

    if ( typeof this.easing_method === 'string' ) this.easing_method = get_property( $, 'easing.' + this.easing_method, easing_methods.ease_out_quad );
  }

  // Bobbograph animator object
  function BobbographAnimator ( parent, obj ) {
    this.parent     = parent;
    this.fps        = 77;
    this.wait       = 1000 / this.fps;
    this.duration   = obj.duration;
    this.diff       = parent.parent.percent;
    this.step       = obj.step;
    this.callback   = obj.callback;
    this.start_time = +new Date();
    this.interval   = false;
    this.play();
  }
  BobbographAnimator.prototype = {
    play: function () {
      if ( this.duration === 0 || !$.support.leadingWhitespace ) return this.step( this.diff );
      else this.interval = setInterval( $.proxy( this, 'step_forward' ), this.wait );
    },
    step_forward: function () {
      var time = +new Date() - this.start_time,
        val  = easing_methods.ease_out_quad( 0, Math.min( time, this.duration ), 0, this.diff, this.duration );
      this.step( val );
      if ( time >= this.duration ) this.stop();
    },
    stop: function () {
      clearInterval( this.interval );
      if ( this.callback ) this.callback();
    }
  };

  // Bobbograph data management object
  function BobbographData ( parent, raw_data ) {
    this.parent = parent;
    this.data   = raw_data;
    this.points = {
      mid:    Array( parent.usable_width ),
      top:    Array( parent.usable_width ),
      bottom: Array( parent.usable_width ),
      max:    -Infinity,
      min:    Infinity,
      mean:   0,
      high:   false
    };
    this.length = this.data.length;
    this.stats  = {
      max_x:  parent.max_x,
      max_y:  parent.max_y,
      min_x:  parent.min_x,
      min_y:  parent.min_y,
      mean:   false,
      range:  false,
      domain: false
    };

    this.convert_to_points();
    this.normalize_data();
    this.get_stats();
    this.get_peaks_and_valleys();
    this.reduce_points();
    this.create_point_map();
    this.get_top_and_bottom_points();
  }
  BobbographData.prototype = {
    convert_to_points: function () {
      var len = this.data.length, cur;
      while ( len-- ) {
        cur = this.data[ len ];
        if ( typeof this.data[ len ] === 'object' ) {
          if ( cur instanceof Array ) this.data[ len ] = { x: +cur[ 0 ], y: +cur[ 1 ] };
        } else {
          this.data[ len ] = { x: len, y: +cur };
        }
      }
      this.data.sort( function ( a, b ) { return a.x - b.x; } );
    },
    normalize_data: function () {
      var range = this.parent.normal_range;
      if ( !range ) return;
      var i, j, tot, num, data = Array( this.length );
      for ( i = 0; i < this.length; i++ ) {
        tot = num = 0;
        for ( j = Math.max( i - range, 0 ); j <= Math.min( i + range, this.length - 1 ); j++ ) {
          tot += this.data[ j ].y;
          num++;
        }
        data[ i ] = { x: this.data[ i ].x, y: tot / num };
      }
      this.data = data;
    },
    get_stats: function () {
      var i = this.length - 1,
        cur = false,
        sum = 0,
        max_y = this.data[ i ].y,
        min_y = max_y,
        max_x = this.data[ i ].x,
        min_x = max_x;
      while ( i-- ) {
        cur = this.data[ i ];
        sum += cur.y;
        if ( max_y < cur.y ) max_y = cur.y;
        if ( min_y > cur.y ) min_y = cur.y;
        if ( max_x < cur.x ) max_x = cur.x;
        if ( min_x > cur.x ) min_x = cur.x;
      }
      max_y = this.stats.max_y !== false ? this.stats.max_y : max_y;
      min_y = this.stats.min_y !== false ? this.stats.min_y : min_y;
      max_x = this.stats.max_x !== false ? this.stats.max_x : max_x;
      min_x = this.stats.min_x !== false ? this.stats.min_x : min_x;
      if ( max_x === min_x ) max_x++;
      if ( max_y === min_y ) max_y++;
      this.stats = {
        max_y: max_y,
        min_y: min_y,
        max_x: max_x,
        min_x: min_x,
        mean: sum / this.length,
        range: max_y - min_y,
        domain: max_x - min_x
      };
    },
    get_peaks_and_valleys: function () {
      var i, prev, cur, next, last = this.data[ 0 ], data = [];
      for ( i = 0; i < this.length; i++ ) {
        prev = i > 0 ? this.data[ i - 1 ] : false;
        cur  = this.data[ i ];
        next = i < this.length - 1 ? this.data[ i + 1 ] : false;
        if ( prev === false || next === false || this.is_peak_or_valley( cur.y, prev.y, next.y ) ) {
          last = prev;
          data.push( { x: this.scale_x( cur.x ), y: this.scale_y( cur.y ) } );
        }
      }
      this.data = data;
      this.length = data.length;
    },
    reduce_points: function () {
      var i;
      while ( this.parent.max_num_points && this.parent.max_num_points > 1 && this.length > this.parent.max_num_points ) {
        for ( i = this.data.length; i--; ) {
          if ( i === 0 || i === this.length - 1 ) continue;
          if ( i % 2 === 0 ) this.data[ i ] = { x: ( this.data[ i ].x + this.data[ i - 1 ].x ) / 2, y: ( this.data[ i ].y + this.data[ i - 1 ].y ) / 2 };
          else this.data.splice( i, 1 );
        }
        this.length = this.data.length;
      }
    },
    create_point_map: function () {
      var x, i = 1,
        prev = this.data[ 0 ],
        next = this.data[ 1 ],
        ease = this.parent.smooth_graph ? this.parent.smoothing_method : easing_methods.linear;
      for ( x = this.parent.left_padding; x < this.parent.width - this.parent.right_padding; x++ ) {
        if ( x > next.x ) {
          prev = next;
          next = this.data[ ++i ];
        }
        if ( typeof next === 'undefined' ) {
          this.parent.percent *= ( x - 1 - this.parent.left_padding ) / this.parent.usable_width;
          break;
        }
        this.points.mid[ x - this.parent.left_padding ] = ease( 0, x - prev.x, prev.y, next.y - prev.y, next.x - prev.x );
        if ( this.points.high === false || this.points.mid[ x - this.parent.left_padding ] < this.points.high.y ) this.points.high = { x: x, y: this.points.mid[ x - this.parent.left_padding ] };
        if ( this.points.mid[ x - this.parent.left_padding ] > this.points.max ) this.points.max = this.points.mid[ x - this.parent.left_padding ];
        if ( this.points.mid[ x - this.parent.left_padding ] < this.points.min ) this.points.min = this.points.mid[ x - this.parent.left_padding ];
        this.points.mean += this.points.mid[ x - this.parent.left_padding ];
      }
      this.points.mean /= this.parent.usable_width;
    },
    get_top_and_bottom_points: function () {
      var i;
      for ( i = 0; i < this.parent.usable_width; i++ ) this.points.top[ i ]    = this.get_top_or_bottom_point( i, false );
      for ( i = 0; i < this.parent.usable_width; i++ ) this.points.bottom[ i ] = this.get_top_or_bottom_point( i, true );
    },
    get_top_or_bottom_point: function ( x, bottom ) {
      var prev = { point: { x: x - 1 + this.parent.left_padding, y: this.points.mid[ Math.max( 0, Math.min( this.parent.usable_width - 1, x - 1 ) ) ] } },
        next = { point: { x: x + 1 + this.parent.left_padding, y: this.points.mid[ Math.max( 0, Math.min( this.parent.usable_width - 1, x + 1 ) ) ] } },
        cur  = { point: { x: x     + this.parent.left_padding, y: this.points.mid[ Math.max( 0, Math.min( this.parent.usable_width - 1, x     ) ) ] } };
      cur.prev_angle    = trig.get_angle_from_points( prev.point.x, prev.point.y, cur.point.x, cur.point.y );
      cur.next_angle    = trig.get_angle_from_points( cur.point.x, cur.point.y, next.point.x, next.point.y );
      cur.prev_offset   = trig.get_point_from_angle( cur.point.x, cur.point.y, cur.prev_angle + ( bottom ? 1 : -1 ) * Math.PI / 2, this.parent.line_width / 2 );
      return {
        point:       cur.point,
        prev:        prev.point,
        prev_offset: cur.prev_offset,
        prev_angle:  cur.prev_angle,
        next:        next.point,
        next_angle:  cur.next_angle
      };
    },
    is_peak_or_valley: function ( cur, prev, next ) {
      return !this.parent.peaks_and_valleys || ( cur >= prev && cur >= next ) || ( cur <= prev && cur <= next ) && !( cur == prev && cur == next );
    },
    scale_x: function ( x ) {
      return ( ( x - this.stats.min_x ) / this.stats.domain ) * ( this.parent.width - this.parent.left_padding - this.parent.right_padding ) + this.parent.left_padding;
    },
    scale_y: function ( y ) {
      return this.parent.height - ( ( y - this.stats.min_y ) / this.stats.range ) * ( this.parent.usable_height - this.parent.line_width ) - this.parent.bottom_padding - this.parent.line_width / 2;
    },
    get_y_at: function ( x ) {
      return this.points.mid[ Math.min( this.parent.usable_width - 1, Math.max( 0, Math.round( x - this.parent.left_padding ) ) ) ];
    }
  };

  // Bobbograph render object
  function BobbographRender ( parent, $container ) {
    this.parent         = parent;
    this.data           = parent.data;
    this.ctx            = this.get_context( $container );
    this.bevel_shine    = parent.bevel ? this.bevel( true )  : false;
    this.bevel_shadow   = parent.bevel ? this.bevel( false ) : false;
    this.shadow         = parent.shadow;
    this.shadow_x       = get_child( this.shadow, 'x', 3 );
    this.shadow_y       = get_child( this.shadow, 'y', 3 );
    this.shadow_color   = get_child( this.shadow, 'color', 'rgba( 0, 0, 0, 0.075' );
    new BobbographAnimator( this, { duration: this.parent.anim_duration, easing: this.parent.easing_method, step: $.proxy( this, 'update_percent' ), callback: parent.callback } );
  }
  BobbographRender.prototype = {
    draw: function () {
      this.dividers();
      if ( this.parent.fill && this.parent.fill.style && this.parent.fill.style === 'lines' && !excanvas ) {
        this.parent.fill.line_gap = this.parent.fill.line_gap || '5';
        this.parent.fill.color = this.parent.fill.color || '#000';
        this.ctx.fillStyle = 'rgba( 0, 0, 0, 0 )';
        this.ctx.save();
        this.graph_line( 0, 0, 0, 1 );
        this.ctx.clip();
        this.fill_lines();
        this.ctx.restore();
        this.graph( 0, 0, this.parent.color );
      } else {
        if ( this.parent.shadow ) this.graph( this.shadow_x, this.shadow_y, this.shadow_color );
        if ( this.parent.fill ) this.graph( 0, 0, this.get_fill( this.parent.fill, this.parent.vertical_fill ), 0, 1 );
        this.graph( 0, 0, this.get_fill( this.parent.color, this.parent.vert_line_fill ) );
        if ( this.parent.bevel ) {
          this.graph( 0, 0, false, -1 );
          this.graph( 0, 0, false, 1 );
          if ( this.parent.smooth_bevel ) this.smooth_bevel();
        }
      }
    },
    fill_lines: function () {
      var x = this.parent.width + this.parent.height;
      this.ctx.strokeStyle = this.parent.fill.color;
      this.ctx.lineWidth = 1;
      if ( this.parent.fill.background_color ) {
        this.ctx.fillStyle = this.parent.fill.background_color;
        this.ctx.fillRect( 0, 0, this.parent.width, this.parent.height );
      }
      while ( ( x -= this.parent.fill.line_gap ) > 0 ) {
        this.ctx.beginPath();
        this.ctx.moveTo( x, 0 );
        this.ctx.lineTo( x - this.parent.height, this.parent.height );
        this.ctx.stroke();
      }
    },
    update_percent: function ( percent ) {
      this.parent.percent = percent;
      this.ctx.clearRect( 0, 0, this.parent.width, this.parent.height );
      this.draw();
    },
    get_context: function ( $container ) {
      var $canvas;
      $container.empty().append( $canvas = $('<canvas />').attr({ height: this.parent.height, width: this.parent.width }) );
      if ( excanvas ) G_vmlCanvasManager.initElement( $canvas.get(0) );
      return $canvas.get(0).getContext( '2d' );
    },
    bevel: function ( light ) {
      var min = light ? this.data.points.min : ( this.data.points.min + this.data.points.mean ) / 2,
        max = light ? ( this.data.points.max + this.data.points.mean ) / 2 : this.data.points.max,
        col = light ? 255 : 0,
        mul = light ? this.parent.shine_intensity : this.parent.shadow_intensity,
        grd = this.ctx.createLinearGradient( 0, min, 0, max );
      grd.addColorStop( 0, 'rgba(' + [ col, col, col, ( light ? mul : 0 ) ] + ')' );
      grd.addColorStop( 1, 'rgba(' + [ col, col, col, ( light ? 0 : mul ) ] + ')' );
      return grd;
    },
    dividers: function () {
      if ( !this.parent.dividers ) return;
      var divider, i = this.parent.dividers.length, j, x;
      while ( i-- ) {
        divider = this.parent.dividers[ i ];
        this.ctx.strokeStyle = divider.color || 'rgba(0,0,0,0.25)';
        this.ctx.lineWidth   = divider.line_width || 1;
        j = divider.count + 1;
        while ( j-- ) {
          this.ctx.beginPath();
          x = Math.round( j * ( this.parent.width - this.parent.left_padding - this.parent.right_padding ) / divider.count + ( j === divider.count ? -1 : 0 ) ) + 0.5 + this.parent.left_padding;
          this.ctx.moveTo( x, this.parent.top_padding );
          this.ctx.lineTo( x, this.parent.height - this.parent.bottom_padding );
          this.ctx.stroke();
        }
      }
    },
    graph: function ( xoffset, yoffset, color, highlight, fill ) {
      if ( typeof highlight === 'undefined' ) highlight = 0;
      if ( typeof fill === 'undefined' ) fill = 0;
      this.ctx.beginPath();
      this.ctx.fillStyle = color === false ? highlight < 0 ? this.bevel_shine : this.bevel_shadow : color;
      this.graph_line( xoffset, yoffset, highlight, fill );
      this.ctx.fill();
    },
    graph_line: function ( xoffset, yoffset, highlight, fill ) {
      var i;
      if ( typeof highlight === 'undefined' ) highlight = 0;
      if ( typeof fill === 'undefined' ) fill = 0;
      var cur, len = this.parent.usable_width;
      //-- draw top border on path
      for ( i = 0; i < len * this.parent.percent; i++ ) {
        cur = this.data.points.top[ i ];
        if ( i === 0 ) {
          if ( fill === 0 ) {
            this.ctx.moveTo( highlight === 0 ? cur.point.x + xoffset : cur.point.x + xoffset - this.parent.line_width / 2, highlight === 0 ? cur.point.y + yoffset + this.parent.line_width / 2 : cur.point.y + yoffset );
            this.ctx.arc( cur.point.x + xoffset, cur.point.y + yoffset, this.parent.line_width / 2, highlight < 0 ? -Math.PI : Math.PI / 2, highlight > 0 ? -Math.PI : Math.PI / -2, false );
          } else {
            this.ctx.moveTo( cur.point.x + xoffset - this.parent.line_width / 2, fill > 0 ? this.parent.height - this.parent.bottom_padding : this.parent.top_padding );
            this.ctx.lineTo( cur.point.x + xoffset - this.parent.line_width / 2, cur.point.y + yoffset );
          }
        } else {
          if ( highlight <= 0 && cur.point.y < cur.prev.y && cur.point.y < cur.next.y ) this.ctx.arc( cur.point.x + xoffset, cur.point.y + yoffset, this.parent.line_width / 2, cur.prev_angle - Math.PI / 2, cur.next_angle - Math.PI / 2, false );
          else this.ctx.lineTo( highlight > 0 || fill != 0 ? cur.point.x + xoffset : cur.prev_offset.x + xoffset, highlight > 0 || fill != 0 ? cur.point.y + yoffset : cur.prev_offset.y + yoffset );
        }
      }
      //-- draw bottom border
      if ( fill == 0 ) {
        this.ctx.arc( cur.point.x + xoffset, cur.point.y + yoffset, this.parent.line_width / 2, highlight > 0 ? cur.prev_angle : cur.prev_angle - Math.PI / 2, highlight < 0 ? cur.prev_angle : cur.prev_angle + Math.PI / 2, false );
        i--;
        while ( i-- ) {
          cur = this.data.points.bottom[ i ];
          if ( highlight >= 0 && cur.point.y > cur.prev.y && cur.point.y > cur.next.y ) this.ctx.arc( cur.point.x + xoffset, cur.point.y + yoffset, this.parent.line_width / 2, cur.next_angle + Math.PI / 2, cur.prev_angle + Math.PI / 2, false );
          else this.ctx.lineTo( highlight < 0 ? cur.point.x + xoffset : cur.prev_offset.x + xoffset, highlight < 0 ? cur.point.y + yoffset : cur.prev_offset.y + yoffset );
        }
      } else {
        cur = trig.get_point_from_angle( cur.point.x + xoffset, cur.point.y + yoffset, cur.next_angle, this.parent.line_width / 2 );
        this.ctx.lineTo( cur.x, cur.y );
        this.ctx.lineTo( cur.x, fill > 0 ? this.parent.height - this.parent.bottom_padding : this.parent.top_padding );
      }
      this.ctx.closePath();
    },
    smooth_bevel: function () {
      /*
      DISCLAIMER:
      This function was written quickly as a proof of concept.  It is horribly inefficient and will be
      rewritten in the future.  Please don't judge this hacky solution too harshly.
      */
      var line_width       = this.parent.line_width,
        shine_intensity  = this.parent.shine_intensity,
        shadow_intensity = this.parent.shadow_intensity,
        shine_inc        = shine_intensity / ( line_width / 2 ) * this.parent.bevel_intensity,
        shadow_inc       = shadow_intensity / ( line_width / 2 ) * this.parent.bevel_intensity;
      while ( this.parent.line_width - 2 > 0 ) {
        this.parent.line_width -= 2;
        this.parent.shadow_intensity -= shadow_inc;
        this.parent.shine_intensity -= shine_inc;
        this.bevel_shine  = this.bevel( true );
        this.bevel_shadow = this.bevel( false );
        this.parent.data.get_top_and_bottom_points();
        this.graph( 0, 0, this.get_fill( this.parent.color, this.parent.vert_line_fill ) );
        this.graph( 0, 0, false, -1 );
                this.graph( 0, 0, false, 1 );
      }
      this.parent.line_width       = line_width;
      this.parent.shine_intensity  = shine_intensity;
      this.parent.shadow_intensity = shadow_intensity;
      this.bevel_shine             = this.bevel( true );
      this.bevel_shadow            = this.bevel( false );
    },
    get_fill: function ( fill, vertical ) {
      if ( !( fill instanceof Array ) ) return fill;
      var scale = this.get_scale( fill ),
        gradient = vertical
          ? this.ctx.createLinearGradient( 0, this.parent.top_padding, 0, this.parent.height / scale - this.parent.bottom_padding )
          : this.ctx.createLinearGradient( this.parent.left_padding, 0, this.parent.width / scale - this.parent.right_padding, 0 ),
        len = fill.length, i;
      for ( i = 0; i < len; i++ ) gradient.addColorStop( get_child( fill[ i ], 'offset', i / ( len - 1 ) ) * scale, get_child( fill[ i ], 'color', fill[ i ] ) );
      return gradient;
    },
    get_scale: function ( fill ) {
      var scale = 1, cache, len = fill.length, i;
      for ( i = 0; i < len; i++ ) if ( ( cache = get_child( fill[ i ], 'offset', 0 ) ) >= 1 ) scale = 1 / cache;
      return scale;
    }
  };

  // jQuery alias for Bobbograph
  $.fn.bobbograph = function ( raw_data, obj ) {
    var bobbograph = new Bobbograph( $(this), raw_data, obj );
    return {
      _object: bobbograph,
      get_y_at: $.proxy( bobbograph.data.get_y_at, bobbograph.data ),
      get_high_point: function () { return bobbograph.data.points.high; }
    };
  };

} )( jQuery );
