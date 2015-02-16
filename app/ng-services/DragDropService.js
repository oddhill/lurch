lurchApp.service('DragDrop', [function () {
  this.init = function (element, callback) {
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

      // Return the file path
      callback(file.path);
    });
  };
}]);
