lurchApp.controller('SettingsFormCtrl', ['$scope', function ($scope) {

  $scope.settings = {};
  $scope.settings.callback = localStorage.pluginCallback;

  // Save settings
  $scope.$watchCollection('settings', function() {
    localStorage.pluginCallback = $scope.settings.callback;
  });

}]);
