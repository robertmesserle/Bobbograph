var app = angular.module('BobbographSite', [ 'ngRoute' ]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'HomeCtrl'
  }).when('/api', {
    templateUrl: 'api.html',
    controller: 'APICtrl'
  }).when('/demo', {
    templateUrl: 'demo.html',
    controller: 'DemoCtrl'
  }).otherwise({
    redirectTo: '/'
  });
}]);

app.run(function ($templateCache, $http) {
  $http.get('api.html', { cache: $templateCache });
  $http.get('demo.html', { cache: $templateCache });
});

app.controller('NavCtrl', function ($scope, $location) {
  $scope.isActive = function (path) {
    return path === $location.path();
  };
});

app.controller('HomeCtrl', function () {
  var data = [ 1, 2, 1, 3, 1, 5, 1, 3, 1, 2, 1 ],
      options = {
        line:  { width: 10, smooth: true, fill: 'white' },
        fill:  { gradient: [ 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0)' ], vertical: true },
        xAxis: { increment: 2 },
        yAxis: { increment: 2 }
      };
  new Bobbograph( '#wrapper', data, options )
});

app.controller('APICtrl', function () {});

app.controller('DemoCtrl', function ($scope) {
  $scope.data = '1, 5, 1, 2, 1, 3, 2';
  $scope.options = {
    height: 300,
    line: { width: 10, smooth: true, fill: '#b34d5e' },
    xAxis: { increment: 2 },
    yAxis: { increment: 2 }
  };
  $scope.bevel = false;
  $scope.bevelOptions = { shine: 0.35, shadow: 0.15, smooth: false };
  $scope.getOptions = function () {
    var options = angular.extend({}, $scope.options);
    if ($scope.bevel) {
      options.bevel = $scope.bevelOptions;
    }
    return options;
  };
  $scope.graphData = function () {
    return { points: $scope.data, options: $scope.getOptions(), bevel: $scope.bevel ? $scope.bevelOptions : false }
  };
  $scope.codeSample = function () {
    return 'new Bobbograph( $element, ' + JSON.stringify( $scope.data ) + ', ' + JSON.stringify( $scope.getOptions(), null, 2 ) + ' );'
  };
});

app.directive('rmGraph', function () {
  function parseData (str) {
    var arr = str.split( /, */ ), len = arr.length;
    while (len--) {
      if (isNaN(arr[len])) return false;
      if (arr[len] === '') return false;
      arr[len] = parseFloat(arr[len]);
    }
    return arr;
  }
  function draw (data, $element) {
    var points = parseData(data.points);
    if (!points) return;
    new Bobbograph($element.empty(), points, data.options);
  }
  return function ($scope, $element, $attrs) {
    $scope.$watch($attrs.rmGraph, function (data) {
      draw(data, $element);
    }, true);
  };
});

app.directive('rmCode', function () {
  return function ($scope, $element, $attrs) {
    if ($attrs.rmCode !== 'rm-code') {
      $scope.$watch($attrs.rmCode, function (code) {
        $element.text(code);
        hljs.highlightBlock($element[0]);
      });
    } else {
      hljs.highlightBlock($element[0]);
    }
  };
});

app.directive('rmAffix', function ($window) {
  var body = document.body,
      win = document.defaultView,
      docElem = document.documentElement,
      isBoxModel = (function () {
        var box = document.createElement('div'),
            isBoxModel;
        box.style.paddingLeft = box.style.width = "1px";
        body.appendChild(box);
        isBoxModel = box.offsetWidth == 2;
        body.removeChild(box);
        return isBoxModel;
      })();
  function getTop (element) {
    var box = element.getBoundingClientRect(),
        clientTop  = docElem.clientTop  || body.clientTop  || 0,
        scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop || body.scrollTop;
    return box.top + scrollTop - clientTop;
  }
  return function ($scope, $element, $attrs) {
    var offset = $scope.$eval($attrs.rmAffix),
        elemTop = getTop($element[0]),
        $links = $element.find('li'),
        linkTops = [];
    angular.forEach($links, function ($link) {
      var $a = angular.element($link).find('a'),
          href = $a.attr('href').substr(1),
          target = document.getElementById(href),
          elemTop = getTop(target);
      linkTops.push(elemTop);
      $a.on('click', function (event) {
        window.scrollTo(0, elemTop - offset);
        event.preventDefault();
      });
    });
    angular.element($window).on('scroll', function (event) {
      var top = window.pageYOffset,
          index;
      if (top > elemTop - offset) $element.addClass('affix');
      else $element.removeClass('affix');
      //-- remove selected class from all links
      $links.removeClass('active');
      //-- find the closest element
      for (index = 1; index < linkTops.length; index++) {
        if (linkTops[index] - 100 > top) break;
      }
      angular.element($links[index - 1]).addClass('active');
    });
  };
});
