var lurchApp = angular.module('lurchApp', ['ngRoute']);

lurchApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/plugins', {
    templateUrl: 'views/manage_plugins.html'
  });

  $locationProvider.html5Mode(true);
}]);
