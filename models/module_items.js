var RSVP = require('rsvp');
var Datastore = require('nedb');
var db = new Datastore({inMemoryOnly: true});
var _ = require('underscore');

var lastId = 0;

var ModuleItems = {
  generate: function(module_id,count) {
    for(var x = 0;x < count;x++) {
      ModuleItems.create({
        "id": ++lastId,
        "indent": _.random(0,3),
        "position": 1,
        "title": "Bla bla bla",
        "type": "Discussion",
        "module_id": module_id,
        "html_url": "http://localhost:8000/courses/1/modules/items/2",
        "content_id": 1,
        "url": "http://localhost:8000/api/v1/courses/1/discussion_topics/1",
        "published": true
      });
    }
  },

  create: function(document) {
    return new RSVP.Promise(function(resolve, reject) {
      db.insert(document, function (error, document) {
        if(error) return reject(error);
        resolve(document);
      });
    });
  },

  find: function(criteria) {
    return new RSVP.Promise(function(resolve, reject) {
      db.find(criteria,function(error, documents) {
        if(error) return reject(error);
        resolve(documents);
      });
    });
  },

  read: function(id) {
    return new RSVP.Promise(function(resolve, reject) {
      db.findOne({id:id}, function (error, document) {
        if(error) return reject(error);
        resolve(document);
      });
    });
  },

  put: function(id,document) {
    return new RSVP.Promise(function(resolve, reject) {
      db.update({id: id}, document, {upsert: true}, function(error, numReplaced, upsert) {
        if(error) return reject(error);
        resolve();
      });
    });
  },

  remove: function(id) {
    return new RSVP.Promise(function(resolve, reject) {
      db.remove({id:id},{},function(err, numRemoved) {
        if(error) return reject(error);
        resolve();
      });
    });
  }
};

module.exports = ModuleItems;