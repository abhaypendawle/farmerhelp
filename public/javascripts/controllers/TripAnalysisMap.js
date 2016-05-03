
var app = angular.module("farmerhelp");

app.controller("TripAnalysisMap", ["$scope","TripAnalyticsService", function ($scope, TripAnalyticsService) {
	var promise = TripAnalyticsService.getAllTrips();
	promise.then(function (result) {
		$scope.polylines = _processPolylines(result);
	});

	/**
	 * extracts polyline path for all trips.
	 * @param result
	 * @returns {Array}
	 * @private
	 */
	_processPolylines = function (result) {
		var polylines = [];
		for(var i = 0 ; i < result.length ; i++) {
			polylines.push([result[i].farmerLocation, result[i].customerLocation]);
		}
		return polylines;
	}
}]);