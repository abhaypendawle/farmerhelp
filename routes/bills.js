/**
 * Created by Abhay on 4/16/2016.
 */

var express = require("express");
var router = express.Router();
var BillHandler = require("../javascripts/bills/billshandler");
var Auth = require("./authentication");
var UserTypes = require("../javascripts/commons/constants").usertypes;


/**
 * generates the bill.
 */
router.post("/generatebill", Auth.requireLogin, function (req, res) {
    var customerSSN = req.session.user.ssn;
    var promise = BillHandler.generatebill(req.body.info,customerSSN);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Bill generated successfully!"
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

router.post("/addrating", Auth.requireLogin, function (req, res) {
    var promise = BillHandler.addrating(req.body.info);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "rating added successfully!"
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
 * deletes the bill.
 */
router.delete("/:billId", Auth.requireLogin, function (req, res) {
    var promise = BillHandler.delete(req.params.billId);
    promise.done(function () {
        res.status(204).send();
    }, function (error) {
        res.status(500).send({
            success: false,
            error: error,
            data: null
        });
    });
});

/**
 * searches a bill with given bill id.
 */
router.get("/searchbill/:billId", Auth.requireLogin, function (req, res) {
    var promise = BillHandler.searchbill(req.params.billId);
    promise.done(function (result) {
        res.send({
            success: true,
            error: null,
            data: result
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
 * searches all bills with given customer id.
 */
router.get("/getallbills/", Auth.requireLogin, function (req, res) {


    var customerSSN = req.session.user.ssn;
    var promise = BillHandler.getallbills(customerSSN);
    promise.done(function (result) {
        res.send({
            success: true,
            error: null,
            data: result
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

router.get("/getallbillsadmin/", Auth.requireLogin, function (req, res) {
    var user = req.session.user;
    if(user.usertype !== UserTypes.ADMIN) {
        res.status(403).send({
            success: false,
            error: "Unauthorized!",
            data: null
        });
    }
    var promise = BillHandler.getallbillsadmin();
    promise.done(function (result) {
        res.send({
            success: true,
            error: null,
            data: result
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

router.get("/revenue", Auth.requireLogin, function (req, res) {
    var user = req.session.user;
    if(user.usertype !== UserTypes.ADMIN) {
        res.status(403).send({
            success: false,
            error: "Unauthorized!",
            data: null
        });
    }
    var promise = BillHandler.revenue();
    promise.done(function (result) {
        res.send({
            success: true,
            error: null,
            data: result
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

module.exports = router;