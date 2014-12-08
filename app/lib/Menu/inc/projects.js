var Project = require('../../Project/Project.js');

/**
 * Get projects and insert them in the menu
 */
module.exports.build = function(subMenus, callback) {
  // Get current
  var current_id = null;
  Project.findCurrent(function(err, doc) {
    if (!err && doc) {
      current_id = doc._id;
    }
  });

  Project.findAll(function(err, docs) {
    for (var key in docs) {
      subMenus.projects.append(new gui.MenuItem({
        type: 'checkbox',
        label: docs[key].name,
        click: function() {
          for (var key2 in docs) {
            if (docs[key2].name == this.label) {
              project.changeToCurrent(docs[key2], key2);
              break;
            }
          }
        },
        checked: docs[key]._id == current_id
      }));
    }

    callback();
  });
}

/**
 * Rebuild menu
 */
module.exports.rebuild = function() {
  // Rebuild menu
  // Remove current items
  var max = sitesMenu.items.length;
  if (max == 0) {
    module.exports.build(function(){});
  } else {
    for (var i = 0; i < max; i++) {
      sitesMenu.removeAt(0);

      if ((i+1) == max) {
        // Build menu items again
        module.exports.build(function(){});
      }
    }
  }
}
