lurchApp.controller('IndexCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
  $scope.pluginForm = false;
  $scope.allowSettingsClose = false;

  // REST-API key
  $scope.restToken = localStorage.restToken;

  // Hide plugin form
  $scope.showPluginForm = function () {
    $scope.pluginForm = true;
  };

  // Show plugin form
  $scope.hidePluginForm = function () {
    $scope.pluginForm = false;
  };

  // Show settings
  $scope.showSettings = function () {
    $scope.minimizeMain = 'minimize';

    $timeout(function() {
      $scope.allowSettingsClose = true;
    }, 200);
  };

  // Hide settings
  $scope.hideSettings = function () {
    if ($scope.allowSettingsClose) {
      $scope.minimizeMain = '';
      $scope.allowSettingsClose = false;
    }
  };
}]);
