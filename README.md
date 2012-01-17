Bobbograph v2.1
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

Usage
-----

The basic setup is as follows:

```javascript
$('#bobbograph').bobbograph( Data, Options );
```

In the above example, the graph will be added to an element with an ID of "bobbograph."  This should **NOT** be a Canvas element;  Bobbograph will create the Canvas element for you.

Data
----

Data is an array of points to be graphed.  Points are accepted in 3 formats: Array, Object, or a Number.

If you pass a number as a point, the **x** value will be automatically calculated for you based on the index of the Data array.

If you pass an array for a point, the first value is the **x** and the second value is the **y**.

Example (x: 5, y: 10):

```javascript
[ 5, 10 ]
```

If you pass an object for a point, it's pretty self-explanatory.  The expected keys are **x** and **y**.

Example:

```javascript
{ x: 5, y: 10 }
```

Options
-------

The options object accepts a number of configurable options that will help determine the look and feel of the rendered line graph.

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

## Styling

You can style your graph with the following options.

```javascript
$('#bobbograph').bobbograph( data, {
	line_width: 5,
	shadow: true,
	bevel: true,
	bevel_intensity: 1,
	shine_intensity: 0.65
	shadow_intensity: 0.3,
	smooth_bevel: true
} );
```

**line_width**:  The thickness of the line in pixels (defaults to 5).  
**shadow**:  A boolean value that adds a dropshadow to the line.  (More configuration coming soon.)  
**bevel**:  A boolean value that tells Bobbograph to bevel your line.  
**bevel_intensity**:  The opacity of the bevel as a whole - both shine and shadow are affected.  
**shine_intensity**:  Opacity applied only to the shine portion of the bevel.  
**shadow_intensity**:  Opacity applied only to the shadow portion of the bevel.  
**smooth_bevel**:  A boolean value that toggles a smoother bevel effect.  (Note:  This is much slower to render and may cause lag when animation is turned on.)

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

## Colors

With Bobbograph, you can specify a custom fill or line color by passing a color to Bobbograph.  Colors are accepted in a number of formats.

The basic color formats are:

```javascript
'#ffffff'
'rgb( 255, 255, 255 )'
'rgba( 255, 255, 255, 0.5 )'
```

You can also specify gradients for the fills by passing an array as follows:

```javascript
[ '#ffffff', '#000000' ]
[ { color: '#ffffff', offset: 0 }, { color: '#000000', offset: 1 } ]
```

If you are just doing a simple gradient with evenly spaced colors, you only need to pass an array of colors.  If you need more control than that, you can pass objects as in the second example, which allows you to specify an offset as well as a color.

Colors can be passed to the object as **fill** or **color**:

```javascript
$('#bobbograph').bobbograph( data, {
	fill: [ 'rgba( 255, 204, 0, 0.25 )', 'rgba( 0, 204, 255, 0.25 )' ],
	color: [ '#fc0', '#0cf' ]
} );
```

**color**:  A color representing the styling of the line.  
**vert_line_fill**:  A boolean value that specifies that you want your gradient line fill to be displayed vertically.  
**fill**:  A color representing the area under the graph.  
**vertical_fill**:  A boolean value that specifies that you want your gradient fill to be displayed vertically.

## Animation

You can have Bobbograph animate your graph on load by specifying a **duration**.

You can also override the default easing method with one of jQuery's easing plugin methods.

```javascript
$('#bobbograph').bobbograph( data, {
	duration: 1000,
	easing_method: $.easing.easeOutBounce
} );
```

**duration**: The duration of the animation in milliseconds.  
**easing_method**: A custom easing method (following the format of jQuery's easing plugin).  
**callback**:  A callback function to be fired when the animation has completed.

## Graph Smoothing

There are a number of tools provided for smoothing out your graph and making it more visually appealing.  The first is simply a boolean property called **smooth_graph** that tells the graph to use a curved line between points to make it look less jagged.

```javascript
$('#bobbograph').bobbograph( data, {
	smooth_graph: true,
	smoothing_method: $.easing.easeInOutQuad,
	peaks_and_valleys: true
} );
```

**smooth_graph**:  Boolean value that tells Bobbograph to use curves between points rather than straight lines.  
**smoothing_method**:  This will not be useful for the vast majority of cases.  This allows you to pass your own function (following the structure used by jQuery's easing plugin) to handle the smoothing between points.  
**peaks_and_valleys**:  This will ignore all points in between the peaks and valleys of your graph to give a smoother graph.

## Data Smoothing

Along with smoothing out the graph's visuals, you are given a number of tools to smooth the data itself.

```javascript
$('#bobbograph').bobbograph( data, {
	normal_range: 2,
	max_num_points: 200
} );
```

**normal_range**:  A number used to determine the range of normalization performed on each point.  This method will use a moving average to normalize all points in the graph based on the range provided.  
**max_num_points**:  The maximum number of points you would like to be rendered.  When set, this will average points together to compress your data down within the maximum number of points.

## Dividers

You can add vertical dividers to your line graph by using the dividers property.  The structure for this property is as follows:

```javascript
$('#bobbograph').bobbograph( data, {
	dividers: [
		{ count: 25, line_width: 0.5 },
		{ count: 5, line_width: 1.5 }
	],
} );
```

**count**:  The count specifies how many dividers you would like to display within the graph area.  
**line_width**:  The thickness of the dividing lines.

## Miscellaneous

**percent**:  The percentage of the graph that you would like to display.

Public Methods
--------------

**get_y_at( x:Number )**:  This method returns the point for the requested x value in the format ```{ x: 0, y: 0 }```  
**get_high*point()**:  This method returns the point for the greatest y value in the format ```{ x: 0, y: 0 }```