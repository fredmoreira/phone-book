'use strict';

var mongoose = require('mongoose');

exports.drop = function(collection, done) {
	mongoose.connection.collections[collection].drop(function() {
		if (done) {
			done();
		}
	});
};

exports.init = function() {
	if (0 === mongoose.connection.readyState) {
		mongoose.connect('mongodb://localhost/phone_book'), function(err) {
			if (err) {
				console.error('Could not connect to DB: %s', err);
				process.exit(1);
			}
		};
		var connection = mongoose.connection;
		connection.on('error', function(err) {
			console.error('MongoDB connection error: %s', err);
		});
	}
};

exports.disconnect = function(done) {
	mongoose && mongoose.disconnect();
	if (done) {
		done();
	}
};