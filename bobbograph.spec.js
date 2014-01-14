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
    this.stats = this.getStats(this.data);
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
    var point, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      point = data[_i];
      _results.push({
        x: this.scalePoint(point.x, stats.xmin, stats.dx, options.width),
        y: this.scalePoint(point.y, stats.ymin, stats.dy, options.height)
      });
    }
    return _results;
  };

  Data.prototype.getStats = function(data) {
    var point, stats, xarr, yarr;
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
    stats = {
      xmin: Math.min.apply(null, xarr),
      xmax: Math.max.apply(null, xarr),
      ymin: Math.min.apply(null, yarr),
      ymax: Math.max.apply(null, yarr)
    };
    stats.dx = stats.xmax - stats.xmin;
    stats.dy = stats.ymax - stats.ymin;
    return stats;
  };

  Data.prototype.formatData = function(data) {
    var index, sort, val, _i, _len, _results;
    sort = function(a, b) {
      return a.x - b.x;
    };
    if (typeof data[0] === 'number') {
      _results = [];
      for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
        val = data[index];
        _results.push({
          x: index,
          y: val
        });
      }
      return _results;
    } else if (data[0] instanceof Array) {
      return ((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (index = _j = 0, _len1 = data.length; _j < _len1; index = ++_j) {
          val = data[index];
          _results1.push({
            x: val[0],
            y: val[1]
          });
        }
        return _results1;
      })()).sort(sort);
    } else if (data[0] && (data[0].x != null) && (data[0].y != null)) {
      return data.sort(sort);
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
          pixels[index] = method(index - lastPoint.x, lastPoint.y, point.y - lastPoint.y, point.x - lastPoint.x);
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

  Render.prototype.renderDashed = function(pixels, context, size) {
    var dist, index, last, line, _i, _ref, _results;
    last = {
      x: 0,
      y: pixels[0]
    };
    context.moveTo(last.x, last.y);
    line = true;
    _results = [];
    for (index = _i = 1, _ref = pixels.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; index = 1 <= _ref ? ++_i : --_i) {
      dist = Trig.getDistanceBetweenPoints(last.x, last.y, index, pixels[index]);
      if (dist > size) {
        if (line) {
          context.lineTo(index, pixels[index]);
          context.stroke();
        } else {
          context.beginPath();
          context.moveTo(index, pixels[index]);
        }
        line = !line;
        _results.push(last = {
          x: index,
          y: pixels[index]
        });
      } else {
        _results.push(void 0);
      }
    }
    return _results;
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

  Trig.getAngleFromPoints = function(x1, y1, x2, y2) {
    var baseAngle, dx, dy;
    dx = x2 - x1;
    dy = y2 - y1;
    baseAngle = this.getBaseAngleFromPoints(dx, dy);
    if (dx > 0) {
      if (dy > 0) {
        return baseAngle;
      } else if (dy < 0) {
        return 2 * Math.PI - baseAngle;
      } else {
        return 0;
      }
    } else if (dx < 0) {
      if (dy > 0) {
        return Math.PI - baseAngle;
      } else if (dy < 0) {
        return Math.PI + baseAngle;
      } else {
        return Math.PI;
      }
    } else {
      if (dy > 0) {
        return Math.PI / 2;
      } else if (dy < 0) {
        return Math.PI * 1.5;
      } else {
        return 0;
      }
    }
  };

  Trig.getDistanceBetweenPoints = function(x1, y1, x2, y2) {
    var distance, dx, dy;
    dx = x2 - x1;
    dy = y2 - y1;
    return distance = Math.sqrt(dx * dx + dy * dy);
  };

  Trig.getPointFromAngle = function(x, y, angle, distance) {
    if (angle === Math.PI) {
      return {
        x: x - distance,
        y: y
      };
    } else if (angle === Math.PI / 2) {
      return {
        x: x,
        y: y + distance
      };
    } else if (angle === Math.PI * 1.5) {
      return {
        x: x,
        y: y - distance
      };
    } else if (angle === 0) {
      return {
        x: x + distance,
        y: y
      };
    } else {
      return {
        x: Math.cos(angle) * distance + x,
        y: Math.sin(angle) * distance + y
      };
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
  root.get = function (str) { return eval(str) };
})(this);