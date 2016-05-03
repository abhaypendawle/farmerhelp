
var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var TruckHandler = require("../javascripts/trucks/truckshandler");

/**
 * function to return all trucks in the system.
 */
router.get("/", Auth.requireLogin, function (req, res) {
    var promise = TruckHandler.getAllTrucks();
    promise.done(function (data) {
        res.send({
            success: true,
            error: null,
            data: data
        });
    }, function (error) {
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
});

router.post("/search", Auth.requireLogin, function (req, res) {
    var data = req.body;
    data = JSON.stringify(data);
    var promise = TruckHandler.searchByAnyAttributes(data);
    promise.done(function (truckdata) {
        res.send({
            success: true,
            error: null,
            data: truckdata
        });
    }, function (error) {
        res.send({
            success: false,
            data: null,
            error: error
        });
    });
});

/**
 * get pending requests of drivers.
 */
router.get("/pending", Auth.requireLogin, function (req, res) {
    var promise = TruckHandler.getPendingTrucks();
    promise.done(function (data) {
        res.send({
            success: true,
            error: null,
            data: data
        });
    }, function (error) {
        res.status(500).send({
            success: false,
            error: error,
            data: null
        });
    });
});

router.get("/id/:ssn", Auth.requireLogin, function (req, res) {
    var ssn = req.params.ssn;
    console.log("SSN is " + ssn);
    var promise = TruckHandler.getTruck(ssn);
    promise.done(function (result) {
        console.log("Success");
        res.send({
            success: true,
            data: result,
            error: null
        });
    }, function (error) {
        res.send({
            success: false,
            data: null,
            error: error
        });
    });
});

/**
 * function to update the truck driver.
 */
router.put("/updateTruck", Auth.requireLogin, function (req, res) {
    console.log("in truck.js");
    var info = req.body.info;
    console.log(info);
    var promise = TruckHandler.updateTruckDriver(info);
    promise.done(function (result) {
        console.log("Success");
        res.send({
            success: true,
            data: result,
            error: null
        });
    }, function (error) {
        res.send({
            success: false,
            data: null,
            error: error
        });
    });
});

/**
 * function to register a truck driver into the system.
 */
router.post("/", function (req, res) {
    console.log("info:" + req.body.info);
    var promise = TruckHandler.signuptruck(req.body.info);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Truck registered successfully!"
        });
    }, function (error) {
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
});

/**
 * function to delete a truck driver from the system.
 */

router.delete("/:ssn", Auth.requireLogin, function (req, res) {
    var ssn = req.params.ssn;
    var promise = TruckHandler.delete(ssn);
    promise.done(function () {
        res.status(204)
            .send();
    }, function (error) {
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
});

module.exports = router;
