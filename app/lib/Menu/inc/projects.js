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
              Project.changeCurrent(docs[key2]._id, function(err) {
                lurch.current.name = docs[key2].name;
                nwMenu.rebuild();
              });
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
module.exports.rebuild = function(subMenus) {
  // Rebuild menu
  // Remove current items
  var max = subMenus.projects.items.length;
  if (max == 0) {
    module.exports.build(subMenus, function(){});
  } else {
    for (var i = 0; i < max; i++) {
      subMenus.projects.removeAt(0);

      if ((i+1) == max) {
        // Build menu items again
        module.exports.build(subMenus, function() {});
      }
    }
  }
}
