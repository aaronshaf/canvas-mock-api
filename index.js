var Modules = require('./models/modules');
var ModuleItems = require('./models/module_items');

module.exports = function(app) {
  // Mock API
  app.get('/api/v1/courses/:course_id/modules', function(req, res) {
    var course_id = req.params.course_id;
    Modules
  });

  app.get('/api/v1/courses/:course_id/modules/:module_id/items', function(req, res) {

  });
};