
var express = require("express");
var router = express.Router();
var Auth = require("./authentication");
var TripHandler = require("../javascripts/trips/tripshandler");
var UserTypes = require("../javascripts/commons/constants").usertypes;

router.get("/", Auth.requireLogin, function (req, res) {
	var promise = TripHandler.getAllTrips();
	promise.done(function (result) {
		console.log("In trips.js");
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

/**
 * function to generate a new trip.
 */
router.post("/", Auth.requireLogin, function (req, res) {
	var customerID = req.body.customerID,
		farmerID = req.body.farmerID,
		productID = req.body.productID;
	var promise = TripHandler.generateTrip(customerID, farmerID, productID);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: "Trip registered successfully!"
		});
	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

/**
 * finds a trip with given trip ID.
 */
router.get("/id/:tripID", Auth.requireLogin, function (req, res) {
	var tripID = req.params.tripID;
	var promise = TripHandler.findTripById(tripID);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

router.get("/analytics/bydriver", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var promise = TripHandler.getTripsByDriver();
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.send({
			success: false,
			error: error,
			data: null
		});
	});
});

router.get("/analytics/bycustomer", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var promise = TripHandler.getTripsByCustomer();
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.send({
			success: false,
			error: error,
			data: null
		});
	});
});


/**
 * finds a trip with given driver ID.
 */
router.get("/driver/:driverID", Auth.requireLogin, function (req, res) {
	var driverID = req.params.driverID;
	var promise = TripHandler.findTripsByDriver(driverID);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

/**
 * finds a trip with given customer ID.
 */
router.get("/customer/:customerID", Auth.requireLogin, function (req, res) {
	var customerID = req.params.customerID;
	var promise = TripHandler.findTripsByCustomer(customerID);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});


/**
 * finds a trip with given city.
 * //TODO fix this. Does not work!
 */
router.get("/city/:city", Auth.requireLogin, function (req, res) {
	var city = req.params.city;
	var promise = TripHandler.findTripsByDeliveryCity(city);
	promise.done(function (result) {
		res.send({
			success: true,
			error: null,
			data: result
		});
	}, function (error) {
		res.status(500).send({
			success: false,
			error: error,
			data: null
		});
	});
});

module.exports = router;
