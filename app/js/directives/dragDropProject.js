lurchApp.directive('dragDropProject', ['DragDrop', function (DragDrop) {
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    template: '<div class="project-dragdrop" id="project-drag-drop" ng-transclude></div>',
    link: function(scope, element, attrs) {
      var holder = document.getElementById('project-drag-drop');
      DragDrop.init(holder, function (path) {
        scope.project.path = path;
        scope.$apply();
      });
    }
  }
}]);
