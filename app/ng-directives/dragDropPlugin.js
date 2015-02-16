lurchApp.directive('dragDropPlugin', ['DragDrop', function (DragDrop) {
  return {
    restrict: 'AE',
    replace: true,
    template: '<div class="drag-drop"></div>',
    link: function(scope, element, attrs) {
      DragDrop.init(element, function (path) {
        scope.pluginPath = path;

        // Trigger the form
        element.parent().triggerHandler('submit');
      });
    }
  }
}]);
