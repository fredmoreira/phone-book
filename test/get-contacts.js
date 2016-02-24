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

  it('GET - Deve retornar um contact completo', function(done) {
    _conn.contacts.insert(fullContact, function(err, res) {
      request(app)
        .get('/contacts?name=TesterCarioca')
        .expect(200, done)
        .expect(function(res) {
          assert.equal('TesterCarioca', res.body[0].name, 'Retorno do name diferente do esperado');
          assert.equal('0552188889999', res.body[0].mobilephone, 'Retorno do mobilephone diferente do esperado');
          assert.equal('0552133332222', res.body[0].homephone, 'Retorno do homephone diferente do esperado');
        });
    });
  });

  it('GET - Contact there is no.', function(done) {
    request(app)
      .get('/contacts/?name=TestadorMineiro')
      .end(function(err, res) {
        assert.equal(res.status, 404);
        done();
      });
  });
});
