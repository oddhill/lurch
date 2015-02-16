lurchApp.controller('PluginFormCtrl', ['$scope', 'Plugin', function ($scope, Plugin) {
  // Add a plugin
  $scope.add = function () {
    Plugin.add($scope.droppedPluginPath).then(function(success, newPlugin) {
      if (success) {
        // Rebuild menu
        nwMenu.rebuild();

        // Add plugin to scope
        $scope.plugins.push(newPlugin);
      }
    });
  };
}]);
