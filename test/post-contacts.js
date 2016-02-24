'use strict';

var assert = require('chai').assert;
var request = require('supertest');
var expect = require('chai').expect;
var db = require('../db');
var app = require('../lib/index');
var _conn;

var fullContact = {
  'name': 'Tester Mineiro',
  'mobilephone': '0553188889999',
  'homephone': '0553133332222'
};

var unnamedContact = {
  'mobilephone': '0553188889999',
  'homephone': '0553133332222'
};

var nophoneContact = {
  'name': 'Tester Mineiro',
  'homephone': '0553133332222'
};

describe('Tests API Phone Book - POST', function() {
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

  it('POST - Deve tentar criar um contact completo', function(done) {
    request(app)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(fullContact)
      .end(function(err, res) {
        assert.equal(res.status, 201);
        assert.equal(res.body.name, 'Tester Mineiro', 'Conferindo o name!');
        assert.equal(res.body.mobilephone, '0553188889999', 'Check mobilephone!');
        assert.equal(res.body.homephone, '0553133332222', 'Check homephone!');
        done();
      });
  });

  it('POST - Deve tentar criar um contact sem nome', function(done) {
    request(app)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(unnamedContact)
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Missing required property: name', 'Validating required name message!');
        done();
      });
  });

  it('POST - Deve tentar criar um contact sem mobilephone', function(done) {
    request(app)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(nophoneContact)
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Missing required property: mobilephone', 'Validating required mobilephone message!');
        done();
      });
  });
});
