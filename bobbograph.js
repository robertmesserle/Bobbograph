/*! Bobbograph (Alpha) by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
/*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */

( function ( root ) {
var Animator;

Animator = (function() {
  function Animator() {}

  return Animator;

})();

var Bobbograph;

Bobbograph = (function() {
  function Bobbograph(id, data, options) {
    this.options = new Options(options);
    this.context = this.getContext(id);
    this.data = new Data(data, this.options);
    new Render(this.data.pixels, this.context, this.options);
  }

  Bobbograph.prototype.getContext = function(id) {
    var canvas, context, element;
    element = document.getElementById(id);
    canvas = document.createElement('canvas');
    canvas.setAttribute('height', this.options.height);
    canvas.setAttribute('width', this.options.width);
    element.appendChild(canvas);
    return context = canvas.getContext('2d');
  };

  return Bobbograph;

})();

var Data;

Data = (function() {
  function Data(data, options) {
    this.options = options;
    this.data = this.formatData(data);
    this.stats = new Stats(this.data);
    this.points = this.getPoints(this.data, this.options, this.stats);
    this.pixels = this.getPixels(this.points, this.options.width, this.options.smoothGraph);
  }

  Data.prototype.scalePoint = function(val, min, delta, scale) {
    var percent, scaled, scoped;
    scoped = val - min;
    percent = scoped / delta;
    return scaled = percent * scale;
  };

  Data.prototype.getPoints = function(data, options, stats) {
    var dx, dy, height, point, width, x, xmin, y, ymin, _i, _len, _results;
    width = options.width, height = options.height;
    xmin = stats.xmin, ymin = stats.ymin, dx = stats.dx, dy = stats.dy;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      point = data[_i];
      x = this.scalePoint(point.x, xmin, dx, width);
      y = this.scalePoint(point.y, ymin, dy, height);
      _results.push(new Point(x, y));
    }
    return _results;
  };

  Data.prototype.formatData = function(data) {
    var index, points, sortMethod, val, _i, _len, _results;
    sortMethod = function(a, b) {
      return a.x - b.x;
    };
    if (typeof data[0] === 'number') {
      _results = [];
      for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
        val = data[index];
        _results.push(new Point(index, val));
      }
      return _results;
    } else if (data[0] instanceof Array) {
      points = (function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (index = _j = 0, _len1 = data.length; _j < _len1; index = ++_j) {
          val = data[index];
          _results1.push(new Point(val[0], val[1]));
        }
        return _results1;
      })();
      return points.sort(sortMethod);
    } else if (data[0] && (data[0].x != null) && (data[0].y != null)) {
      points = (function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (index = _j = 0, _len1 = data.length; _j < _len1; index = ++_j) {
          val = data[index];
          _results1.push(new Point(val.x, val.y));
        }
        return _results1;
      })();
      return points.sort(sortMethod);
    }
  };

  Data.prototype.getPixels = function(points, width, curve) {
    var index, lastPoint, method, pixels, point, _i, _j, _len, _ref, _ref1;
    method = curve ? Easing.curve : Easing.linear;
    pixels = new Array(width);
    for (_i = 0, _len = points.length; _i < _len; _i++) {
      point = points[_i];
      if (typeof lastPoint !== "undefined" && lastPoint !== null) {
        for (index = _j = _ref = lastPoint.x, _ref1 = point.x; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; index = _ref <= _ref1 ? ++_j : --_j) {
          pixels[index] = new Point(index, method(index - lastPoint.x, lastPoint.y, point.y - lastPoint.y, point.x - lastPoint.x));
        }
      }
      lastPoint = point;
    }
    return pixels;
  };

  return Data;

})();

var Easing;

Easing = (function() {
  function Easing() {}

  Easing.curve = function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(t, 2) + b;
    } else {
      return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
    }
  };

  Easing.linear = function(t, b, c, d) {
    return c * t / d + b;
  };

  return Easing;

})();

var Options;

