/*! Bobbograph v3.0 by Robert Messerle  |  https://github.com/robertmesserle/Bobbograph */
/*! This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/. */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Axis;

Axis = (function() {
  function Axis(axis, wrapper, options, data) {
    var _ref;
    this.axis = axis;
    this.wrapper = wrapper;
    this.options = options;
    this.data = data;
    _ref = this.getLimits(this.data.stats), this.min = _ref[0], this.max = _ref[1];
    this.lines = this.getLineData();
    this.wrapper.appendChild(this.renderLines());
  }

  Axis.prototype.getLineData = function(increment) {
    var i, _i, _ref, _ref1, _results;
    if (increment == null) {
      increment = this.axis.increment;
    }
    _results = [];
    for (i = _i = _ref = this.getFirstLine(this.min, increment), _ref1 = this.max; increment > 0 ? _i <= _ref1 : _i >= _ref1; i = _i += increment) {
      _results.push({
        number: i,
        pos: this.scalePoint(i) + 'px'
      });
    }
    return _results;
  };

  Axis.prototype.renderLines = function() {
    var axis, elem, line, text, _i, _len, _ref;
    axis = document.createElement('ul');
    axis.className = "" + this.clss + " bbg-axis";
    _ref = this.lines.slice().reverse();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      elem = document.createElement('li');
      elem.style[this.prop] = line.pos;
      text = document.createElement('div');
      text.innerText = line.number;
      elem.appendChild(text);
      axis.appendChild(elem);
    }
    return axis;
  };

  Axis.prototype.getFirstLine = function(min, increment) {
    var rem;
    if (min == null) {
      min = this.min;
    }
    if (increment == null) {
      increment = this.axis.increment;
    }
    if (min > 0) {
      rem = min % increment;
      return increment - rem + min;
    } else if (min < 0) {
      rem = min % increment;
      if (rem) {
        return min - rem;
      } else {
        return min + increment - rem;
      }
    } else {
      return increment;
    }
  };

  return Axis;

})();

module.exports = Axis;


},{}],2:[function(require,module,exports){
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

  Canvas.prototype.stroke = function(fill) {
    if (fill) {
      this.context.strokeStyle = fill;
    }
    return this.context.stroke();
  };

  Canvas.prototype.fill = function(fill) {
    if (fill) {
      this.context.fillStyle = (typeof fill.get === "function" ? fill.get(this.context) : void 0) || fill;
    }
    return this.context.fill();
  };

  return Canvas;

})();

