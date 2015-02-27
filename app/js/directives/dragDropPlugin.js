lurchApp.directive('dragDropPlugin', ['DragDrop', function (DragDrop) {
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    template: '<div class="plugin-dragdrop" id="plugin-drag-drop" ng-transclude></div>',
    link: function(scope, element, attrs) {
      var holder = document.getElementById('plugin-drag-drop');
      DragDrop.init(holder, function (path) {
        scope.newPluginPath = path;

        // Trigger the form
        element.parent().triggerHandler('submit');
      });
    }
  }
}]);
