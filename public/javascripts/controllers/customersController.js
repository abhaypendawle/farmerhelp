

var app = angular.module("farmerhelp");
app.controller('CustomersController',["$scope","US_STATES","CustomerService","ValidationService",
    function ($scope, US_STATES, CustomerService,ValidationService) {
    function init(){
        new Card({
            form: document.querySelector('form'),
            container: '.card-wrapper'
        });
    }
    init();

    $scope.USStatesOptions = {
        dataSource: US_STATES,
        dataTextField: "name",
        dataValueField: "abbreviation"
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
            "cardName" : $scope.cardName,
            "cardNumber" : $scope.cardNumber,
            "expiry" : $scope.expiry
        }
        var errors = _getErrors(info);
        if(errors.length > 0 ){
            for(var i = 0 ; i < errors.length ; i++) {
                $scope.errorNotification.show({
                    kValue: errors[i]
                },"ngTemplate");
            }
        }
        else
        {
            var promise = CustomerService.signup(info);
            promise.then(function (result) {
                alert("Customer Created Successfully!");
            }, function (error) {
                alert("Error - " + error);
            });
        }

    }

    $scope.notf1Options = {
        templates: [{
            type: "ngTemplate",
            template: $("#notificationTemplate").html()
        }]
    };


    _getErrors = function (info) {
        var errors = [];
        if(! ValidationService.validateCharacters(info.firstName)) {
             errors.push("First Name can not be empty or invalid!");
        }

        if(!ValidationService.validateCharacters(info.lastName)) {
            errors.push("Last Name can not be empty or invalid!");
        }

        if(! ValidationService.validateEmail(info.email)) {
            errors.push("Email can not be empty or invalid!");
        }

        if(! ValidationService.validatePassword(info.password)) {
            errors.push("Password should contain 8 characters " +
                "1 uppercase character " +
                "1 special character!" +
                "1 digit" +
                "3 lowercase character");
        }

        if(ValidationService.isEmpty(info.phoneNumber)) {
            errors.push("Phone Number can not be empty or invalid!");
        }

        if(! ValidationService.validateSSN(info.ssn)) {
            errors.push("SSN can not be empty or invalid!");
        }

        if( ValidationService.isEmpty(info.address)) {
            errors.push("Address can not be empty!");
        }

        if(ValidationService.isEmpty(info.state)) {
            errors.push("State can not be empty!");
        }

        if(! ValidationService.validateCharacters(info.city)) {
            errors.push("City can not be empty!");
        }

        if(! ValidationService.validateZipCode(info.zipCode)) {
            errors.push("Zip Code can not be empty or invalid!");
        }
        if(! ValidationService.validateCreditCardExpiry(info.expiry)){
            errors.push("Expiry can not be empty or invalid!");
        }
        return errors;
    }

}]);


