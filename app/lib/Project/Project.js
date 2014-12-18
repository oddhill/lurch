function Project(name, path, plugins, current, id) {
  this.name = name;
  this.path = path;
  this.plugins = plugins;
  this.current = current;
  this.id = id;
}

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
  db.projects.update({ _id: this.id }, { name: this.name, path: this.path, plugins: this.plugins, current: this.current }, { upsert: true }, function(err) {
    callback(err);
  });
};

Project.prototype.remove = function(callback) {
  db.projects.remove({ _id: this.id }, function(err) {
    callback(err);
  });
};

Project.prototype.changeToCurrent = function(menuItem) {
  db.projects.update({}, { $set: { current: false } }, {});
  db.projects.update({ _id: this._id }, { $set: { current: true } }, function(err) {
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
