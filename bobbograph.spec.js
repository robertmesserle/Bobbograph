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
    this.points = this.getPoints(data);
  }

  Data.prototype.getPoints = function(raw, options) {
    var data, dx, dy, point, scalePoint, xarr, xmax, xmin, yarr, ymax, ymin, _i, _len, _results;
    if (options == null) {
      options = this.options;
    }
    data = this.formatData(raw);
    xarr = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        point = data[_i];
        _results.push(point.x);
      }
      return _results;
    })();
    xmin = Math.min.apply(null, xarr);
    xmax = Math.max.apply(null, xarr);
    dx = xmax - xmin;
    yarr = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        point = data[_i];
        _results.push(point.y);
      }
      return _results;
    })();
    ymin = Math.min.apply(null, yarr);
    ymax = Math.max.apply(null, yarr);
    dy = ymax - ymin;
    scalePoint = function(val, min, delta, scale) {
      var percent, scaled, scoped;
      scoped = val - min;
      percent = scoped / delta;
      return scaled = percent * scale;
    };
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      point = data[_i];
      _results.push({
        x: scalePoint(point.x, xmin, dx, options.width),
        y: scalePoint(point.y, ymin, dy, options.height)
      });
    }
    return _results;
  };

  Data.prototype.formatData = function(data) {
    var index, val, _i, _j, _len, _len1, _results, _results1;
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
      _results1 = [];
      for (index = _j = 0, _len1 = data.length; _j < _len1; index = ++_j) {
        val = data[index];
        _results1.push({
          x: val[0],
          y: val[1]
        });
      }
      return _results1;
    } else if (data[0] && (data[0].x != null) && (data[0].y != null)) {
      return data;
    }
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

  Options.prototype.smoothGraph = false;

  Options.prototype.lineWidth = 5;

  Options.prototype.color = '#000';

  Options.prototype.shadow = false;

  Options.prototype.fill = false;

  Options.prototype.verticalFill = false;

  Options.prototype.maxPoints = false;

  Options.prototype.peaksAndValleys = false;

  Options.prototype.verticalLineFill = false;

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