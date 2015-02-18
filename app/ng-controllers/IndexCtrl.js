lurchApp.controller('IndexCtrl', ['$scope', function ($scope) {
  $scope.pluginForm = false;

  // Hide plugin form
  $scope.showPluginForm = function () {
    $scope.pluginForm = true;
  };

  // Show plugin form
  $scope.hidePluginForm = function () {
    $scope.pluginForm = false;
  };
}]);
