'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/phone_book', function(err) {
	if (err) {
		console.error('Could not connect to DB: %s', err);
		process.exit(1);
	}
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

require('../routes/api')(app);

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function(err) {
	if (err) {
		return console.error(err);
	}
	console.info('Express server listening on port: %d', server.address().port);
});

module.exports = app;
