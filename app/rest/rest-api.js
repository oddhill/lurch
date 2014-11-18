/**
 * Lurch RESTful API
 */

// Set REST-API token
module.exports.setToken = function() {
  if (!localStorage.restToken) {
    require('crypto').randomBytes(6, function(ex, buf) {
      localStorage.restToken = buf.toString('hex');
    });
  }
}

module.exports.init = function() {
  // Load libs
  var projects = require('../lib/projects.js');
  var plugins = require('../lib/plugins.js');

  // Load express
  var express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

  // Basic auth
  var auth = require('http-auth');
  var basic = auth.basic({ realm: 'Lurch REST' }, function(username, password, callback) {
    callback(username === 'lurch' && password === localStorage.restToken);
  });
  app.use(auth.connect(basic));

  // parse application/json
  app.use(bodyParser.json());

  // GET

  // ROOT
  app.get('/', function(req, res) {
    res.end('Lurch REST');
  });

  // Get current project
  app.get('/project/current', function(req, res) {
    db.sites.find({ current: true }, function(error, project) {
      res.json(project[0]);
      res.end();
    });
  });

  // POST

  // Change current project
  app.post('/project/change/:id', function(req, res) {
    db.sites.find({ _id: req.param('id') }, function(error, project) {
      projects.changeCurrent(lurch, project[0]);
      res.json({"success": true});
      res.end();
    });
  });

  // Run plugin
  app.post('/plugin/run/:id', function(req, res) {
    db.plugins.find({ _id: req.param('id') }, function(error, plugin) {
      plugins.runPlugin(plugin[0].path);
      res.json({"success": true});
      res.end();
    });
  });

  app.listen(1994);
}
