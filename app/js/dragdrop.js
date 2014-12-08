var dragndrop = function(holder) {

  // Prevent default behavior when dropping files
  window.ondragover = function(e) { e.preventDefault(); return false; }
  window.ondrop = function(e) { e.preventDefault(); return false; }

  // Change to 'copy' icon on drag over
  holder.ondragover = function (e) { e.dataTransfer.dropEffect = 'copy'; return false; };

  // Let the fun begin
  holder.ondrop = function(e) {

    e.preventDefault();

    this.className += ' active';

    // Get the file
    var file = e.dataTransfer.files[0];

    // Get file path
    var filePath = file.path;
    console.log(file.path);

    return false;

  }

}
