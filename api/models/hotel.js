var mongoose = require('mongoose');

module.exports = mongoose.model('Hotel', {
		destination: String,		
		name: String,
		stars: Number,
		services : [String],
		price: Number});

