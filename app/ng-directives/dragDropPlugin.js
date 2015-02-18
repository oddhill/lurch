lurchApp.directive('dragDropPlugin', ['DragDrop', function (DragDrop) {
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    template: '<div class="plugin-dragdrop" ng-transclude></div>',
    link: function(scope, element, attrs) {
      DragDrop.init(element, function (path) {
        scope.newPluginPath = path;

        // Trigger the form
        element.parent().triggerHandler('submit');
      });
    }
  }
}]);
