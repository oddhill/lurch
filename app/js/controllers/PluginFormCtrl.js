lurchApp.controller('PluginFormCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'Plugin', function ($scope, $rootScope, $location, $timeout, Plugin) {
  // Add a plugin
  $scope.add = function () {
    Plugin.add($scope.newPluginPath).then(function(data) {
      if (data.success) {
        // Rebuild menu
        nwMenu.rebuild();

        // Emit 'pluginAdded' event
        $rootScope.$emit('pluginAdded', data.plugin);

        // Redirect
        $timeout(function() {
          $location.path('/plugins');
          $scope.$apply();
        });
      }
    });
  };
}]);
