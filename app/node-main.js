// Quit application on "uncaughtException"
process.on('uncaughtException', function(err) {
  gui.App.quit();
});