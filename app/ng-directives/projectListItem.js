lurchApp.directive('projectListItem', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'ng-templates/projectListItem.html'
  };
});
