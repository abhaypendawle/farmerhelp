
angular.module("farmerhelp").controller("TripsController", ["$scope", "$routeParams", "TripsService",
	function ($scope, $routeParams, TripsService) {
		$scope.tripID = $routeParams.tripId;
		$scope.customMarkers = [];
		init = function () {
			var promise = TripsService.getTripDetails($scope.tripID);
			promise.then(function (tripDetails) {
				$scope.tripDetails = tripDetails;
				calculateDeliveryStatus(tripDetails);
				calculateCustomMarkers(tripDetails);
			}).catch(function (error) {
				alert("Error: " + error);
			});
		}

		calculateCustomMarkers = function (tripDetails) {
			var truckLocation = null;
			if(tripDetails.deliveryTime >= new Date().getTime()) {
				var random = Math.floor(Math.random() * (tripDetails.deliverySteps.length - 0 + 1)) + 0;
				truckLocation = tripDetails.deliverySteps[random].location;
			} else {
				truckLocation = tripDetails.customerLocation;
			}
			$scope.customMarkers = [
				{
					address: tripDetails.origin,
					name: tripDetails.farmerFirstName + " " + tripDetails.farmerLastName,
					title: "Farmer"
				},
				{
					address: truckLocation,
					name: tripDetails.driverFirstName + " " + tripDetails.driverLastName,
					title: "Truck"
				},
				{
					address: tripDetails.destination,
					name: tripDetails.customerFirstName + " " + tripDetails.customerLastName,
					title: "Customer"
				}
			]
		}

		calculateDeliveryStatus = function (tripDetails) {
			$scope.orderDateString = calculateDateString(tripDetails.orderTime);
			$scope.expectedDeliveryDateString = calculateDateString(tripDetails.deliveryTime);
			$scope.deliveryStatus = getDeliveryStatus(tripDetails.deliveryTime);
		}

		calculateDateString = function (date) {
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var string = "";
			if (isNaN(date)) {
				date = Number(date);
			}
			date = new Date(date);
			string += date.getUTCDate() + " " + months[date.getUTCMonth()] + ", " + date.getUTCFullYear() + " ";
			string += date.getUTCHours() + ":" + date.getUTCMinutes();
			return string;
		}

		getDeliveryStatus = function (date) {
			if (isNaN(date)) {
				date = Number(date);
			}
			if (date >= new Date().getTime()) {
				return "In Transit";
			} else {
				return "Delivered!";
			}
		}

		init();
	}
]);