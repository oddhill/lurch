lurchApp.controller('ProjectFormCtrl', ['$scope', '$routeParams', '$location', 'Project', function ($scope, $routeParams, $location, Project) {

  $scope.project = {};

  // Current project id
  var editId = $routeParams.projectId;

  // Load current project
  if (editId) {
    // Load project
    Project.get(editId).then(function(project) {
      $scope.project = project;
    });
  }

  // Save a project
  $scope.save = function () {
    // Save to db
    $scope.project.save(function(err, res) {
      if (!err) {
        // Redirect
        $location.path('/projects');
        $scope.$apply();
      }
    });
  };

  // Add a new project
  $scope.add = function () {
    Project.add($scope.project).then(function() {
      // Redirect
      $location.path('/projects');
    });
  };

}]);
