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
  var Project = require('../lib/Project/Project.js');
  var Plugin = require('../lib/Plugin/Plugin.js');

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
    db.projects.findOne({ current: true }, function(error, project) {
      res.json(project);
      res.end();
    });
  });

  // Get project
  app.get('/project/get/:id', function(req, res) {
    db.projects.findOne({ _id: req.params.id }, function(error, project) {
      res.json(project);
      res.end();
    });
  });

  // Get all projects
  app.get('/projects/get', function(req, res) {
    db.projects.find({}, function(error, projects) {
      res.json(projects);
      res.end();
    });
  });

  // Get plugin
  app.get('/plugin/get/:id', function(req, res) {
    db.plugins.findOne({ _id: req.params.id }, function(error, plugin) {
      res.json(plugin);
      res.end();
    });
  });

  // Get all plugins
  app.get('/plugins/get', function(req, res) {
    db.plugins.find({}, function(error, plugins) {
      res.json(plugins);
      res.end();
    });
  });

  // POST

  // Change current project
  app.post('/project/change/:id', function(req, res) {
    db.projects.findOne({ _id: req.params.id }, function(error, project) {
      Project.changeCurrent(project._id, function() {
        if (!err) {
          res.json(project);
        }
        res.end();
      });
    });
  });

  // Run plugin
  app.post('/plugin/run/:id', function(req, res) {
    db.plugins.find({ _id: req.params.id }, function(error, plugin) {
      db.projects.findOne({ current: true }, function(error, project) {
        for (var p in project.plugins) {
          if (project.plugins[p].id == req.params.id) {
            Plugin.findById(project.plugins[p].id, function(err, pluginToRun) {
              if (!err) {
                pluginToRun.run();
              }
            });
            res.json({"success": true});
            res.end();
            return;
          }
        }
        res.json({"success": false});
        res.end();
      });
    });
  });

  // DELETE

  // Delete a project
  app.delete('/project/delete/:id', function(req, res) {
    db.projects.remove({ _id: req.params.id }, {}, function() {
      res.json({"success": true});
      res.end();
    });
  });

  // Delete a plugin
  app.delete('/plugin/delete/:id', function(req, res) {
    db.plugins.remove({ _id: req.params.id }, {}, function() {
      res.json({"success": true});
      res.end();
    });
  });

  app.listen(1994);
}