Options = (function() {
  Options.prototype.height = 300;

  Options.prototype.width = 600;

  Options.prototype.bevel = false;

  Options.prototype.bevelIntensity = 1;

  Options.prototype.shineIntensity = 0.65;

  Options.prototype.shadowIntensity = 0.3;

  Options.prototype.smoothBevel = false;

  Options.prototype.lineWidth = 5;

  Options.prototype.color = '#000';

  Options.prototype.shadow = false;

  Options.prototype.fill = false;

  Options.prototype.verticalFill = false;

  Options.prototype.dashed = false;

  Options.prototype.dashSize = 5;

  Options.prototype.maxPoints = false;

  Options.prototype.peaksAndValleys = false;

  Options.prototype.verticalLineFill = false;

  Options.prototype.smoothGraph = false;

  Options.prototype.smoothingMethod = false;

  Options.prototype.normalRange = false;

  Options.prototype.animationDuration = 0;

  Options.prototype.easingMethod = false;

  Options.prototype.callback = false;

  Options.prototype.maxX = false;

  Options.prototype.maxY = false;

  Options.prototype.minX = false;

  Options.prototype.minY = false;

  Options.prototype.percent = 1;

  Options.prototype.padding = 0;

  Options.prototype.xPadding = null;

  Options.prototype.yPadding = null;

  Options.prototype.leftPadding = null;

  Options.prototype.rightPadding = null;

  Options.prototype.topPadding = null;

  Options.prototype.bottomPadding = null;

  Options.prototype.usableWidth = 600;

  Options.prototype.usableHeight = 300;

  function Options(options) {
    var key, value;
    if (options == null) {
      options = {};
    }
    for (key in options) {
      value = options[key];
      this[key] = value;
    }
    this.calculatePadding();
  }

  Options.prototype.calculatePadding = function() {
    if (this.xPadding == null) {
      this.xPadding = this.padding;
    }
    if (this.yPadding == null) {
      this.yPadding = this.padding;
    }
    if (this.leftPadding == null) {
      this.leftPadding = this.xPadding;
    }
    if (this.rightPadding == null) {
      this.rightPadding = this.xPadding;
    }
    if (this.topPadding == null) {
      this.topPadding = this.yPadding;
    }
    return this.bottomPadding != null ? this.bottomPadding : this.bottomPadding = this.yPadding;
  };

  return Options;

})();

var Point;

Point = (function() {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.getAngle = function(point) {
    var p1, p2, _ref;
    _ref = point.x > this.x ? [this, point] : [point, this], p1 = _ref[0], p2 = _ref[1];
    return Trig.getAngleFromPoints(p1, p2);
  };

  return Point;

})();

var Render;

Render = (function() {
  function Render(pixels, context, options) {
    this.pixels = pixels;
    this.context = context;
    this.options = options;
    if (this.options.dashed) {
      this.renderDashed(this.pixels, this.context, this.options.dashSize);
    } else {
      this.renderSolid(this.pixels, this.context);
    }
  }

  Render.prototype.move = function(point) {
    this.context.beginPath();
    return this.context.moveTo(point.x, point.y);
  };

  Render.prototype.line = function(point) {
    return this.context.lineTo(point.x, point.y);
  };

  Render.prototype.stroke = function() {
    return this.context.stroke();
  };

  Render.prototype.renderDashed = function(pixels, context, size) {
    var dist, index, last, move, point, _i, _len, _results;
    move = false;
    last = null;
    _results = [];
    for (index = _i = 0, _len = pixels.length; _i < _len; index = ++_i) {
      point = pixels[index];
      if (last) {
        dist = Trig.getDistanceBetweenPoints(last, point);
        if (dist > size) {
          if (!move) {
            this.renderSegment(last, point);
          }
          last = point;
          _results.push(move = !move);
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(this.move(last = point));
      }
    }
    return _results;
  };

  Render.prototype.renderSegment = function(p1, p2) {
    this.move(p1);
    this.line(p2);
    return this.stroke();
  };

  Render.prototype.renderSolid = function(pixels, context) {
    var index, _i, _ref;
    context.moveTo(0, pixels[0]);
    for (index = _i = 1, _ref = pixels.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; index = 1 <= _ref ? ++_i : --_i) {
      context.lineTo(index, pixels[index]);
    }
    return context.stroke();
  };

  return Render;

})();

var Stats;

Stats = (function() {
  function Stats(data) {
    this.getRangeData(data);
  }

  Stats.prototype.getRangeData = function(data) {
    var point, xarr, yarr;
    xarr = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        point = data[_i];
        _results.push(point.x);
      }
      return _results;
    })();
    yarr = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        point = data[_i];
        _results.push(point.y);
      }
      return _results;
    })();
    this.xmin = Math.min.apply(null, xarr);
    this.xmax = Math.max.apply(null, xarr);
    this.ymin = Math.min.apply(null, yarr);
    this.ymax = Math.max.apply(null, yarr);
    this.dx = this.xmax - this.xmin;
    return this.dy = this.ymax - this.ymin;
  };

  return Stats;

})();

