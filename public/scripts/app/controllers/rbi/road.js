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
