(function() {
    'use strict';

    function RbiCtl($rootScope, $scope, $state) {
      var vm = this;
    }

    RbiCtl.$inject = ['$rootScope', '$scope', '$state' ];

    angular.module('app')
      .controller('RbiCtl', RbiCtl);
})();