var Trig;

Trig = (function() {
  function Trig() {}

  Trig.rad = function(deg) {
    return deg * Math.PI / 180;
  };

  Trig.deg = function(rad) {
    return rad * 180 / Math.PI;
  };

  Trig.getBaseAngleFromPoints = function(dx, dy) {
    var angle;
    angle = Math.atan(dy / dx);
    return Math.abs(angle);
  };

  Trig.getQuadrant = function(dx, dy) {
    if (dy >= 0) {
      if (dx >= 0) {
        return 1;
      } else {
        return 2;
      }
    } else {
      if (dx < 0) {
        return 3;
      } else {
        return 4;
      }
    }
  };

  Trig.getAngleFromPoints = function(p1, p2) {
    var baseAngle, dx, dy;
    dx = p2.x - p1.x;
    dy = p2.y - p1.y;
    baseAngle = this.getBaseAngleFromPoints(dx, dy);
    switch (this.getQuadrant(dx, dy)) {
      case 1:
        return baseAngle;
      case 2:
        return Math.PI - baseAngle;
      case 3:
        return Math.PI + baseAngle;
      case 4:
        return 2 * Math.PI - baseAngle;
    }
  };

  Trig.getDistanceBetweenPoints = function(p1, p2) {
    var distance, dx, dy;
    dx = p2.x - p1.x;
    dy = p2.y - p1.y;
    return distance = Math.sqrt(dx * dx + dy * dy);
  };

  Trig.getPointFromAngle = function(origin, angle, distance) {
    var x, y;
    x = origin.x, y = origin.y;
    if (angle === Math.PI) {
      return new Point(x - distance, y);
    } else if (angle === Math.PI / 2) {
      return new Point(x, y + distance);
    } else if (angle === Math.PI * 1.5) {
      return new Point(x, y - distance);
    } else if (angle === 0) {
      return new Point(x + distance, y);
    } else {
      return new Point(Math.cos(angle) * distance + x, Math.sin(angle) * distance + y);
    }
  };

  return Trig;

})();

var Util;

Util = (function() {
  function Util() {}

  Util.excanvas = typeof G_vmlCanvasManager !== 'undefined';

  Util.getProperty = function(obj, namespace, notFoundValue) {
    var part, _i, _len, _ref;
    if (obj == null) {
      return notFoundValue;
    }
    _ref = namespace.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      obj = obj[part];
      if (obj == null) {
        return notFoundValue;
      }
    }
    return obj;
  };

  Util.minMax = function(num, min, max) {
    if (num > max) {
      return max;
    } else if (num < min) {
      return min;
    } else {
      return num;
    }
  };

  return Util;

})();
if ( typeof define === 'function' && define.amd ) define( function () { return Bobbograph } )
else root.Bobbograph = Bobbograph
} )( this )