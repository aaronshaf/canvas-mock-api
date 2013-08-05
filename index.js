var Modules = require('./models/modules');
var ModuleItems = require('./models/module_items');

module.exports = function(app) {
  // Generate initial documents
  Modules.generate(1,10);

  app.get('/api/v1/courses/:course_id/modules', function(req, res) {
    Modules.find({
      course_id: parseInt(req.params.course_id)
    }).then(function(modules) {
      res.type('application/json');
      res.send('while(1);' + JSON.stringify(modules));  
    });
  });

  app.get('/api/v1/courses/:course_id/modules/:module_id/items', function(req, res) {
    ModuleItems.find({
      module_id: parseInt(req.params.module_id)
    }).then(function(module_items) {
      res.type('application/json');
      res.send('while(1);' + JSON.stringify(module_items));  
    });
  });
};