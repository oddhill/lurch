lurchApp.controller('PluginListCtrl', ['$scope', '$rootScope', 'Plugin', function ($scope, $rootScope, Plugin) {

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

  // Add plugin to list
  $rootScope.$on('pluginAdded', function (event, plugin) {
    $scope.plugins.push(plugin);
  });

}]);
