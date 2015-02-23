lurchApp.directive('pluginListItem', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'templates/pluginListItem.html'
  };
});
