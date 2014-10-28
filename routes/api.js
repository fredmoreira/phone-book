// Models
var Contact = require('../models/contact');

// Rotas
module.exports = function(app) {
    app.get('/api/contacts', function(req, res) {
        var params = (req.query ? req.query : {});
        Contact.find(params, function(err, contact) {
            if (err) {
                res.status(500);
                res.send(err);
            }
            if (!contact.length) {
                res.status(204);
            }
            res.send(contact);
        });
    });

    app.post('/api/contacts', function(req, res) {
        var name = req.body.name,
            mobilephone = req.body.mobilephone,
            homephone = req.body.homephone;

        if (!name || !mobilephone) {
            res.status(400).send('Parâmetro(s) invalido(s)').end();
        }
        var obj = new Contact({
            name: name,
            mobilephone: mobilephone,
            homephone: homephone
        });

        obj.save(function(err, data) {
            if (err) {
                res.send(500);
            } else {
                res.json(data);
                res.status(201).end();
            }
        });
    });

    app.delete('/api/contacts/:id', function(req, res) {
        var _id = req.params.id;
        if (!_id)
            res.status(400);

        else
            Contact.findOneAndRemove(_id, function(err) {
                if (err)
                    res.status(400);

                else
                    res.send('Contact deleted');

            });
    });
};