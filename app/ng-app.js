var lurchApp = angular.module('lurchApp', ['ngRoute']);

lurchApp.config(['$routeProvider', '$locationProvider', '$compileProvider', function($routeProvider, $locationProvider, $compileProvider) {
  $routeProvider
    .when('/plugins', {
      templateUrl: 'views/manage_plugins.html'
    })
    .when('/projects', {
      templateUrl: 'views/manage_projects.html'
    })
    .when('/projects/:projectId', {
      templateUrl: 'views/manage_project.html'
    })
    .when('/add-project', {
      templateUrl: 'views/add_project.html'
    });

  $locationProvider.html5Mode(true);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|app):/);
}]);
