module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/angular-bootstrap/ui-bootstrap.js',
      'public/build/app.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'tests/*.js'
    ]
  });
};
