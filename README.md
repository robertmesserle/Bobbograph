Bobbograph v2.0
===============

Bobbograph is a highly configurable Canvas-based graphing library for jQuery.  It provides you with the power to render great looking graphs across all modern browsers.  Bobbograph is also built to utilize Excanvas for older versions of IE that do not support Canvas.

```javascript
var data    = [ 76, 70, 23, 41, 86, 59, 85, 57 ],
	options = {
		duration: 1000,
		padding: 20,
		normal_range: 0,
		line_width: 10,
		smooth_graph: true,
		peaks_and_valleys: true,
		bevel: true,
		dividers: [ { count: 25, line_width: 0.5 }, { count: 5, line_width: 1.5 } ],
		fill: [ 'rgba(' + [ 0xff, 0xcc, 0, 0.25 ] + ')', 'rgba(' + [ 0, 0xcc, 0xff, 0.25 ] + ')' ],
		color: [ '#fc0', '#0cf' ]
	};
$('#bobbograph').bobbograph( data, options );
```

Options
-------

## Setting Dimensions

Dimensions are set with the options **width** and **height**.

```javascript
$('#bobbograph').bobbograph( data, {
	height: 300,
	width:  400
} );
```

**height**:  The height of the canvas element in pixels.  
**width**:  The width of the canvas element in pixels.

## Padding

You can add padding to your graph.  This is useful when using thicker lines to prevent the line from being cut off by the canvas borders.

Padding values are overridden by more specific padding.  So the **padding** value will be overridden by **y_padding** or **left_padding** because they are both more specific.

```javascript
$('#bobbograph').bobbograph( data, {
	left_padding: 10,
	right_padding: 10,
	y_padding: 20
} );
```

**padding**: Padding applied to all 4 sides (in pixels).  
**x_padding**: Padding applied to the left and right.  
**y_padding**: Padding applied to the top and bottom.  
**left_padding**: Padding applied to the left.  
**right_padding**: Padding applied to the right.  
**top_padding**: Padding applied to the top.  
**bottom_padding**: Padding applied to the bottom.

## Scaling

Scaling is completely optional, but can give you more control over the rendered graph.  By default, the graph will scale to fill the provided canvas space; however, you can customize it as follows:

```javascript
$('#bobbograph').bobbograph( data, {
	min_x: 0,
	max_x: 50,
	min_y: 0,
	max_y: 100
} );
```

**min_x**: The value at the left side of the graph.  
**max_x**: The value at the right side of the graph.  
**min_y**: The value at the bottom of the graph.  
**max_y**: The value at the top of the graph.