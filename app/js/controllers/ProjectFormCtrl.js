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

  // Remove project
  $scope.remove = function () {
    // Remove from db
    $scope.project.remove(function(err) {
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

  // Browse project
  $scope.browse = function () {
    var browsePath = angular.element(document.getElementById('path'));
    browsePath.click();
  };

  // Update project path
  $scope.updatePath = function (elem) {
    $scope.project.path = elem.val();
    $scope.$apply();
  };

  // Tabs
  $scope.tabs = {};
  $scope.tabs.settings = true;
  $scope.tabs.plugins = false;

  // Set tab
  $scope.setTab = function (tab) {
    for (var i in $scope.tabs) {
      $scope.tabs[i] = false;
      if (i == tab) {
        $scope.tabs[i] = true;
      }
    }
  };

}]);
