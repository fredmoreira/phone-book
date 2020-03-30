'use strict';

var assert = require('chai').assert;
var db = require('../lib/db');
var app = require('../lib/index');
var request = require('supertest');
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var _conn;

var fullContact = {
  '_id': ObjectId('56d3008555d5d3700167fb84'),
  'name': 'Tester',
  'mobilephone': '0552188889999',
  'homephone': '0552133332222'
};

describe('Tests API Phone Book - DELETE ', function() {
  before(function(done) {
    db.then(function(conn) {
      _conn = conn;
      done();
    });
  });

  after(function(done) {
    _conn.contacts.remove({}, function(err, res) {
      done();
    });
  });

  it('DELETE - Should delete a contact.', function(done) {
    _conn.contacts.insert(fullContact, function(err, res) {
      request(app)
        .delete('/contacts/56d3008555d5d3700167fb84')
        .expect(204);
      done();
    });
  });

  it('DELETE - Should return 404', function(done) {
    request(app)
      .delete('/contacts/56d3008555d5d3700167fb77')
      .end(function(err, res) {
        assert.equal(res.status, 404);
        done();
      });
    });    
});

