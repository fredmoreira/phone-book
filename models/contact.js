
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    name: String,
    mobilephone: Number,
    homephone: Number
});

// Retorna model
module.exports = restful.model('Contacts', productSchema);