'use strict';

// Dependencias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost/phone_book');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.use('/api', require('./routes/api'));

// Inicia o servidor na porta 5000
app.listen(5000);
console.log('API Rodando na porta 5000!');