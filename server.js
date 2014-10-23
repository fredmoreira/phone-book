'use strict';

// Dependencies
var express = require('express'),
	app = express();

app.get('/', function(req, res){
	res.send('Estou funcionando API do FREDÃO!!!');
});

app.listen(5000);
console.log('API Rodando na porta 3000!');

