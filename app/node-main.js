// Quit application on "uncaughtException"
process.on('uncaughtException', function(err) {
  gui.App.quit();
});

// Load REST API
require('./rest/rest-api.js').init();
