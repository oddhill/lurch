lurchApp.controller('IndexCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
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

  // Hide plugin form after adding one
  $rootScope.$on('pluginAdded', function (event, plugin) {
    $scope.pluginForm = false;
  });

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
