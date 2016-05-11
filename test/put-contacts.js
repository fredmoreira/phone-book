'use strict';

var assert = require('chai').assert;
var db = require('../lib/db');
var app = require('../lib/index');
var request = require('supertest');
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var _conn;

var fullContact = {
  '_id': ObjectId('56d3008555d5d3700167fb66'),
  'name': 'Tester',
  'mobilephone': '0552188889999',
  'homephone': '0552133332222'
};

var update = {
  'name': 'TesterUPDATED',
  'mobilephone': '05531999998888',
  'homephone': '0553134345656'
};

describe('Tests API Phone Book - PUT ', function() {
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

  it('PUT - Should update a contact.', function(done) {
    _conn.contacts.insert(fullContact, function(err, res) {
      request(app)
        .put('/contacts/56d3008555d5d3700167fb66')
        .set('Content-type', 'application/json')
        .send(fullContact)
        .expect(204,done);
        });
    });
});

it('PUT - Should return 404', function(done) {
request(app)
  .delete('/contacts/11d3008555d5d3700167fb11')
  .end(function(err, res) {
    assert.isNull(err);
    assert.equal(res.status, 404);
    assert.equal(res.text, 'Not Found');
    done();
  });
});
