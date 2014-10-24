// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Contact = require('../models/contact');

// Rotas
Contact.methods(['get', 'put', 'post', 'delete']);
Contact.register(router, '/contacts');

// Retorna rota
module.exports = router;