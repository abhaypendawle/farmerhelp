
var app = angular.module("farmerhelp");

app.controller("TrucksController", ["$scope","TruckService", "US_STATES","ValidationService", function ($scope, TruckService, US_STATES, ValidationService) {

	$scope.credentials = {};
	$scope.emailError = null;
	$scope.USStatesOptions = {
		dataSource: US_STATES,
		dataTextField: "name",
		dataValueField: "abbreviation"
	};

	$scope.emailChanged = function () {
		if(!ValidationService.validateEmail($scope.email)) {
			$scope.emailError = "Email not valid!";
		} else {
			$scope.emailError = null;
		}
	}

	$scope.nextTab = function () {
		$scope.trucksTabStrip.select(1);
	};

	$scope.notf1Options = {
		templates: [{
			type: "ngTemplate",
			template: $("#notificationTemplate").html()
		}]
	};

	$scope.signup = function () {

		if($scope.credentials.password !== $scope.verifyPassword){
			$scope.errorNotification.show({
				kValue: "Password do not match!"
			},"ngTemplate");
		}

		var info = {
			"firstName": $scope.firstName,
			"lastName": $scope.lastName,
			"email": $scope.email,
			"password": $scope.credentials.password,
			"phoneNumber": $scope.phone,
			"ssn": $scope.ssn,
			"address": $scope.address,
			"state": $scope.state,
			"city": $scope.city,
			"zipCode": $scope.zipcode,
			"truckManufacturer": $scope.truckManufacturer,
			"truckModel": $scope.truckModel
		}
		var errors = _getErrors(info);
		if(errors.length > 0 ){
			for(var i = 0 ; i < errors.length ; i++) {
				$scope.errorNotification.show({
					kValue: errors[i]
				},"ngTemplate");
			}
		} else {
			var promise = TruckService.signup(info);
			promise.then(function (result) {
				alert("Success!");
			}, function (error) {
				alert("Error - " + error);
			});
		}
	};

	_getErrors = function (info) {
		var errors = [];
		if(ValidationService.isEmpty(info.firstName)) {
			errors.push("First Name can not be empty!");
		}
		if(ValidationService.isEmpty(info.lastName)) {
			errors.push("Last Name can not be empty!");
		}if(ValidationService.isEmpty(info.email)) {
			errors.push("Email can not be empty!");
		}if(ValidationService.isEmpty(info.password)) {
			errors.push("Password can not be empty!");
		}if(ValidationService.isEmpty(info.phoneNumber)) {
			errors.push("Phone Number can not be empty!");
		}if(ValidationService.isEmpty(info.ssn)) {
			errors.push("SSN can not be empty!");
		}if(ValidationService.isEmpty(info.address)) {
			errors.push("Address can not be empty!");
		}if(ValidationService.isEmpty(info.state)) {
			errors.push("State can not be empty!");
		}if(ValidationService.isEmpty(info.city)) {
			errors.push("City can not be empty!");
		}if(ValidationService.isEmpty(info.zipCode)) {
			errors.push("Zip Code can not be empty!");
		}if(!ValidationService.validateEmail(info.email)){
			errors.push("Email not valid.");
		}if(!ValidationService.validateSSN(info.ssn)){
			errors.push("SSN not valid.");
		}if(!ValidationService.validateZipCode(info.zipCode)){
			errors.push("Zip code not valid.");
		}
		return errors;
	}
}]);