var mongoose = require('mongoose');

module.exports = mongoose.model('Hotel', {
		destination: String,		
		name: String,
		stars: Number,
		wifi : Boolean,
		desayuno: Boolean,
		playa: Boolean,
		cancelacion: Boolean,
		pileta: Boolean,
		url: String,
		price: Number});

