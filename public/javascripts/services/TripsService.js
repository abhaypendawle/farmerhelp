
angular.module("farmerhelp").factory("TripsService",["$window","$http", "$q", function ($window, $http, $q) {
	var TripsService = {
		getTripDetails: function (tripID) {
			var deferred = $q.defer();
			var url = "http://farmerhelp.mybluemix.net/trips/id/" + tripID;
			$http({
				url: url,
				method: "GET"
			}).then(function (data) {
				if(data.data.success) {
					deferred.resolve(data.data.data);
				} else {
					deferred.reject(data.data.error);
				}
			}).catch(function (error) {

				if(error.status=== 403)
				{
					$window.location.href="http://farmerhelp.mybluemix.net/#/auth/login";
				}
				deferred.reject(error.data.error);
			});
			return deferred.promise;
		}
	};
	return TripsService;
}]);