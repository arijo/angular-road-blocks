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
