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
