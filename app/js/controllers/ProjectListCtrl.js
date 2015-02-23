lurchApp.controller('ProjectListCtrl', ['$scope', 'Project', function ($scope, Project) {

  // Get all projects
  Project.get().then(function(projects) {
    $scope.projects = projects;
  });

}]);
