lurchApp.controller('PluginListCtrl', ['$scope', 'Plugin', function ($scope, Plugin) {

  // Get all plugins
  Plugin.get().then(function(plugins) {
    $scope.plugins = plugins;
  });

  // Remove a plugin
  $scope.remove = function (id) {
    Plugin.remove(id).then(function() {
      // Rebuild menu
      nwMenu.rebuild();

      // Remove from plugins view
      var index = _.find($scope.plugins, function(obj) { return obj.id == id; });
      $scope.plugins.splice(index, 1);
    });
  };

  // Add a plugin
  $scope.add = function () {
    Plugin.add().then(function(success, newPlugin) {
      if (success) {
        // Rebuild menu
        nwMenu.rebuild();

        // Add plugin to scope
        $scope.plugins.push(newPlugin);
      }
    });
  };

}]);
