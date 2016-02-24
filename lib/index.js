'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

require('./routes/api')(app);

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function(err) {
	if (err) {
		return console.error(err);
	}
	console.info('Express server listening on port: %d', server.address().port);
});

module.exports = app;
