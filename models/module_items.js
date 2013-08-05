var Datastore = require('nedb');
var db = new Datastore({inMemoryOnly: true});

var lastId = 0;

module.exports = {
  generate: function(itemCount) {
    var id = ++lastId;
    return {
      "id": id,
      "indent": 0,
      "position": 1,
      "title": "Bla bla bla",
      "type": "Discussion",
      "module_id": 1,
      "html_url": "http://localhost:8000/courses/1/modules/items/2",
      "content_id": 1,
      "url": "http://localhost:8000/api/v1/courses/1/discussion_topics/1",
      "published": true
    };
  },

  create: function(document) {
    new RSVP.Promise(function(resolve, reject) {
      db.insert(document, function (err, document) {
        if(error) return reject(error);
        resolve(document);
      });
    };
  },

  read: function(id) {
    new RSVP.Promise(function(resolve, reject) {
      db.findOne({id:id}, function (error, document) {
        if(error) return reject(error);
        resolve(document);
      });
    };
  },

  put: function(id,document) {
    new RSVP.Promise(function(resolve, reject) {
      db.update({id: id}, document, {upsert: true}, function(error, numReplaced, upsert) {
        if(error) return reject(error);
        resolve();
      });
    });
  },

  remove: function(id) {
    new RSVP.Promise(function(resolve, reject) {
      db.remove({id:id},{},function(err, numRemoved) {
        if(error) return reject(error);
        resolve();
      })
    });
  }
};