define(['angular', 'uibootstrap'], function (angular, uiBootstrap) {
  var app = angular.module('myApp', ['ui.bootstrap']);

  app.init = function () {
    angular.bootstrap(document, ['myApp']);
  };
  
  return app;
});
