'use strict';

var db = require('mongojs');
var Promise = require('bluebird');

var connection;

var connectDb = function() {

  return new Promise(function(resolve, reject) {

    if (connection) {
      return resolve(connection);
    } else {
      connection = db('phone-book', ['contacts']);

      connection.on('error', function(err) {
        console.error('Error connecting to the database: %s', err);
      });

      connection.on('connect', function() {
        console.info('Database connected');
      });

      return resolve(connection);
    }
  });
};

module.exports = new connectDb();
