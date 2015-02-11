function Project(name, path, plugins, current, id, db, remote) {
  this.name = name;
  this.path = path;
  this.plugins = plugins;
  this.current = current;
  this.id = id;
  this.db = db;
  this.remote = remote;
}

Project.prototype.getRemote = function(callback) {
  callback(this.remote);
};

Project.prototype.setRemote = function(remote) {
  this.remote = remote;
};

Project.prototype.getDb = function(callback) {
  callback(this.db);
};

Project.prototype.setDb = function(db) {
  this.db = db;
};

Project.prototype.getName = function(callback) {
  callback(this.name);
};

Project.prototype.setName = function(name) {
  this.name = name;
};

Project.prototype.getPath = function(callback) {
  callback(this.path);
};

Project.prototype.setPath = function(path) {
  this.path = path;
};

Project.prototype.getPlugins = function(callback) {
  callback(this.plugins);
};

Project.prototype.setPlugins = function(plugins) {
  this.plugins = plugins;
};

Project.prototype.save = function(callback) {
  db.projects.update({ _id: this.id }, { name: this.name, path: this.path, plugins: this.plugins, current: this.current, db: this.db, remote: this.remote }, { upsert: true }, function(err, result, savedProject) {
    callback(err, result, savedProject);
  });
};

Project.prototype.remove = function(callback) {
  db.projects.remove({ _id: this.id }, function(err) {
    callback(err);
  });
};

Project.changeCurrent = function(id, callback) {
  db.projects.update({}, { $set: { current: false } }, {});
  db.projects.update({ _id: id }, { $set: { current: true } }, function(err) {
    callback(err);
  });
};

Project.findById = function(id, callback) {
  db.projects.findOne({ _id: id }, {}, function(err, result) {
    if (err) return callback(err);
    callback(null, new Project(result.name, result.path, result.plugins, result.current, result._id));
  });
};

Project.findAll = function(callback) {
  db.projects.find({}, {}, function(err, result) {
    if (err) return callback(err);
    callback(null, result);
  });
};

Project.findCurrent = function(callback) {
  db.projects.findOne({ current: true }, {}, function(err, result) {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = Project;
