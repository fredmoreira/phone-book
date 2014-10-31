// Dependencies
var mongoose = require('mongoose');

// Schema
var ContactModel = function() {
	var contactSchema = mongoose.Schema({
		name: String,
		mobilephone: String,
		homephone: String
	}, {
		collection: 'contacts'
	});

	return mongoose.model('contacts', contactSchema);
};
// Retorna model
module.exports = new ContactModel();