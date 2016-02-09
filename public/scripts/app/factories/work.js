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
