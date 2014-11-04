/**
 * @file
 *
 * This files handles application updates.
 */

/*
1. Check the manifest for version (from your running "old" app).
2. If the version is different from the running one, download new package to a temp directory.
3. Unpack the package in temp.
4. Run new app from temp and kill the old one (i.e. still all from the running app).
5. The new app (in temp) will copy itself to the original folder, overwriting the old app.
6. The new app will run itself from original folder and exit the process.
*/

var pkg = require('../package.json');
var updater = require('node-webkit-updater');
var upd = new updater(pkg);
var copyPath, execPath;

// Check if there is a new version to download
module.exports.checkNewVersion = function(callback) {
  if(gui.App.argv.length <= 0) {
    upd.checkNewVersion(function(error, newVersionExists, manifest) {
      if (!error && newVersionExists) {
        callback(true, manifest);
      } else {
        callback(false, manifest);
      }
    });
  }

  // Check if app is launched from temp dir
  else if (gui.App.argv.length) {
    copyPath = gui.App.argv[0];
    execPath = gui.App.argv[1];

    // Replace old app, Run updated app from original location and close temp instance
    upd.install(copyPath, function(err) {
      if(!err) {
        upd.run(execPath, null);
        gui.App.quit();
      }
    });
  }

  else {
    callback(false, manifest);
  }
}

// Install newer version
module.exports.install = function(manifest) {
  // Download new version
  upd.download(function(error, filename) {
    if (!error) {
      // Unpack .zip
      upd.unpack(filename, function(error, newAppPath) {
        if (!error) {
          upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],{});
          gui.App.quit();
        }
      }, manifest);
    }
  }, manifest);
}
