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
