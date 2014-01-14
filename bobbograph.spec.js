( function ( root ) {
var Animator;

Animator = (function() {
  function Animator() {}

  return Animator;

})();

var Bobbograph;

Bobbograph = (function() {
  function Bobbograph() {}

  return Bobbograph;

})();

var Data;

Data = (function() {
  function Data() {}

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