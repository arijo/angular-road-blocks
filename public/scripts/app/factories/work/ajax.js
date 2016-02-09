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

