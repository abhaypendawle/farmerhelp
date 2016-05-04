
var app = angular.module("farmerhelp");
app.controller('BillsController',["$scope","$window","BillService",function ($scope, $window, BillService) {

 //$scope.rating = {"rating1" : 5 };

    $scope.generatebill = function () {
        var info =  {
                        "total_amount": 10,
                        "customer_id": "986-55-7845",
                        "product_details": [{
                                            "farmer_id" : '111-11-8000',
                                            "product_id": '211294ebbe0a46ca55fa307737e1e4e68676c92c',
                                            "quantity": 3,
                                            "price_per_unit": 19.99
                                        },
                                        {
                                            "farmer_id" : '111-11-9910',
                                            "product_id": '323e5e13ac8bbfbdd3a5e306a76bac65f30076e4',
                                            "quantity": 2,
                                            "price_per_unit": 29.99
                                        }]
                    }

        var promise = BillService.generatebill(info);
        promise.then(function (result) {
            //alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.ratingSelected = function (rating,product_id)
    {
        var info = {
                        "rating" : rating,
                        "product_id" : product_id
                    }
       var promise = BillService.addrating(info);
        promise.then(function (result) {
            //alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.deletebill = function (billId) {
        var promise = BillService.deletebill(billId);
        promise.then(function (result) {
            //alert("Success!");
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.searchbill = function (billId) {
        var promise = BillService.searchbill(billId);
        promise.then(function (result) {
            $scope.result = result;
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.getallbills = function () {
        //alert("")
        var promise = BillService.getallbills();
        promise.then(function (result) {
            $scope.result = result;
            calculateExpectedDeliveryDates();
        }, function (error) {
            alert("Error - " + error);
        });
    }

    $scope.revenue = function (){
        var promise = BillService.revenue();
        promise.then(function (result) {
        }, function (error) {
            alert("Error - " + error);
        });
    }

  /*  $scope.rating.rateFunction = function(rating){
        console.log("rating***************************************************");
    }*/

    $scope.trackPackage = function(tripId){
        //alert(tripId);
        var url = "/#trips/track/" + tripId;
        $window.location.href = url;
    }

    calculateExpectedDeliveryDates = function ()
    {
        var currentDate = new Date();
        for(bill in $scope.result) {
            items = $scope.result[bill].item_details;
            for(var i=0;i<items.length;i++) {
                var item = items[i];
                if(item.expected_delivery_date > currentDate) {
                    item.expectedDeliveryDate =  formatDate(item.expected_delivery_date);
                    //items.push({})
                } else {
                    item.expectedDeliveryDate = "Delivered!";
                }
            }
        }
    }

    formatDate = function (date1) {
        date1 = Number(date1);
        date = new Date(date1);
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var string = "";
        string += date.getUTCDate() + " " + months[date.getUTCMonth()] + ", " + date.getUTCFullYear();
        string += " - " + date.getUTCHours() + ":" + date.getUTCMinutes();
        return string;
    }

}]);