module.exports = Canvas;


},{}],3:[function(require,module,exports){
var Bobbograph, Data, Options, Renderer, XAxis, YAxis;

Options = require('./options.coffee');

Data = require('./data.coffee');

Renderer = require('./renderer.coffee');

XAxis = require('./x-axis.coffee');

YAxis = require('./y-axis.coffee');

Bobbograph = (function() {
  Bobbograph.prototype.clss = 'bbg-container';

  function Bobbograph(id, data, options) {
    this.element = this.getElement(id);
    this.options = new Options(options, this.element);
    this.container = this.getContainer();
    this.element.appendChild(this.container);
    this.canvas = this.getCanvas();
    this.container.appendChild(this.canvas);
    this.context = this.getContext();
    this.data = new Data(data, this.options);
    this.xAxis = new XAxis(this.options.xAxis, this.container, this.options, this.data);
    this.yAxis = new YAxis(this.options.yAxis, this.container, this.options, this.data);
    new Renderer(this.data.pixels, this.context, this.options, this.options.line.smooth);
  }

  Bobbograph.prototype.getContainer = function() {
    var container;
    container = document.createElement('div');
    container.className = this.clss;
    return container;
  };

  Bobbograph.prototype.getElement = function(id) {
    if (typeof id === 'string') {
      return document.getElementById(id) || document.querySelector(id);
    } else {
      return id[0] || id;
    }
  };

  Bobbograph.prototype.getCanvas = function() {
    var canvas;
    canvas = document.createElement('canvas');
    canvas.setAttribute('height', this.options.height);
    canvas.setAttribute('width', this.options.width);
    return canvas;
  };

  Bobbograph.prototype.getContext = function() {
    var context;
    return context = this.canvas.getContext('2d');
  };

  return Bobbograph;

})();

if (typeof window !== "undefined" && window !== null) {
  window.Bobbograph = Bobbograph;
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = Bobbograph;
}


},{"./data.coffee":4,"./options.coffee":6,"./renderer.coffee":14,"./x-axis.coffee":17,"./y-axis.coffee":18}],4:[function(require,module,exports){
var Data, Easing, Point, Stats;

Stats = require('./stats.coffee');

Point = require('./point.coffee');

Easing = require('./easing.coffee');

Data = (function() {
  function Data(data, options) {
    var _ref;
    this.options = options;
    this.data = this.formatData(data);
    this.stats = new Stats(this.data);
    this.points = this.getPoints();
    this.pixels = this.getPixels(this.points, this.options.usableWidth, (_ref = this.options.line) != null ? _ref.smooth : void 0);
  }

  Data.prototype.scalePoint = function(val, min, delta, scale) {
    var percent, scaled, scoped;
    scoped = val - min;
    percent = scoped / delta;
    return scaled = percent * scale;
  };

  Data.prototype.getPoints = function() {
    var dx, dy, index, point, usableHeight, usableWidth, x, xmin, y, ymin, _i, _len, _ref, _ref1, _ref2, _results;
    _ref = this.options, usableWidth = _ref.usableWidth, usableHeight = _ref.usableHeight;
    _ref1 = this.stats, xmin = _ref1.xmin, ymin = _ref1.ymin, dx = _ref1.dx, dy = _ref1.dy;
    _ref2 = this.data;
    _results = [];
    for (index = _i = 0, _len = _ref2.length; _i < _len; index = ++_i) {
      point = _ref2[index];
      if (!(this.isVertex(this.data, index, this.options.data.vertex))) {
        continue;
      }
      x = this.scalePoint(point.x, xmin, dx, usableWidth);
      y = this.scalePoint(point.y, ymin, dy, usableHeight);
      _results.push(new Point(x, y));
    }
    return _results;
  };

  Data.prototype.isVertex = function(data, index, vertex) {
    var next, point, prev, _ref, _ref1;
    if (!vertex) {
      return true;
    }
    point = data[index].y;
    prev = (_ref = data[index - 1]) != null ? _ref.y : void 0;
    next = (_ref1 = data[index + 1]) != null ? _ref1.y : void 0;
    if (!((prev != null) && (next != null))) {
      return true;
    }
    if (prev > point && next > point) {
      return true;
    }
    if (prev < point && next < point) {
      return true;
    }
    if (prev === point && next !== point) {
      return true;
    }
    if (prev !== point && next === point) {
      return true;
    }
    return false;
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
      return points.sort(this.sortMethod);
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
      return points.sort(this.sortMethod);
    }
  };

  Data.prototype.getPixels = function(points, width, curve) {
    var index, lastPoint, method, pixels, point, y, _i, _j, _len, _ref, _ref1;
    method = curve ? Easing.curve : Easing.linear;
    pixels = new Array(width);
    for (_i = 0, _len = points.length; _i < _len; _i++) {
      point = points[_i];
      if (typeof lastPoint !== "undefined" && lastPoint !== null) {
        for (index = _j = _ref = Math.round(lastPoint.x), _ref1 = Math.round(point.x); _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; index = _ref <= _ref1 ? ++_j : --_j) {
          y = method(index - lastPoint.x, lastPoint.y, point.y - lastPoint.y, point.x - lastPoint.x);
          pixels[index] = new Point(index, y);
        }
      }
      lastPoint = point;
    }
    return pixels;
  };

  return Data;

})();

module.exports = Data;


},{"./easing.coffee":5,"./point.coffee":13,"./stats.coffee":15}],5:[function(require,module,exports){
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

module.exports = Easing;


},{}],6:[function(require,module,exports){
var AxisLineOptions, BevelOptions, DataOptions, LineOptions, Options, PaddingOptions;

LineOptions = require('./options/line.coffee');

PaddingOptions = require('./options/padding.coffee');

AxisLineOptions = require('./options/axis-line.coffee');

BevelOptions = require('./options/bevel.coffee');

DataOptions = require('./options/data.coffee');

Options = (function() {
  Options.prototype.height = 300;

  Options.prototype.width = 600;

  function Options(options, element) {
    var key, value;
    if (options == null) {
      options = {};
    }
    if (element) {
      this.height = this.getSize('height', element);
      this.width = this.getSize('width', element);
    }
    for (key in options) {
      value = options[key];
      this[key] = value;
    }
    this.line = new LineOptions(this.line, this);
    this.padding = new PaddingOptions(this.padding, this.line.width);
    this.xAxis = new AxisLineOptions(this.xAxis);
    this.yAxis = new AxisLineOptions(this.yAxis);
    if (this.bevel != null) {
      this.bevel = new BevelOptions(this.bevel);
    }
    this.usableWidth = this.width - this.padding.left - this.padding.right;
    this.usableHeight = this.height - this.padding.top - this.padding.bottom;
    this.data = new DataOptions(this.data, this);
  }

  Options.prototype.adjustSize = function(elem, name, extra, styles) {
    var cssExpand, i, index, side, value, _i;
    cssExpand = ['top', 'right', 'bottom', 'left'];
    index = extra === 'border' ? 4 : name === 'width' ? 1 : 0;
    value = 0;
    for (i = _i = index; _i <= 3; i = _i += 2) {
      side = cssExpand[i];
      if (extra === 'content') {
        value -= parseInt(styles.getPropertyValue("padding-" + side), 10) || 0;
      }
      value -= parseInt(styles.getPropertyValue("border-" + side + "-width"), 10) || 0;
    }
    console.log('adjustedValue', value);
    return value;
  };

  Options.prototype.getSize = function(name, elem) {
    var extra, str, styles, value;
    str = name.charAt(0).toUpperCase() + name.substr(1);
    value = elem["offset" + str];
    styles = getComputedStyle(elem);
    extra = elem.style.boxSizing === 'border-box' ? 'border' : 'content';
    return value + this.adjustSize(elem, name, extra, styles);
  };

  return Options;

})();

module.exports = Options;


},{"./options/axis-line.coffee":7,"./options/bevel.coffee":8,"./options/data.coffee":9,"./options/line.coffee":11,"./options/padding.coffee":12}],7:[function(require,module,exports){
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

module.exports = AxisLineOptions;


},{}],8:[function(require,module,exports){
var BevelOptions;

BevelOptions = (function() {
  BevelOptions.prototype.shine = 0.35;

  BevelOptions.prototype.shadow = 0.15;

  BevelOptions.prototype.smooth = false;

  BevelOptions.prototype.opacity = 1;

  function BevelOptions(options) {
    var key, value;
    this.options = options;
    if (typeof options === 'object') {
      for (key in options) {
        value = options[key];
        this[key] = value;
      }
    }
  }

  BevelOptions.prototype.clone = function() {
    return new BevelOptions(this.options);
  };

  return BevelOptions;

})();

module.exports = BevelOptions;


},{}],9:[function(require,module,exports){
var DataOptions;

DataOptions = (function() {
  DataOptions.prototype.vertex = null;

  DataOptions.prototype.maxPoints = null;

  DataOptions.prototype.normalize = null;

  function DataOptions(props, options) {
    var key, value;
    if (props == null) {
      props = {};
    }
    this.vertex = options.line.smooth;
    for (key in options) {
      value = options[key];
      this[key] = value;
    }
  }

  return DataOptions;

})();

module.exports = DataOptions;


},{}],10:[function(require,module,exports){
var FillOptions;

FillOptions = (function() {
  function FillOptions(fill, options) {
    this.options = options;
    this.type = this.getType(fill);
    this.fill = (function() {
      switch (this.type) {
        case 'gradient':
          return this.parseGradient(fill);
        case 'color':
          return fill;
      }
    }).call(this);
  }

  FillOptions.prototype.getType = function(fill) {
    if (fill instanceof Array) {
      return 'gradient';
    } else {
      return 'color';
    }
  };

  FillOptions.prototype.parseGradient = function(fill) {
    var count, index, stop, _i, _len, _results;
    count = fill.length - 1;
    _results = [];
    for (index = _i = 0, _len = fill.length; _i < _len; index = ++_i) {
      stop = fill[index];
      if (typeof stop === 'string') {
        _results.push({
          color: stop,
          position: index / count
        });
      } else {
        _results.push(stop);
      }
    }
    return _results;
  };

  FillOptions.prototype.get = function(context) {
    var gradient, stop, _i, _len, _ref;
    switch (this.type) {
      case 'color':
        return this.fill;
      case 'gradient':
        gradient = context.createLinearGradient(0, 0, this.options.width, 0);
        _ref = this.fill;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          stop = _ref[_i];
          gradient.addColorStop(stop.position, stop.color);
        }
        return gradient;
    }
  };

  return FillOptions;

})();

module.exports = FillOptions;


},{}],11:[function(require,module,exports){
var FillOptions, LineOptions;

FillOptions = require('./fill.coffee');

LineOptions = (function() {
  LineOptions.prototype.width = 1;

  LineOptions.prototype.fill = '#000';

  LineOptions.prototype.smooth = false;

  function LineOptions(line, options) {
    var key, value;
    if (line == null) {
      line = {};
    }
    this.options = options;
    for (key in line) {
      value = line[key];
      this[key] = value;
    }
    this.fill = new FillOptions(this.fill, this.options);
  }

  return LineOptions;

})();

module.exports = LineOptions;


},{"./fill.coffee":10}],12:[function(require,module,exports){
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
    this.left = padding.left || this.x;
    this.right = padding.right || this.x;
    this.y = padding.y || this.size;
    this.top = padding.top || this.y;
    this.bottom = padding.top || this.y;
  }

  return PaddingOptions;

})();

