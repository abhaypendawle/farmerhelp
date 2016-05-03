
angular.module("farmerhelp").factory("TripAnalyticsService", ["$q","$window","$http", function ($q, $window, $http) {
	var TripAnalyticsService = {

		/**
		 * returns the trips per driver.
		 * @returns {*|promise}
		 */
		getTripsPerDriver: function () {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "http://farmerhelp.mybluemix.net/trips/analytics/bydriver"
			}).then(function (data) {
				if(data.data.success) {
					deferred.resolve(data.data.data);
				} else {
					deferred.reject(data.data.error);
				}
			}).catch(function (error) {
				if(error.status === 403) {
					$window.location.href = "http://farmerhelp.mybluemix.net/#/auth/login";
				}
				deferred.reject(error.data.error);
			});
			return deferred.promise;
		},

		/**
		 * returns the trips per customer.
		 * @returns {*|promise}
		 */
		getTripsPerCustomer: function () {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "http://farmerhelp.mybluemix.net/trips/analytics/bycustomer"
			}).then(function (data) {
				if(data.data.success) {
					deferred.resolve(data.data.data);
				} else {
					deferred.reject(data.data.error);
				}
			}).catch(function (error) {
				if(error.status === 403) {
					$window.location.href = "http://farmerhelp.mybluemix.net/#/auth/login";
				}
				deferred.reject(error.data.error);
			});
			return deferred.promise;
		},

		/**
		 * returns all trips.
		 */
		getAllTrips: function () {
			var deferred = $q.defer();
			$http({
				method: "GET",
				url: "http://farmerhelp.mybluemix.net/trips"
			}).then(function (result) {
				if(result.data.success) {
					deferred.resolve(result.data.data);
				} else {
					deferred.reject(result.data.error);
				}
			}).catch(function (error) {
				if(error.status === 403 ) {
					$window.location.href = "http://farmerhelp.mybluemix.net/#/auth/login";
				}
				deferred.reject(error.data.error);
			});
			return deferred.promise;
		}
	};
	return TripAnalyticsService;
}]);
