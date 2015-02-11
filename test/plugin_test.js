var expect = require('expect');

var basePath = process.env.PWD;
var Plugin = require('../app/lib/Plugin/Plugin.js');
var plugin = new Plugin('test', basePath + '/docs/examples/example-1', null);

describe('Plugin', function() {

  describe('.save()', function() {
    it('should save plugin to db', function(done) {
      plugin.save(function(err, result, savedPlugin) {
        expect(err).toEqual(null);
        Plugin.findById(savedPlugin._id, function(err, newPlugin) {
          plugin = newPlugin;
          done();
        });
      });
    });
  });

  describe('.moveToDataPath()', function() {
    it('should move plugin folder to data path', function(done) {
      plugin.moveToDataPath(function(err) {
        expect(err).toEqual(null);
        done();
      });
    });
  });

  describe('.remove()', function() {
    it('should remove a plugin from db', function(done) {
      plugin.remove(function(err) {
        expect(err).toEqual(null);
        done();
      });
    });
  });

});
