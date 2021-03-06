
var q = require("q");
var CustomerHandler = require("../customers/customershandler");
var FarmerHandler = require("../farmers/farmerhandler");
var ProductHandler = require("../products/productshandler");
var MongoDB = require("../commons/mongodbhandler");
var UserTypes = require("../commons/constants").usertypes;
var GoogleMaps = require("../commons/googlemapshandler");
var Crypto = require("crypto");

/**
 * deletes a trip from system.
 * @param tripID
 * @returns {*|promise}
 */
exports.deleteTrip = function (tripID) {
	var deferred = q.defer();
	MongoDB.collection("trips").remove({
		tripID: tripID
	}).then(function () {
		deferred.resolve();
	}).catch(function (error) {
		deferred.reject(error);
	});
	return deferred.promise;
};

/**
 * searches all trips by certain driver.
 * @param driverID
 * @returns {*|promise}
 */
exports.findTripsByDriver = function (driverID) {
	var deferred = q.defer();
	var trips = [];
	var cursor = MongoDB.collection("trips").find({
		driverSSN: driverID
	});
	cursor.each(function (error, doc) {
		if (error) {
			deferred.reject(error);
		}
		if (doc != null) {
			trips.push(doc);
		} else {
			deferred.resolve(trips);
		}
	});
	return deferred.promise;
};

/**
 * searches all trips by certain customer.
 * @param driverID
 * @returns {*|promise}
 */
exports.findTripsByCustomer = function (customerID) {
	var deferred = q.defer();
	var trips = [];
	var cursor = MongoDB.collection("trips").find({
		customerSSN: customerID
	});
	cursor.each(function (error, doc) {
		if (error) {
			deferred.reject(error);
		}
		if (doc != null) {
			trips.push(doc);
		} else {
			deferred.resolve(trips);
		}
	});
	return deferred.promise;
};


/**
 * searches all trips by certain city.
 * @param driverID
 * @returns {*|promise}
 */
exports.findTripsByDeliveryCity = function (city) {
	var deferred = q.defer();
	var trips = [];
	var cursor = MongoDB.collection("trips").find({
		customerCity: city
	});
	cursor.each(function (error, doc) {
		if (error) {
			deferred.reject(error);
		}
		if (doc != null) {
			trips.push(doc);
		} else {
			deferred.resolve(trips);
		}
	});
	return deferred.promise;
};

/**
 * finds a trip with given ID.
 * @param tripID
 * @returns {*|promise}
 */
exports.findTripById = function (tripID) {
	var deferred = q.defer();
	var trip = null;
	var cursor = MongoDB.collection("trips").find({
		tripID: tripID
	});

	cursor.each(function (error, doc) {
		if (error) {
			deferred.reject(error);
		}
		if (doc != null) {
			trip = doc;
		} else {
			if (trip === null) {
				deferred.reject("Trip with given ID not found!");
			} else {
				deferred.resolve(trip);
			}
		}
	});
	return deferred.promise;
};

/**
 * returns all trips registered in the system.
 * @returns {*|promise}
 */
exports.getAllTrips = function () {
	var deferred = q.defer();
	var cursor = MongoDB.collection("trips").find();
	var trips = [];
	cursor.each(function (error, doc) {
		if (error) {
			deferred.reject(error);
		}
		if (doc === null) {
			deferred.resolve(trips);
		} else {
			trips.push(doc);
		}
	});
	return deferred.promise;
};

/**
 * creates a new trip with given details.
 * @param customerID
 * @param farmerID
 * @param productID
 */
