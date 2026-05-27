'use strict';

var assert = require('chai').assert;
var db = require('../lib/db');
var app = require('../lib/index');
var request = require('supertest');
var _conn;

var fullContact = {
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
    _conn.contacts.remove({}, function(_err, _res) {
      done();
    });
  });

  it('PUT - Should update a contact.', function(done) {
    _conn.contacts.insert(fullContact, function(_err, res) {
      var contactId = res._id.id || res._id;
      request(app)
        .put('/contacts/' + contactId)
        .set('Content-type', 'application/json')
        .send(update)
        .expect(204)
        .end(function(_err) {
          done();
        });
    });
  });

  it('PUT - Should return 404', function(done) {
    request(app)
      .put('/contacts/invalid-id-that-does-not-exist')
      .set('Content-type', 'application/json')
      .send(update)
      .end(function(_err, res) {
        assert.equal(res.status, 404);
        done();
      });
  });
});
