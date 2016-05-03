
var app = angular.module("farmerhelp");

app.controller('AuthController', ["$scope","$window","AuthService","USER_TYPES", function ($scope, $window, AuthService, UserTypes) {
	$scope.error = null;
	$scope.login = function () {
		var promise = AuthService.login($scope.email, $scope.password);
		promise.then(function (user) {
			if(user.usertype === UserTypes.ADMIN) {
				$scope.redirectToAdminPage();
			} else if(user.usertype === UserTypes.CUSTOMER) {
				$scope.redirectToCustomerHome();
			} else if(user.usertype === UserTypes.FARMER) {
				$scope.redirectToFarmerHome();
			}
		}, function (error) {
			$scope.error = error;
		});
	};

	$scope.redirectToFarmerHome = function () {
		$window.location.href = "/#farmers/homepage";
	}

	$scope.redirectToCustomerHome = function () {
		$window.location.href = "/#products/home";
	}

	$scope.redirectToAdminPage = function () {
		$window.location.href = "/#admin/home";
	};

	$scope.redirectToFarmerSignUp = function () {
		$window.location.href = "/#farmers/signup";
	};
	
	$scope.redirectToDriverSignUp = function () {
		$window.location.href = "/#trucks/signup";
	};
}]);
