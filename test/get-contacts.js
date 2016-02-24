'use strict';

var assert = require('chai').assert;
var db = require('../db');
var app = require('../lib/index');
var request = require('supertest');
var _conn;

var fullContact = {
  'name': 'TesterCarioca',
  'mobilephone': '0552188889999',
  'homephone': '0552133332222'
};

describe('Tests API Phone Book - GET ', function() {
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

  it('GET - Should return a full contact.', function(done) {
    _conn.contacts.insert(fullContact, function(err, res) {
      request(app)
        .get('/contacts?name=TesterCarioca')
        .expect(200, done)
        .expect(function(res) {
          assert.equal('TesterCarioca', res.body[0].name, 'Return different name than expected');
          assert.equal('0552188889999', res.body[0].mobilephone, 'Return different mobilephone than expected');
          assert.equal('0552133332222', res.body[0].homephone, 'Return different homephone than expected');
        });
    });
  });

  it('GET - Contact there is no.', function(done) {
    request(app)
      .get('/contacts/?name=TestadorMineiro')
      .end(function(err, res) {
        assert.equal(res.status, 404);
        assert.equal(res.text, 'Not Found');
        done();
      });
  });
});
