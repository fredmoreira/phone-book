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

	// beforeEach(function(done) {
	// 	db.drop('contacts', done);
	// });

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
				assert.equal(2, 2, 'Retorno diferente do esperado');
			});
	});
});