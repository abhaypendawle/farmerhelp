/**
 * Created by SHAILESH-PC on 4/14/2016.
 */
var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var FarmerHandler = require("../javascripts/farmers/farmerhandler");

/**
 * function to register a truck driver into the system.
 */
router.post("/", function (req, res) {
    var promise = FarmerHandler.createfarmer(req.body.info);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Farmer has been registered successfully!"
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

router.delete("/:ssn", Auth.requireLogin, function (req, res) {
    var ssn = req.params.ssn;
    var promise = FarmerHandler.delete(ssn);
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


router.post("/searchFarmers", Auth.requireLogin, function (req, res) {
    var data = req.body;
    data = JSON.stringify(data);
    var promise = FarmerHandler.searchFarmerInfo(data);
    promise.done(function (farmerdata) {
        res.send({
            success: true,
            error: null,
            data: farmerdata
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

router.get("/listfarmers", Auth.requireLogin, function (req, res) {
    var promise = FarmerHandler.getAllFarmers();
    promise.done(function (farmerlist) {
        res.send({
            success: true,
            error: null,
            data: farmerlist
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


router.get("/:ssn", Auth.requireLogin, function (req, res) {
    var ssn = req.session.user.ssn;
    console.log("Session is" + ssn);
    var promise = FarmerHandler.getFarmerInfo(ssn);
    promise.done(function (farmerinfo) {
        res.send({
            success: true,
            error: null,
            data: farmerinfo
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

router.put("/updateFarmer", Auth.requireLogin, function (req, res) {
    console.log("In farmer.js");
    var promise = FarmerHandler.updateFarmer(req.body.info);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Farmer data updated"
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

router.post("/searchfarmpract", function (req, res)
{  console.log("here cominh");
    var data = req.body.type;
    console.log(data);
    data = JSON.stringify(data);
    var promise = FarmerHandler.searchfarmpract(data);
    promise.done(function (farmerdata) {
        console.log(farmerdata);
        res.send({
            success: true,
            error: null,
            data: farmerdata
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


router.post("/postTweet", Auth.requireLogin, function (req, res) {
    console.log("Here");
    var user = req.session.user;
    var promise = FarmerHandler.regtweet(req.body.info, user);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Tweet Added successfully!"
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


router.post("/getMyTweets", Auth.requireLogin, function (req, res) {
    var promise = FarmerHandler.getAllTweets();
    promise.done(function (tweetList) {
        res.send({
            success: true,
            error: null,
            data: tweetList
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


router.post("/regResource", Auth.requireLogin, function (req, res) {
    console.log("Here");
    var user = req.session.user;
    var promise = FarmerHandler.createResource(req.body.info, user);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Resource Added successfully!"
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


router.post("/getMyResources", Auth.requireLogin, function (req, res) {
    var promise = FarmerHandler.getAllResources();
    promise.done(function (resourceList) {
        res.send({
            success: true,
            error: null,
            data: resourceList
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



router.post("/requestResource", Auth.requireLogin, function (req, res) {
    console.log("Here");
    var user = req.session.user;
    var promise = FarmerHandler.ResourceRequest(req.body.info, user);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Resource Request Added successfully!"
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



router.post("/getWhoReqMyResource", Auth.requireLogin, function (req, res) {
    var promise = FarmerHandler.getWhoReqMyResource(req.session.user.ssn);
    promise.done(function (resourceList) {
        res.send({
            success: true,
            error: null,
            data: resourceList
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
