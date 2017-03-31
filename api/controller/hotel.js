//File: controllers/notebooks.js
//var mongoose = require('mongoose');
var Hotel  = require('../models/hotel');

//GET - Return all notebooks in the DB
exports.findAllHotels = function(req, res) {
	Hotel.find(function(err, hotels) {
    if(err) res.send(500, err.message);

    console.log('GET /hotel')
		res.status(200).jsonp(hotels);
	});
};

//GET - Return a Notebook with specified ID
exports.findByDestination = function(req, res) {
	Hotel.find({'destination' :req.params.destination}, function(err, hotel) {
    if(err) return res.send(500, err.message);

    console.log('GET /hotel/' + req.params.destination);
		res.status(200).jsonp(hotel);
	});
};

exports.deleteHotel = function(req, res) {
	Hotel.remove({'id' :req.params.id}, function(err, hotel) {
    if(err) return res.send(500, err.message);

    console.log('DELETE /hotel/' + req.params.id);
		res.status(200).jsonp(hotel);
	});
};

//POST - Insert a new Notebook in the DB
exports.addHotel = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var hotel = new Hotel({
		name:    req.body.name,
		destination:   req.body.destination,
		price:  req.body.price,
		stars:  req.body.stars,
		wifi:  req.body.wifi,
		pileta: req.body.pileta,
		desayuno: req.body.desayuno,
		cancelacion: req.body.cancelacion,
		ranking: req.body.ranking,		
		recepcion: req.body.recepcion,
		playa: req.body.playa,
		url: req.body.url
	});

	hotel.save(function(err, notebook) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(notebook);
	});
};
