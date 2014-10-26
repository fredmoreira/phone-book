// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Contact = require('../models/contact');

// Rotas
Contact.methods(['get', 'put', 'post', 'delete']);

router.get('/contacts/names/:name', function (req, res) {
    Contact.find({
        name: req.params.name
    }, function (err, contact) {
        if (err)
            res.send(err);

        if (contact.length == 0) {
            res.status(404);
            res.send('Name not found');
        } else
            res.send(contact);
    });
});

//Registrando rotas
Contact.register(router, '/contacts');
Contact.register(router, '/contacts/names');

// Retorna rota
module.exports = router;