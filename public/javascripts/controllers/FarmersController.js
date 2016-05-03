

var app = angular.module("farmerhelp");
app.controller('FarmersController',["$scope","US_STATES","FarmerService","ProductService",function ($scope, US_STATES, FarmerService,ProductService) {
    /*
    function init(){
        new Card({
            form: document.querySelector('form'),
            container: '.card-wrapper'
        });
    }
    init();
    */
//abhaygit add
    $scope.USStatesOptions = {
        dataSource: US_STATES,
        dataTextField: "name",
        dataValueField: "abbreviation"
    };

    $scope.signup = function () {
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
            "zipCode": $scope.zipcode
        }
        var promise = FarmerService.signup(info);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }


    $scope.insertTweet = function () {
        var info = {
            "tweetValue" : $scope.tweetValue
        }
        var promise = FarmerService.postTweet(info);
        promise.then(function (result) {
            alert("Success!");
            $scope.showTweets();
        }, function (error) {
            alert("Error - " + error);
        });

    }


    $scope.showTweets = function()
    {
        $scope.vari = 3;
        var promise = FarmerService.getMyTweets();
        promise.then(function (result) {
            $scope.data = result.data.data;
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.regProduct = function ()
    {
        $scope.vari = 2;
    }

    $scope.regResource = function ()
    {
        $scope.vari = 4;
    }


    $scope.getMyProfile = function () {
        $scope.vari = 1;
        var promise = FarmerService.getMyProfile();
        promise.then(function (result) {
            alert(result.data.data.password);
            $scope.data = result.data.data;
            $scope.abcd = 2;
            $scope.farmlength = result.data.data.length;
            for(var i = 0 ; i < US_STATES.length; i++ ) {
                if(US_STATES[i].abbreviation === $scope.data.state) {
                    $scope.stateDropDownList.select(i);
                    break;
                }
            }


        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.updateFarmerProfile = function () {
        var info =
        {
            "firstName": $scope.data.firstName,
            "lastName": $scope.data.lastName,
            "email": $scope.data.email,
            "password" : $scope.data.password,
            "phoneNumber": $scope.data.phoneNumber,
            "ssn": $scope.data.ssn,
            "address": $scope.data.address,
            "state": $scope.state,
            "city": $scope.data.city,
            "zipCode": $scope.data.zipCode,
            "usertype" : $scope.data.usertype,
            "rating" : $scope.data.rating,
            "reviews" : $scope.data.reviews,
            "location" : $scope.data.location
        }
        var promise = FarmerService.updateFarmerProfile(info);
        promise.then(function (result) {
            $scope.data = result.data.data;
            $scope.abcd = 2;



        }, function (error) {
            alert("Error - " + error);
        });

    };


    $scope.createproduct = function () {
           $scope.vari = 2;
        var info = {
            "productName": $scope.productName,
            "productPrice": $scope.productPrice,
            "description": $scope.description,
            "productImage": $scope.productImage

        }
        var promise = ProductService.createproduct(info);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }


    $scope.createResource = function () {
        $scope.vari = 4;
        var info = {
            "resourceName": $scope.resourceName,
            "resourcePrice": $scope.resourcePrice,
            "resourcedescription": $scope.resourcedescription,
            "resourceImage": $scope.resourceImage

        }
        var promise = FarmerService.createresource(info);
        promise.then(function (result) {
            alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }




}]);


