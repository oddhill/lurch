lurchApp.controller('PluginFormCtrl', ['$scope', '$rootScope', 'Plugin', function ($scope, $rootScope, Plugin) {
  // Add a plugin
  $scope.add = function () {
    Plugin.add($scope.newPluginPath).then(function(data) {
      if (data.success) {
        // Rebuild menu
        nwMenu.rebuild();

        // Emit 'pluginAdded' event
        $rootScope.$emit('pluginAdded', data.plugin);
      }
    });
  };
}]);