module.exports = PaddingOptions;


},{}],13:[function(require,module,exports){
var Point, Trig;

Trig = require('./trig.coffee');

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
    return point = this.getPointFromAngle(perp, offset);
  };

  Point.prototype.getPointFromAngle = function(angle, distance) {
    var point;
    point = Trig.getPointFromAngle(this, angle, distance);
    return new Point(point.x, point.y);
  };

  return Point;

})();

module.exports = Point;


},{"./trig.coffee":16}],14:[function(require,module,exports){
var Canvas, CurvedRender,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Canvas = require('./canvas.coffee');

CurvedRender = (function(_super) {
  __extends(CurvedRender, _super);

  function CurvedRender(pixels, context, options) {
    var bevel, lineWidth, _i, _ref, _ref1;
    this.pixels = pixels;
    this.context = context;
    this.options = options;
    this.render(this.options.line.width, this.options.line.fill, this.options.bevel);
    if ((_ref = this.options.bevel) != null ? _ref.smooth : void 0) {
      bevel = this.options.bevel.clone();
      for (lineWidth = _i = _ref1 = this.options.line.width - 2; _i >= 2; lineWidth = _i += -2) {
        bevel.opacity /= 2;
        this.render(lineWidth, this.options.line.fill, bevel);
      }
    }
  }

  CurvedRender.prototype.render = function(lineWidth, fill, bevel) {
    this.renderSolid(this.pixels, lineWidth, fill);
    if (bevel) {
      this.renderHighlight(this.pixels, lineWidth, bevel);
      return this.renderShadow(this.pixels, lineWidth, bevel);
    }
  };

  CurvedRender.prototype.renderLine = function(pixels, offset, angleOffset) {
    var index, next, pixel, point, prev, _i, _len, _results;
    _results = [];
    for (index = _i = 0, _len = pixels.length; _i < _len; index = ++_i) {
      pixel = pixels[index];
      prev = pixels[index - 1];
      next = pixels[index + 1];
      point = pixel.offsetPoint(prev, next, offset, angleOffset);
      _results.push(this.line(point));
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

  CurvedRender.prototype.renderShadow = function(pixels, lineWidth, bevel) {
    var angle, offset, pixel, _i, _len;
    offset = lineWidth / 2;
    angle = Math.PI / 2;
    this.begin();
    for (_i = 0, _len = pixels.length; _i < _len; _i++) {
      pixel = pixels[_i];
      this.line(pixel);
    }
    this.arc(pixels[pixels.length - 1], offset, 0, -angle);
    this.renderLine(pixels.slice().reverse(), offset, angle);
    this.arc(pixels[0], offset, -angle, Math.PI);
    this.close();
    return this.fill("rgba( 0, 0, 0, " + (bevel.shadow * bevel.opacity) + " )");
  };

  CurvedRender.prototype.renderHighlight = function(pixels, lineWidth, bevel) {
    var angle, offset, pixel, _i, _len, _ref;
    offset = lineWidth / 2;
    angle = Math.PI / 2;
    this.begin();
    this.renderLine(pixels, offset, angle);
    this.arc(pixels[pixels.length - 1], offset, angle, 0);
    _ref = pixels.slice().reverse();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pixel = _ref[_i];
      this.line(pixel);
    }
    this.arc(pixels[0], offset, Math.PI, angle);
    this.close();
    return this.fill("rgba( 255, 255, 255, " + (bevel.shine * bevel.opacity) + " )");
  };

  CurvedRender.prototype.renderSolid = function(pixels, lineWidth, fill) {
    var angle, offset;
    offset = lineWidth / 2;
    angle = Math.PI / 2;
    this.begin();
    this.renderLine(pixels, offset, angle);
    this.renderCap(pixels[pixels.length - 1], true, offset);
    this.renderLine(pixels.slice().reverse(), offset, angle);
    this.renderCap(pixels[0], false, offset);
    this.close();
    return this.fill(fill);
  };

  return CurvedRender;

})(Canvas);

module.exports = CurvedRender;


},{"./canvas.coffee":2}],15:[function(require,module,exports){
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

module.exports = Stats;


},{}],16:[function(require,module,exports){
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

module.exports = Trig;


},{}],17:[function(require,module,exports){
var Axis, XAxis,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Axis = require('./axis.coffee');

XAxis = (function(_super) {
  __extends(XAxis, _super);

  function XAxis() {
    return XAxis.__super__.constructor.apply(this, arguments);
  }

  XAxis.prototype.clss = 'bbg-x-axis';

  XAxis.prototype.prop = 'left';

  XAxis.prototype.getLimits = function(stats) {
    return [stats.xmin, stats.xmax];
  };

  XAxis.prototype.scalePoint = function(value) {
    return this.data.scalePoint(value, this.min, this.max - this.min, this.options.usableWidth);
  };

  return XAxis;

})(Axis);

module.exports = XAxis;


},{"./axis.coffee":1}],18:[function(require,module,exports){
var Axis, YAxis,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Axis = require('./axis.coffee');

YAxis = (function(_super) {
  __extends(YAxis, _super);

  function YAxis() {
    return YAxis.__super__.constructor.apply(this, arguments);
  }

  YAxis.prototype.clss = 'bbg-y-axis';

  YAxis.prototype.prop = 'bottom';

  YAxis.prototype.getLimits = function(stats) {
    return [stats.ymin, stats.ymax];
  };

  YAxis.prototype.scalePoint = function(value) {
    return this.data.scalePoint(value, this.min, this.max - this.min, this.options.usableHeight);
  };

  return YAxis;

})(Axis);

module.exports = YAxis;


},{"./axis.coffee":1}]},{},[3])