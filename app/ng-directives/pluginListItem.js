lurchApp.directive('pluginListItem', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'ng-templates/pluginListItem.html'
  };
});
