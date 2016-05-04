

var app = angular.module("farmerhelp");
app.controller('AdminController',["$scope", "$window", "$rootScope", "AdminService",function ($scope, $window, $rootScope, AdminService) {
	$scope.Customers = true;
	$scope.Farmers = true;
	$scope.Products = true;
	$scope.Trucks = true;

	$scope.$watch('type', function( val ) {
		if( val === 'Customers' ) {
			$scope.Customers = false;
			$scope.Farmers = true;
			$scope.Products = true;
			$scope.Trucks = true;
		} else if(val == 'Farmers'){
			$scope.Farmers = false;
			$scope.Customers = true;
			$scope.Products = true;
			$scope.Trucks = true;
		}
		else if(val == 'Products'){
			$scope.Products = false;
			$scope.Farmers = true;
			$scope.Customers = true;
			$scope.Trucks = true;
		}
		else if(val == 'Trucks')
		{
			$scope.Trucks = false;
			$scope.Farmers = true;
			$scope.Customers = true;
			$scope.Products = true;
		}
	});

	function init()
	{
		if(!$rootScope.variable)
		{
			$scope.getPendingCustomers();
			$scope.getPendingFarmers();
			$scope.getPendingProducts();
			$scope.getPendingTrucks();
			$rootScope.variable = 1;
		}
	}

	$scope.goToHome = function(){
		$window.location.href = "/#admin/home";
	}

    $scope.options = {
        tabPosition: "left"
    }

	$scope.onAdvancedSearchWindowOpen = function () {
		$scope.typeSelectionList.select(0);
		$scope.type = "Farmers";
	}
	$scope.getPendingFarmers = function () {
		var promise = AdminService.signup();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$rootScope.farmlength = result.data.data.length;
			$rootScope.variable = 1;
		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};


	$scope.declineReq = function (ssn,productID,usertype) {
		var promise = AdminService.declineReq(ssn,productID);
		promise.then(function (result) {
			if (result == "f") {
				if (usertype == "FARMER") {
					$scope.getPendingFarmers();
				}
				else if (usertype == "CUSTOMER")
				{
					$scope.getPendingCustomers();
				}
				else
				{
					$scope.getPendingTrucks();
				}
			}
			else
			{
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};


	$scope.approveReq = function (ssn,productID,usertype) {
		//alert(productID);
		var promise = AdminService.approveReq(ssn,productID);
		promise.then(function (result) {
			if (result == "f") {
				if (usertype == "FARMER") {

					$scope.getPendingFarmers();
				}
				else if (usertype == "CUSTOMER")
				{
					$scope.getPendingCustomers();
				}
				else
				{
					$scope.getPendingTrucks();
				}
			}
			else
			{
				$scope.getPendingProducts();
			}
			//$scope.abcd = 2;

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};


	$scope.getPendingCustomers = function () {
		var promise = AdminService.getPendingCustomers();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 2;
			$rootScope.custlength = result.data.data.length;
			$rootScope.variable = 2;
			/*$window.location.href = "/#admin/home";*/

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};

	$scope.getPendingTrucks = function(){
		var promise = AdminService.getPendingTrucks();
		promise.then(function (result) {
			//alert("IN controller after result");
			$scope.data = result.data;
			$scope.abcd = 2;
			$rootScope.trucklength = result.data.data.length;
			$rootScope.variable = 7;

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	}

	$scope.getPendingProducts = function () {
		var promise = AdminService.getPendingProducts();
		promise.then(function (result) {
			$scope.data = result.data;
			$scope.abcd = 1;
			$rootScope.prodlength = result.data.data.length;
			$rootScope.variable = 3;
			/*$window.location.href = "/#admin/home";*/

		}, function (error) {
			alert("Error - " + error.data.error);
		});
	};

	$scope.advancedSearchWindowOptions = {
		title: "Advanced Search",
		visible: false,
		modal: true,
		width: "660",
		height: "450"
	}




	$scope.advancedSearchFarmers = function(){
		var info = {
			"firstName" : $scope.ffirstName,
		 "lastName" : $scope.lastName,
		 "city" : $scope.city,
		 "zipcode" : $scope.zipcode
		}
		var promise = AdminService.getFarmersByAdvancedSearch(info);
		promise.then(function(result){
			$scope.result = result.data.data;
			$rootScope.farmerResult = result.data.data;
			$rootScope.variable = 4;
			$window.location.href = "/#admin/farmersearch";
		},function(err){
			alert("Error -" + err.data.error);
		});
	}

	$scope.advancedSearchTrucks = function(){

		var info = {
			"firstName" : $scope.firstName,
			"lastName" : $scope.lastName,
			"truckManufacturer" : $scope.truckManufacturer,
			"truckModel" : $scope.truckModel,
			"email" : $scope.email,
			"ssn" : $scope.ssn
		}
		var promise = AdminService.getTrucksByAdvancedSearch(info);
		promise.then(function(result){

			$scope.result = result.data.data;
			$rootScope.truckResult = result.data.data;
			$rootScope.variable = 8;
			$window.location.href = "/#admin/trucksearch";
		},function(err){
			alert("Error -" + err.data.error);
		});
	}

	$scope.viewFarmerInfo = function(ssn){
	//alert(ssn);
		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.farmerViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error - " + err.data.error);
		});
	}

	$scope.updateInfoFarmer = function () {
		var info =
		{
			"firstName": $scope.res.firstName,
			"lastName": $scope.res.lastName,
			"email": $scope.res.email,
			"password" : $scope.res.password,
			"phoneNumber": $scope.res.phoneNumber,
			"ssn": $scope.res.ssn,
			"address": $scope.res.address,
			"state": $scope.res.state,
			"city": $scope.res.city,
			"zipCode": $scope.res.zipCode,
			"usertype" : $scope.res.usertype,
			"isApproved" : $scope.res.isApproved,
			"rating" : $scope.res.rating,
			"reviews" : $scope.res.reviews,
			"location" : $scope.res.location
		}
		var promise = AdminService.updateFarmerInfo(info);
		promise.then(function (result) {
			$scope.data = result.data.data;
			$scope.abcd = 2;
			$window.location.href = "/#admin/home"
		}, function (error) {
			alert("Error - " + error.data.error);
		});
	}

	$scope.updateInfoProduct = function(){
		var info = {
			"productName": $scope.res.productName,
			"productPrice": $scope.res.productPrice,
			"description": $scope.res.description,
			"farmerFirstName": $scope.res.farmerFirstName,
			"farmerLastName": $scope.res.farmerLastName,
			"farmerSSN": $scope.res.farmerSSN,
			"productImage": $scope.res.productImage,
			"productID": $scope.res.productID,
			"reviews": $scope.res.reviews,
			"isApproved": $scope.res.isApproved
		}
		var promise = AdminService.updateProductInfo(info);
		promise.then(function (result) {
			$scope.data = result.data.data;
			$scope.abcd = 1;
			$window.location.href = "/#admin/home"
		}, function (error) {
			alert("Error - " + error.data.error);
		});
	}

	$scope.updateInfoTruck = function(){
		var info = {
			"firstName": $scope.res.firstName,
			"lastName": $scope.res.lastName,
			"email": $scope.res.email,
			"password" : $scope.res.password,
			"phoneNumber": $scope.res.phoneNumber,
			"ssn": $scope.res.ssn,
			"address": $scope.res.address,
			"state": $scope.res.state,
			"city": $scope.res.city,
			"zipCode": $scope.res.zipCode,
			"isApproved" : $scope.res.isApproved,
			"usertype" : $scope.res.usertype,
			"location" : $scope.res.location,
			"truckManufacturer" : $scope.res.truckManufacturer,
			"truckModel" : $scope.res.truckModel,
			"freeFrom" : $scope.res.freeFrom
		};
		var promise = AdminService.updateTruckInfo(info);
		promise.then(function (result) {
			$scope.data = result.data.data;
			$scope.abcd = 2;
			$window.location.href = "/#admin/home"
		}, function (error) {
			alert("Error - " + error.data.error);
		});
	}

	$scope.goToRevenuePerDay = function(){
		$window.location.href = "http://farmerhelp.mybluemix.net/#analytics/revenue";
	}
	$scope.goToTripsPerCustomer = function(){
		$window.location.href =  "http://farmerhelp.mybluemix.net/#analytics/tripspercustomer";
	}

	$scope.goToTripsPerDriver = function(){
		$window.location.href = "http://farmerhelp.mybluemix.net/#analytics/tripsperdriver";
	}

	$scope.goToTripsAnalyticsMap = function(){
		$window.location.href = "http://farmerhelp.mybluemix.net/#analytics/tripsanalysismap";
	}



	$scope.getBillInfo = function(){
		var promise = AdminService.getBillInformation();
		promise.then(function(result){
			$scope.data = result.data.data;
			var bills = [];
			for(var bill in $scope.data) {
				bills.push($scope.data[bill]);
			}
			$scope.data = bills;
			$rootScope.variable = 10;
		},function(error){
			alert("Error - " + error.data.error);
		});
	}

	$scope.getTripsInfo = function(){
		var promise = AdminService.tripsInfo();
		promise.then(function (result) {
			$scope.data = result.data.data;
			$rootScope.variable = 9;
			for(var i = 0 ; i < $scope.data.length ; i++) {
				$scope.data[i].orderTimeString = new Date($scope.data[i].orderTime).toLocaleDateString();
				$scope.data[i].deliveryTimeString = new Date($scope.data[i].deliveryTime).toLocaleDateString();
				$scope.data[i].deliveryString = (new Date().getTime() > new Date($scope.data[i].deliveryTime))? "Delivered!": "In transit";
			}
		}, function (error) {
			alert("Error - " + error.data.error);
		});
	}

	$scope.updateInfoCustomer = function (){
		var info =
		{
			"firstName": $scope.res.firstName,
			"lastName": $scope.res.lastName,
			"email": $scope.res.email,
			"password" : $scope.res.password,
			"phoneNumber": $scope.res.phoneNumber,
			"ssn": $scope.res.ssn,
			"address": $scope.res.address,
			"state": $scope.res.state,
			"city": $scope.res.city,
			"zipCode": $scope.res.zipCode,
			"isApproved" : $scope.res.isApproved,
			"usertype" : $scope.res.usertype,
			"location" : $scope.res.location,
			"cardName" : $scope.res.cardName,
			"cardNumber" : $scope.res.cardNumber,
			"expiry" : $scope.res.expiry
		}
		var promise = AdminService.updateCustomerInfo(info);
		promise.then(function (result) {
			$scope.data = result.data.data;
			$scope.abcd = 2;
			$window.location.href = "/#admin/home"
		}, function (error) {
			alert("Error - " + error.data.error);
		});
	}

	$scope.viewCustomerInfo = function(ssn){
		//alert(ssn);
		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.customerViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -"+err.data.error);
		});
	}

	$scope.viewProductInfo = function(productid){
		var info = {
			"productID" : productid
		}
		var promise = AdminService.productViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -"+err.data.error);
		});

	}

	$scope.viewTruckInfo = function(ssn){
		var info = {
			"ssn" : ssn
		}
		var promise = AdminService.truckViewInfo(info);
		promise.then(function(res){
			$scope.res = res.data.data;
		},function(err){
			alert("Error -" + err.data.error);
		});

	}

	$scope.advancedSearchCustomers = function(){
		var info = {
			"firstName" : $scope.firstName,
			"lastName" : $scope.lastName,
			"city" : $scope.city,
			"zipcode" : $scope.zipcode
		}
		var promise = AdminService.getCustomersByAdvancedSearch(info);
		promise.then(function(result){
			$scope.result = result.data.data;
			$rootScope.customerResult = result.data.data;
			$rootScope.variable = 5;
			$window.location.href = "/#admin/customersearch";
		},function(err){
			alert("Error -" + err.data.error);
		});
	}

	$scope.advancedSearchProducts = function(){
		var info ={
			"productName" : $scope.productName,
			"description" : $scope.description,
			"farmerFirstName" : $scope.farmerFirstName,
			"farmerLastName" : $scope.farmerLastName,
			"productPrice" : $scope.productPrice,
			"farmerSSN" : $scope.farmerSSN
		}

		var promise = AdminService.getProductsByAdvancedSearch(info);
		promise.then(function(result){
			$scope.result = result.data.data;
			$rootScope.productResult = result.data.data;
			$rootScope.variable = 6;
			$window.location.href = "/#admin/productsearch";
		},function(err){
			alert("Error: " + err.data.error);
		});
	}
	init();

}]);