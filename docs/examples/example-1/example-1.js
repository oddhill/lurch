module.exports.run = function(lurch, callback) {
  // Declare status for worst case scenario.
  var status = {success: false, message: 'Clear cache operation failed.'};

  // Execute cache clear command.
  lurch.execute('cd ' + lurch.current.path + ' && drush cc all', function(error, stdout, stderr) {

    // If no error occured, set success properties.
    if (!error) {
      status.success = true;
      status.message = 'All cache cleared.';
    }

    // Return status to lurch.
    callback(status);
  });
};