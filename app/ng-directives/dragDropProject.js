lurchApp.directive('dragDropProject', ['DragDrop', function (DragDrop) {
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    template: '<div class="project-dragdrop" ng-transclude></div>',
    link: function(scope, element, attrs) {
      DragDrop.init(element, function (path) {
        scope.project.path = path;
        scope.$apply();
      });
    }
  }
}]);
