var express = require("express");
var Auth = require("./authentication");
var router = express.Router();
var adminHandler = require("../javascripts/admin/adminhandler");
var farmerHandler = require("../javascripts/farmers/farmerhandler");
var customerHandler = require("../javascripts/customers/customershandler");
var productHandler = require("../javascripts/products/productshandler");
var UserTypes = require("../javascripts/commons/constants").usertypes;

/**
 * Approves a farmer.
 */
router.post("/approvefarmer", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	req.body.isApproved = true;
	var data = req.body;
	data = JSON.stringify(data);
	var promise = adminHandler.approvecreatefarmer(data);
	promise.done(function () {
		res.send({
			success: true,
			error: null,
			data: "Farmer registration has been approved successfully!"
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
 * returns the list of un-approved farmers.
 */
router.get("/listunapprovedfarmers", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var promise = adminHandler.getAllUnApprovedFarmers();
	promise.done(function (unapprovedfarmers) {
		res.send({
			success: true,
			error: null,
			data: unapprovedfarmers
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
 * returns the list of un-approved products.
 */
router.get("/listunapprovedproducts", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var promise = adminHandler.getAllUnApprovedProducts();
	promise.done(function (unapprovedproducts) {
		res.send({
			success: true,
			error: null,
			data: unapprovedproducts
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
 * returns the list of un-approved customers.
 */
router.get("/listunapprovedcustomers", Auth.requireLogin, function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
	var promise = adminHandler.getAllUnApprovedCustomers();
	promise.done(function (unapprovedcustomers) {
		res.send({
			success: true,
			error: null,
			data: unapprovedcustomers
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

router.post("/approveproduct", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = adminHandler.approveproduct(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Product has been approved successfully!"
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

router.post("/farmerViewInfo",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    console.log("SSNSNSNSNSNSNSN------"+data);
    var promise = farmerHandler.farmerViewInfo(data);
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

router.post("/customerViewInfo",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = customerHandler.customerViewInfo(data);
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



router.post("/productViewInfo",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = productHandler.searchByProductId(data);
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

router.post("/getFarmersByAdvancedSearch",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = farmerHandler.searchFarmerInfo(data);
    promise.done(function(data){
        res.send({
            success: true,
            error: null,
            data: data
        });
    },function(err){
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
});

router.post("/getProductsByAdvancedSearch",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = productHandler.searchProductInfo(data);
    promise.done(function(data){
        res.send({
            success: true,
            error: null,
            data: data
        });
    },function(err){
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });
});



router.post("/getCustomersByAdvancedSearch",function(req,res){
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = customerHandler.searchCustomerInfo(data);
    console.log("In admin.js for customer");
    promise.done(function(data){
        console.log("Came in admin after success");
        res.send({
            success: true,
            error: null,
            data: data
        });
    },function(err){
        res.status(500)
            .send({
                success: false,
                error: error,
                data: null
            });
    });

});


router.post("/declinefarmer", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    console.log(data);
    var promise = adminHandler.declinefarmer(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Farmer registration has been declined successfully!"
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


router.post("/declineproduct", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    console.log(data);
    var promise = adminHandler.declineproduct(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Product registration has been declined successfully!"
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

router.post("/approveproduct", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = adminHandler.approveproduct(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Product has been approved successfully!"
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



router.post("/approvecustomer", function (req, res) {
	var user = req.session.user;
	if(user.usertype !== UserTypes.ADMIN) {
		res.status(403).send({
			success: false,
			error: "Unauthorized!",
			data: null
		});
	}
    var data = req.body;
    data = JSON.stringify(data);
    var promise = adminHandler.approvecustomer(data);
    promise.done(function () {
        res.send({
            success: true,
            error: null,
            data: "Customer has been approved successfully!"
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
