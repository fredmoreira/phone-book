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
        } else {
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
        };
    });


    app.delete('/api/contacts/:id', function(req, res) {
        var id = {
            _id: req.params.id
        };
        Contact.remove(id, function(err, data) {
            if (err) {
                console.log(err);
                res.status(400).end();
            } else
                res.status(204).end();

        });
    });

    app.put('/api/contacts/:id', function(req, res) {
        var id = {
            _id: req.params.id
        };
        Contact.update(id, {
            name: req.body.name
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(400).end();
            } else {
                var result = JSON.stringify(res.body)
                res.status(200).send(result).end();
            }
        });
    });
}