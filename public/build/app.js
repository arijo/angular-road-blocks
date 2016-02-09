(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ui.bootstrap']);
    app.config(function($stateProvider, $urlRouterProvider) {

      var baseUrl = 'scripts/app/templates';
      $stateProvider
        .state('rbi', {
          abstract: true,
          controller: 'RbiCtl as rbi',
          templateUrl: baseUrl + '/rbi.html',
        })
        .state('rbi.dashboard', {
          views: {
            'region': {
              templateUrl: baseUrl + '/rbi/region.html',
              controller: 'RegionCtl as region'
            },
            'road': {
              templateUrl: baseUrl + '/rbi/road.html',
              controller: 'RoadCtl as road'
            },
            'work': {
              templateUrl: baseUrl + '/rbi/work.html',
              controller: 'WorkCtl as work'
            }
          }
        })
    });

    app.run(function($state) {
      $state.go('rbi.dashboard');
    });

})();

},{}],2:[function(require,module,exports){
(function() {
    'use strict';

    function RbiCtl($rootScope, $scope, $state) {
      var vm = this;
    }

    RbiCtl.$inject = ['$rootScope', '$scope', '$state' ];

    angular.module('app')
      .controller('RbiCtl', RbiCtl);
})();

},{}],3:[function(require,module,exports){
(function() {
    'use strict';

    function RegionCtl($rootScope, $scope, $state, $work) {
      var vm = this;

      vm.select = function($item, $model, $label, $event) {
        $rootScope.$emit('select', {chars: $item, type: 'Region'}); 
      }

      vm.getRegion = function(chars) {
        return $work.search(chars, 'Region')
          .then(function(response){
            // labels
            return response.map(function(item) {
              return item.local_authority;
            })
            // uniques
            .filter(function(item, idx, data) {
              return data.indexOf(item) === idx; 
            });
          });
      }
    }

    RegionCtl.$inject = ['$rootScope', '$scope', '$state', '$work' ];

    angular.module('app')
      .controller('RegionCtl', RegionCtl);
})();

},{}],4:[function(require,module,exports){
(function() {
    'use strict';

    function RoadCtl($rootScope, $scope, $state, $work) {
      var vm = this;

      vm.select = function($item, $model, $label, $event) {
        $rootScope.$emit('select', {chars: $item, type: 'Road'}); 
      }

      vm.getRoad = function(chars) {
        return $work.search(chars, 'Road')
          .then(function(response){
            // labels
            return response.map(function(item) {
              return item.road;
            })
            // uniques
            .filter(function(item, idx, data) {
              return data.indexOf(item) === idx; 
            });
          });
      }
    }

    RoadCtl.$inject = ['$rootScope', '$scope', '$state', '$work' ];

    angular.module('app')
      .controller('RoadCtl', RoadCtl);
})();

},{}],5:[function(require,module,exports){
(function() {
    'use strict';

    function WorkCtl($rootScope, $scope, $state, $work) {
      var vm = this;
      $rootScope.$on('select', function(ev, filter) {
        $work.search(filter.chars, filter.type).then(function(response){
          vm.entries = response;
        });
      });
    }

    WorkCtl.$inject = ['$rootScope', '$scope', '$state', '$work'];

    angular.module('app')
      .controller('WorkCtl', WorkCtl);
})();

},{}],6:[function(require,module,exports){
(function() {
    'use strict';

    var Ajax = require('./work/ajax.js');

    var filters = [{
      type: 'Region',
      chars: ''
    },{
      type: 'Road',
      chars: ''
    }];

    function get(type) {
      var filter;
      filters.forEach(function(f) {
        if(f.type === type) {
          filter = f;
        }
      });
      return filter;
    }

    function $work($q, $http) {
      var ajax = new Ajax($q, $http);
      return {
        search: function(chars, type) {
          if(!type) {
            return ajax.fetch(filters); 
          }
          var filter = get(type);
          filter.chars = chars;
          if(!chars) {
            filter.chars = '';
          }
          return ajax.fetch(filters); 
        }
      }
    }

    $work.$inject = ['$q','$http'];

    angular.module('app')
      .factory('$work', $work);
})();

},{"./work/ajax.js":7}],7:[function(require,module,exports){
function Ajax($q, $http) {
  this.$q = $q;
  this.$http = $http;
}

Ajax.fn = Ajax.prototype;

Ajax.fn.fetch = function(filters) {
  var protocol = 'http://';
  var hostname = 'localhost:30000/work.json';
  var url = protocol + hostname;
  var deferred = this.$q.defer();

  this.$http({
    method: 'GET',
    url: url,
    params: {filters: JSON.stringify(filters)}
  })
  .success(function(response) {
    deferred.resolve(response);
  })
  .error(function(data, status, headers, config) {
    deferred.reject('ERROR LOADING BUNDLES FROM THE REMOTE API');
  });
  
  return deferred.promise; 
}

module.exports = Ajax;


},{}],8:[function(require,module,exports){
require("./app.js");
require("./app/factories/work.js");
require("./app/controllers/rbi.js");
require("./app/controllers/rbi/region.js");
require("./app/controllers/rbi/road.js");
require("./app/controllers/rbi/work.js");


},{"./app.js":1,"./app/controllers/rbi.js":2,"./app/controllers/rbi/region.js":3,"./app/controllers/rbi/road.js":4,"./app/controllers/rbi/work.js":5,"./app/factories/work.js":6}]},{},[8]);
