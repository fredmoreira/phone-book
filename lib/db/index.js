'use strict';

var persistence = require('../persistence');
var Promise = require('bluebird');

var connection;

var connectDb = function() {

  return new Promise(function(resolve, _reject) {

    if (connection) {
      return resolve(connection);
    } else {
      persistence.init();
      connection = persistence.createConnection();

      console.info('JSON file persistence initialized');

      return resolve(connection);
    }
  });
};

module.exports = new connectDb();
