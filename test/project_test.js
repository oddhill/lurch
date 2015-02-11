var expect = require('expect');

var Project = require('../app/lib/Project/Project.js');
var project = new Project('test', '/app/docs/examples/example-1', {}, false, null);

describe('Project', function() {

  describe('.save()', function() {
    it('should save project to db', function(done) {
      project.save(function(err, result, savedProject) {
        expect(err).toEqual(null);
        Project.findById(savedProject._id, function(err, newProject) {
          project = newProject;
          done();
        });
      });
    });
  });

  describe('.remove()', function() {
    it('should remove a project from db', function(done) {
      project.remove(function(err) {
        expect(err).toEqual(null);
        done();
      });
    });
  });

});
