

angular.module("farmerhelp").factory("CustomerService",["$window","$http","$q", function ($window, $http, $q) {
    var CustomerService = {
        signup: function (info) {
            var url = "http://farmerhelp.mybluemix.net/customers";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                    "info": info
                }
            }).then(function (data) {
                if (data.data.success) {
                    def.resolve();
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#/auth/login";
                } else {
                    def.reject(error);
                }
            });
            return def.promise;
        }
    };
    return CustomerService;
}]);