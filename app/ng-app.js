var lurchApp = angular.module('lurchApp', ['ngRoute']);

lurchApp.config(['$routeProvider', '$locationProvider', '$compileProvider', function($routeProvider, $locationProvider, $compileProvider) {
  $routeProvider
    .when('/plugins', {
      templateUrl: 'views/manage-plugins.html'
    })
    .when('/projects', {
      templateUrl: 'views/manage-projects.html'
    })
    .when('/projects/:projectId', {
      templateUrl: 'views/manage-project.html'
    })
    .when('/add-project', {
      templateUrl: 'views/add-project.html'
    })
    .otherwise({
      redirectTo: '/projects'
    });

  $locationProvider.html5Mode(true);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|app):/);
}]);
