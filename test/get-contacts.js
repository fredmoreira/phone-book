'use strict';

var contact = require('../models/contact');
var assert = require('chai').assert;
var db = require('../db/db');
var app = require('../server');
var request = require('supertest');

describe('Teste de get da API: ', function() {
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

	it('Deve retornar um contact completo', function(done) {
		var obj = new contact({
			name: 'teste',
			mobilephone: '0553188887777',
			homephone: '0558833332222'
		});

		obj.save(function(err, data) {
			if (err) {
				console.error('Error : ', err);
			}
		});

		request(app)
			.get('/contacts?name=teste')
			.expect(200, done)
			.expect(function(res) {
				var result = res.body;
				assert.equal('teste', result[0].name, 'Retorno diferente do esperado');
				assert.equal('0553188887777', result[0].mobilephone, 'Retorno diferente do esperado');
				assert.equal('0558833332222', result[0].homephone, 'Retorno diferente do esperado');
			});
	});
});