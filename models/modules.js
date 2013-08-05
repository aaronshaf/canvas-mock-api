var RSVP = require('rsvp');
var _ = require('underscore');
var randomWords = require('random-words');
var Datastore = require('nedb');
var ModuleItems = require('./module_items');
var db = new Datastore({inMemoryOnly: true});

var lastId = 0;

var Modules = {
  generate: function(course_id,count) {
    var x,y;

    for(x = 0;x < count;x++) {
      Modules.create({
        "id": ++lastId,
        "name": randomWords(_.random(4,8)).join(' '),
        "position": 1,
        "course_id": course_id,
        "unlock_at": null,
        "require_sequential_progress": Math.random() > 0.5,
        "prerequisite_module_ids": [],
        "published": Math.random() > 0.5,
        "items_count": 0
        // "items_url": "/api/v1/courses/1/modules/1/items"
      });
      ModuleItems.generate(lastId,_.random(0,5));
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

module.exports = Modules;