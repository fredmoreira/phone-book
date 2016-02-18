var assert = require('chai').assert;
var request = require('supertest');
var expect = require('chai').expect;
var db = require('../db/db');
var app = require('../lib/index');

var url = 'http://localhost:5000';

var contatoCompleto = {
  "name": "Tester Mineiro",
  "mobilephone": "0553188889999",
  "homephone": "0553133332222"
};

var contatoSemNome = {
  "mobilephone": "0553188889999",
  "homephone": "0553133332222"
};

var contatoSemMobilePhone = {
  "name": "Tester Mineiro",
  "homephone": "0553133332222"
};


describe('Testes API PhoneBook - POST', function() {
  before(function(done) {
    db.init();
    done();
  });

  after(function(done) {
    db.disconnect(done);
  });

  beforeEach(function(done) {
    db.drop('contacts', done);
  });

  it('POST - Deve tentar criar um contact completo', function(done) {
    request(url)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(contatoCompleto)
      .end(function(err, res) {
        var result = JSON.parse(res.text);
        assert.equal(res.status, 201);
        assert.equal(result.name, 'Tester Mineiro', 'Conferindo o name!');
        assert.equal(result.mobilephone, '0553188889999', 'Conferindo o mobilephone!');
        assert.equal(result.homephone, '0553133332222', 'Conferindo o homephone!');
        done();
      });
  });

  it('POST - Deve tentar criar um contact sem nome', function(done) {
    request(url)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(contatoSemNome)
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Name is required', 'Validando mensagem de name obrigatório!');
        done();
      });
  });

  it('POST - Deve tentar criar um contact sem mobilephone', function(done) {
    request(url)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(contatoSemMobilePhone)
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Mobilephone is required', 'Validando mensagem de mobilephone obrigatório!');
        done();
      });
  });
});
