var mongoose = require('mongoose');

module.exports = mongoose.model('Hotel', {
		_id: String,		
		destination: String,		
		name: String,
		stars: Number,
		wifi : Boolean,
		desayuno: Boolean,
		playa: Boolean,
		cancelacion: Boolean,
		pileta: Boolean,
		ranking : Number,
		url: String,
		price: Number});

