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

* height
  > The height of the canvas element in pixels.
* width
  > The width of the canvas element in pixels.