exports.generateTrip = function (customerID, farmerID, productID) {
	var deferred = q.defer();
	var customerPromise = CustomerHandler.getCustomer(customerID);
	var farmerPromise = FarmerHandler.getFarmerInfo(farmerID);
	var productPromise = ProductHandler.getproductinfo(productID);

	q.all([customerPromise, farmerPromise, productPromise]).done(function (values) {
		var customer = values[0],
			farmer = values[1],
			product = values[2];
		var driverPromise = _findFreeDriver();
		driverPromise.done(function (driver) {
			var journeyPromise = GoogleMaps.getDirections(farmer.location, customer.location);
			journeyPromise.done(function (journeyDetails) {
				var tripDetails = _constructTripDetails(customer, farmer, product, journeyDetails, driver);
				var cursor = MongoDB.collection("trips").insert(tripDetails);
				cursor.then(function () {
					var updateDriver = MongoDB.collection("users").update({ssn: driver.ssn}, {$set: {freeFrom: tripDetails.deliveryTime}});
					updateDriver.then(function () {
						deferred.resolve(tripDetails);
					}).catch(function (error) {
						deferred.reject(error);
					});
				}).catch(function (error) {
					deferred.reject(error);
				});
			}, function (error) {
				deferred.reject(error);
			});
		}, function (error) {
			deferred.reject(error);
		});
	}, function (error) {
		deferred.reject(error);
	});
	return deferred.promise;
};

/**
 * constructs the trip details object from given information.
 * @param customer
 * @param farmer
 * @param product
 * @param journeyDetails
 * @returns
 * @private
 */
_constructTripDetails = function (customer, farmer, product, journeyDetails, driver) {
	var tripID = Crypto.createHash('sha1').update(customer.ssn + farmer.ssn + product.productID + new Date().getTime()).digest('hex'),
		customerAddress = customer.address + " , " + customer.city + " , " + customer.state + " , " + customer.zipCode,
		farmerAddress = farmer.address + " , " + farmer.city + " , " + farmer.state + " , " + farmer.zipCode,
		orderTime = new Date().getTime(),
		deliveryTime = orderTime + (journeyDetails.timeRequired * 100),
		deliverySteps = journeyDetails.steps;

	var tripDetails = {
		tripID: tripID,
		customerSSN: customer.ssn,
		customerFirstName: customer.firstName,
		customerLastName: customer.lastName,
		customerLocation: customer.location,
		farmerSSN: farmer.ssn,
		farmerFirstName: farmer.firstName,
		farmerLastName: farmer.lastName,
		farmerLocation: farmer.location,
		driverSSN: driver.ssn,
		driverFirstName: driver.firstName,
		driverLastName: driver.lastName,
		productID: product.productID,
		productName: product.productName,
		origin: farmerAddress,
		destination: customerAddress,
		orderTime: orderTime,
		deliveryTime: deliveryTime,
		deliverySteps: deliverySteps
	};
	return tripDetails;
};


/**
 * finds a free driver to deliver the shipment at current time.
 * @returns {*|promise}
 * @private
 */
_findFreeDriver = function () {
	var deferred = q.defer();
	var cursor = MongoDB.collection("users").find({
		"usertype": UserTypes.DRIVER,
		"isApproved": true,
		"freeFrom": {$lte: new Date().getTime()}
	});
	var freeDriver = null;
	cursor.each(function (err, doc) {
		if (err) {
			deferred.reject(err);
		}
		if (doc != null) {
			freeDriver = doc;
		} else {
			if (freeDriver) {
				deferred.resolve(freeDriver);
			} else {
				deferred.reject("Driver not free at this time!");
			}
		}
	});
	return deferred.promise;
};


exports.getTripsByDriver = function () {
	var deferred = q.defer();
	var cursor = MongoDB.collection("trips").group(['driverFirstName','driverLastName'],{},{"total":0},"function(obj, prev) {prev.total++;}", function(error, results){
		if(error) {
			deferred.reject(error);
		} else {
			deferred.resolve(results);
		}
	});
	return deferred.promise;
};

exports.getTripsByCustomer = function () {
	var deferred = q.defer();
	MongoDB.collection("trips").group(['customerFirstName','customerLastName'],{},{"total":0},"function(obj, prev) {prev.total++;}", function(error, results) {
		if(error) {
			deferred.reject(error);
		} else {
			deferred.resolve(results);
		}
	});
	return deferred.promise;
};