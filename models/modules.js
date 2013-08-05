var RSVP = require('rsvp');
var Datastore = require('nedb');
var db = new Datastore({inMemoryOnly: true});

var lastId = 0;

module.exports = {
  generate: function(itemCount) {
    var id = ++lastId;
    return {
      "id": id,
      "name": "Test " + id,
      "position": 1,
      "unlock_at": null,
      "require_sequential_progress": Math.random() > .5,
      "prerequisite_module_ids": [],
      "published": Math.random() > .5,
      "items_count": 0,
      // "items_url": "/api/v1/courses/1/modules/1/items"
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