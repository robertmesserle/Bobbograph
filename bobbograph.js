/* Bobbograph v2.0.0 by Robert Messerle / http://github.com/robertmesserle/Bobbograph.git */
(function ( global ) {
var Canvas;

Canvas = (function() {
  function Canvas() {}

  Canvas.prototype.scaleX = function(x) {
    return this.options.padding.left + x;
  };

  Canvas.prototype.scaleY = function(y) {
    return this.options.usableHeight - y + this.options.padding.top;
  };

  Canvas.prototype.begin = function() {
    this["continue"] = false;
    return this.context.beginPath();
  };

  Canvas.prototype.close = function() {
    this.context.closePath();
    return this["continue"] = false;
  };

  Canvas.prototype.line = function(point) {
    var left, top;
    left = this.scaleX(point.x);
    top = this.scaleY(point.y);
    if (this["continue"]) {
      return this.context.lineTo(left, top);
    } else {
      this.context.moveTo(left, top);
      return this["continue"] = true;
    }
  };

  Canvas.prototype.arc = function(point, radius, angle1, angle2, ccw) {
    var left, top;
    left = this.scaleX(point.x);
    top = this.scaleY(point.y);
    return this.context.arc(left, top, radius, -angle1, -angle2, ccw);
  };

  Canvas.prototype.stroke = function(color) {
    if (color) {
      this.context.strokeStyle = color;
    }
    return this.context.stroke();
  };

  Canvas.prototype.fill = function(color) {
    if (color) {
      this.context.fillStyle = color;
    }
    return this.context.fill();
  };

  return Canvas;

})();

var Animator;

Animator = (function() {
  function Animator() {}

  return Animator;

})();

var Bobbograph;

Bobbograph = (function() {
  function Bobbograph(id, data, options) {
    this.element = document.getElementById(id);
    this.options = new Options(options);
    this.context = this.getContext(this.element);
    this.data = new Data(data, this.options);
    if (this.options.line.smooth) {
      new CurvedRender(this.data.pixels, this.context, this.options);
    } else {
      new LinearRender(this.data.points, this.context, this.options);
    }
    this.xAxis = new XAxis(this.options.xAxis, this.element, this.options);
  }

  Bobbograph.prototype.getContext = function(element) {
    var canvas, context;
    canvas = document.createElement('canvas');
    canvas.setAttribute('height', this.options.height);
    canvas.setAttribute('width', this.options.width);
    element.appendChild(canvas);
    return context = canvas.getContext('2d');
  };

  return Bobbograph;

})();

var CurvedRender,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CurvedRender = (function(_super) {
  __extends(CurvedRender, _super);

  function CurvedRender(pixels, context, options) {
    this.pixels = pixels;
    this.context = context;
    this.options = options;
    this.renderSolid(this.pixels, this.options.line.width, this.options.line.color);
  }

  CurvedRender.prototype.renderLine = function(pixels, offset, angleOffset) {
    var index, next, pixel, prev, _i, _len, _results;
    _results = [];
    for (index = _i = 0, _len = pixels.length; _i < _len; index = ++_i) {
      pixel = pixels[index];
      prev = pixels[index - 1];
      next = pixels[index + 1];
      _results.push(this.line(pixel.offsetPoint(prev, next, offset, angleOffset)));
    }
    return _results;
  };

  CurvedRender.prototype.renderCap = function(point, right, offset) {
    var angle;
    angle = Math.PI / 2;
    if (right) {
      return this.arc(point, offset, angle, -angle);
    } else {
      return this.arc(point, offset, -angle, angle);
    }
  };

  CurvedRender.prototype.renderSolid = function(pixels, lineWidth, color) {
    var angle, offset;
    offset = lineWidth / 2;
    angle = Math.PI / 2;
    this.begin();
    this.renderLine(pixels, offset, angle);
    this.renderCap(pixels[pixels.length - 1], true, offset);
    this.renderLine(pixels.slice().reverse(), offset, angle);
    this.renderCap(pixels[0], false, offset);
    this.close();
    return this.fill(color);
  };

  return CurvedRender;

})(Canvas);

var Data;

Data = (function() {
  function Data(data, options) {
    this.options = options;
    this.data = this.formatData(data);
    this.stats = new Stats(this.data);
    this.points = this.getPoints(this.data, this.options, this.stats);
    this.pixels = this.getPixels(this.points, this.options.usableWidth, this.options.line.smooth);
  }

  Data.prototype.scalePoint = function(val, min, delta, scale) {
    var percent, scaled, scoped;
    scoped = val - min;
    percent = scoped / delta;
    return scaled = percent * scale;
  };

  Data.prototype.getPoints = function(data, options, stats) {
    var dx, dy, point, usableHeight, usableWidth, x, xmin, y, ymin, _i, _len, _results;
    usableWidth = options.usableWidth, usableHeight = options.usableHeight;
    xmin = stats.xmin, ymin = stats.ymin, dx = stats.dx, dy = stats.dy;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      point = data[_i];
      x = this.scalePoint(point.x, xmin, dx, usableWidth);
      y = this.scalePoint(point.y, ymin, dy, usableHeight);
      _results.push(new Point(x, y));
    }
    return _results;
  };

  Data.prototype.sortMethod = function(a, b) {
    return a.x - b.x;
  };

  Data.prototype.formatData = function(data) {
    var index, points, val, _i, _len, _results;
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
        for (index = _j = _ref = Math.round(lastPoint.x), _ref1 = Math.round(point.x); _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; index = _ref <= _ref1 ? ++_j : --_j) {
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

var LinearRender,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

LinearRender = (function(_super) {
  __extends(LinearRender, _super);

  function LinearRender(points, context, options) {
    this.points = points;
    this.context = context;
    this.options = options;
    this.renderSolid(this.points, this.options.line.width, this.options.line.color);
  }

  LinearRender.prototype.getSegments = function(points, offset) {
    var index, _i, _ref, _results;
    _results = [];
    for (index = _i = 1, _ref = points.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; index = 1 <= _ref ? ++_i : --_i) {
      _results.push(new Segment(points[index - 1], points[index], offset));
    }
    return _results;
  };

  LinearRender.prototype.renderLine = function(points, offset) {
    var index, next, reverse, s1, s2, segment, segments, _i, _j, _len, _len1, _results;
    segments = this.getSegments(points, offset);
    for (index = _i = 0, _len = segments.length; _i < _len; index = ++_i) {
      segment = segments[index];
      next = segments[index + 1];
      if (!index) {
        this.line(segment.corner1);
      }
      if (next) {
        if (segment.angle > next.angle) {
          this.line(segment.corner2);
          this.arc(next.p1, offset, segment.topAngle, next.topAngle);
        } else {
          s1 = new Segment(segment.corner1, segment.corner2, 0);
          s2 = new Segment(next.corner1, next.corner2, 0);
          this.line(s1.intersects(s2));
        }
      } else {
        this.arc(segment.p2, offset, segment.topAngle, segment.bottomAngle);
      }
    }
    reverse = segments.slice().reverse();
    _results = [];
    for (index = _j = 0, _len1 = reverse.length; _j < _len1; index = ++_j) {
      segment = reverse[index];
      next = reverse[index + 1];
      if (next) {
        if (segment.angle > next.angle) {
          this.line(segment.corner4);
          _results.push(this.arc(next.p2, offset, segment.bottomAngle, next.bottomAngle));
        } else {
          s1 = new Segment(segment.corner3, segment.corner4, 0);
          s2 = new Segment(next.corner3, next.corner4, 0);
          _results.push(this.line(s1.intersects(s2)));
        }
      } else {
        _results.push(this.arc(segment.p1, offset, segment.bottomAngle, segment.topAngle));
      }
    }
    return _results;
  };

  LinearRender.prototype.renderSolid = function(points, lineWidth, color) {
    var offset;
    offset = lineWidth / 2;
    this.begin();
    this.renderLine(points, offset, true);
    this.close();
    return this.fill(color);
  };

  return LinearRender;

})(Canvas);

var Options;

Options = (function() {
  Options.prototype.height = 300;

  Options.prototype.width = 600;

  function Options(options) {
    var key, value;
    if (options == null) {
      options = {};
    }
    for (key in options) {
      value = options[key];
      this[key] = value;
    }
    this.line = new LineOptions(this.line);
    this.padding = new PaddingOptions(this.padding, this.line.width);
    this.xAxis = new AxisLineOptions(this.xAxis);
    this.yAxis = new AxisLineOptions(this.yAxis);
    this.usableWidth = this.width - this.padding.left - this.padding.right;
    this.usableHeight = this.height - this.padding.top - this.padding.bottom;
  }

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

  Point.prototype.offsetPoint = function(prev, next, offset, angleOffset) {
    var angle, perp, point;
    if (prev == null) {
      prev = this;
    }
    if (next == null) {
      next = this;
    }
    angle = Trig.getAngleFromPoints(prev, next);
    perp = angle + angleOffset;
    return point = Trig.getPointFromAngle(this, perp, offset);
  };

  return Point;

})();

var Segment;

Segment = (function() {
  function Segment(p1, p2, offset) {
    this.p1 = p1;
    this.p2 = p2;
    this.offset = offset;
    this.angle = this.reduceAngle(Trig.getAngleFromPoints(this.p1, this.p2));
    this.slope = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
    this.yint = this.p1.y - this.slope * this.p1.x;
    this.topAngle = this.angle + Trig.rad(90);
    this.bottomAngle = this.angle - Trig.rad(90);
    this.corner1 = Trig.getPointFromAngle(this.p1, this.topAngle, this.offset);
    this.corner2 = Trig.getPointFromAngle(this.p2, this.topAngle, this.offset);
    this.corner3 = Trig.getPointFromAngle(this.p2, this.bottomAngle, this.offset);
    this.corner4 = Trig.getPointFromAngle(this.p1, this.bottomAngle, this.offset);
  }

  Segment.prototype.reduceAngle = function(angle) {
    while (angle > Math.PI) {
      angle -= 2 * Math.PI;
    }
    return angle;
  };

  Segment.prototype.intersects = function(segment) {
    var x, y;
    x = (segment.yint - this.yint) / (this.slope - segment.slope);
    y = this.slope * x + this.yint;
    return new Point(x, y);
  };

  return Segment;

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
    return distance = Math.sqrtdx * dx + dy * dy;
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

var XAxis;

XAxis = (function() {
  function XAxis(axis, wrapper, options) {
    this.axis = axis;
    this.wrapper = wrapper;
    this.options = options;
  }

  return XAxis;

})();

var AxisLineOptions;

AxisLineOptions = (function() {
  AxisLineOptions.prototype.increment = 0;

  function AxisLineOptions(axis) {
    var key, value;
    if (axis == null) {
      axis = {};
    }
    for (key in axis) {
      value = axis[key];
      this[key] = value;
    }
  }

  return AxisLineOptions;

})();

var LineOptions;

LineOptions = (function() {
  LineOptions.prototype.width = 1;

  LineOptions.prototype.color = '#000';

  LineOptions.prototype.smooth = false;

  function LineOptions(line) {
    var key, value;
    if (line == null) {
      line = {};
    }
    for (key in line) {
      value = line[key];
      this[key] = value;
    }
  }

  return LineOptions;

})();

var PaddingOptions;

PaddingOptions = (function() {
  PaddingOptions.prototype.top = null;

  PaddingOptions.prototype.bottom = null;

  PaddingOptions.prototype.left = null;

  PaddingOptions.prototype.right = null;

  PaddingOptions.prototype.x = null;

  PaddingOptions.prototype.y = null;

  function PaddingOptions(padding, lineWidth) {
    if (padding == null) {
      padding = {};
    }
    if (lineWidth == null) {
      lineWidth = 0;
    }
    this.size = padding.size || lineWidth;
    this.x = padding.x || this.size;
    this.top = padding.top || this.x;
    this.bottom = padding.top || this.x;
    this.y = padding.y || this.size;
    this.left = padding.left || this.y;
    this.right = padding.right || this.y;
  }

  return PaddingOptions;

})();

global.Bobbograph=Bobbograph;
})(this);