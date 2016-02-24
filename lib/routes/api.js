'use strict';

var db = require('../db');
var Promisse = require('bluebird');
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var validate = require('../validation');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('! :) :) API PHONE-BOOK UP :) :) !');
  });

  app.get('/contacts', function(req, res) {

    var params = (req.query ? req.query : {});
    if (params.name === '') {
      return res.sendStatus(204);
    }

    db.then(function(conn) {
      conn.contacts.find(params, function(err, contact) {
        if (err) {
          return res.status(500).send(err);
        }
        if (!contact.length) {
          return res.sendStatus(404);
        }
        res.send(contact);
      });
    });
  });

  app.post('/contacts', validate, function(req, res) {

    var validate = req.valid;
    if (validate.isValid) {
      var contact = {
        name: req.body.name,
        mobilephone: req.body.mobilephone,
        homephone: req.body.homephone
      };

      db.then(function(conn) {
        conn.contacts.insert(contact, function(err, res) {
          if (err) {
            console.log(err);
          }
          console.log('Contact saved: ' + contact.name);
        });
      });
      res.status(201).send(contact);
    } else {
      res.status(400).send(validate.message);
    }
  });

  app.delete('/contacts/:id', function(req, res) {
    var id = {
      _id: ObjectId(req.params.id)
    };
    db.then(function(conn) {
      conn.contacts.remove(id, function(err, data) {
        if (err) {
          console.log(err);
          res.status(400).end();
        } else {
          res.status(204).end();
        }
      });
    });
  });

  app.put('/contacts/:id', function(req, res) {
    var id = {
      _id: ObjectId(req.params.id)
    };
    var update = {
      $set: {
        name: req.body.name
      }
    };

    db.then(function(conn) {
      conn.contacts.update(id, update, function(err, data) {
        if (err) {
          console.log(err);
          res.status(400).end();
        } else {
          res.status(204).end();
        }
      });
    });
  });
};
