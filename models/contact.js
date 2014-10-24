
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var contactSchema = new mongoose.Schema({
    name: String,
    mobilephone: String,
    homephone: String
});

// Retorna model
module.exports = restful.model('Contacts', contactSchema);