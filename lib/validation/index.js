'use strict';
var tv4 = require('tv4');

var contactSchema = require('./schema/contacts.json');

tv4.addSchema(contactSchema);

module.exports = function(req, res, next) {

  var body = req.body;

  var result = tv4.validateMultiple(body, 'Contact', true);

  req.valid = {
    isValid: result.valid,
    message : (result.valid ? null : result.errors[0].message)
  };
  console.log(req.valid);

  next();
};
