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

describe('Tests API Phone Book - DELETE ', function() {
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

  it('DELETE - Should delete a contact.', function(done) {
    _conn.contacts.insert(fullContact, function(_err, res) {
      var contactId = res._id.id || res._id;
      request(app)
        .delete('/contacts/' + contactId)
        .expect(204)
        .end(function(_err) {
          done();
        });
    });
  });

  it('DELETE - Should return 404', function(done) {
    request(app)
      .delete('/contacts/invalid-id-that-does-not-exist')
      .end(function(_err, res) {
        assert.equal(res.status, 404);
        done();
      });
  });    
});

