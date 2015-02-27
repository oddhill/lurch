lurchApp.service('DragDrop', [function () {
  this.init = function (holder, callback) {
    // Prevent default behavior when dropping files
    window.ondragover = function(e) { e.preventDefault(); return false; }
    window.ondrop = function(e) { e.preventDefault(); return false; }

    // Change to 'copy' icon on drag over
    holder.ondragover = function(e) {
      e.dataTransfer.dropEffect = 'copy';
      return false;
    };

    // Let the fun begin, get path of dropped item
    holder.ondrop = function(e) {
      e.preventDefault();

      // Get the file
      var file = e.dataTransfer.files[0];

      // Return the file path
      callback(file.path);
    };
  };
}]);
