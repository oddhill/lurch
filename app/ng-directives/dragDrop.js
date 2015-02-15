lurchApp.directive('dragDrop', function() {
  return {
    restrict: 'AE',
    replace: true,
    template: '<div class="drag-drop"></div>',
    link: function(scope, element, attrs) {

      // Change to 'copy' icon on drag over
      element.bind('dragover', function(e) {
        e.dataTransfer.dropEffect = 'copy';
        return false;
      });

      // Let the fun begin, get path of dropped item
      element.bind('drop', function(e) {
        e.preventDefault();

        this.className += ' active';

        // Get the file
        var file = e.dataTransfer.files[0];

        // Get file path
        var filePath = file.path;
      });
    }
  }
});
