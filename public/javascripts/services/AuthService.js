
angular.module("farmerhelp").factory("AuthService",["$http","$q", function ($http, $q) {
	var AuthService = {
		login: function (email, password) {
			var url = "http://farmerhelp.mybluemix.net/auth/login";
			var def = $q.defer();
			$http({
				method: "POST",
				url: url,
				data: {
					email: email,
					password: password
				}
			}).then(function (data) {
				if (data.data.success) {
					def.resolve(data.data.data);
				} else {
					def.reject(data.data.error);
				}
			}, function (error) {
				def.reject(error.data);
			});
			return def.promise;
		}
	};
	return AuthService;
}]);