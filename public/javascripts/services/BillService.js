/**
 * Created by Abhay on 4/24/2016.
 */


angular.module("farmerhelp").factory("BillService",["$http","$q","$window", function ($http, $q, $window) {
    var BillService = {
        generatebill: function (info) {
            var url = "http://farmerhelp.mybluemix.net/bills/generatebill";
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
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#/auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        addrating: function (info) {
            var url = "http://farmerhelp.mybluemix.net/bills/addrating";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                    "info" : info
                }
            }).then(function (data) {
                if (data.data.success) {
                    def.resolve();
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#/auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        deletebill: function (billId) {
            var url = "http://farmerhelp.mybluemix.net/bills/"+billId;
            var def = $q.defer();
            $http({
                method: 'DELETE',
                url: url,
            }).then(function (data) {
                if (data.status==204) {
                    def.resolve();
                } else {
                    //alert("ala error")
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#/auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        searchbill: function (billId) {
            var url = "http://farmerhelp.mybluemix.net/bills/searchbill/"+billId;
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url
            }).then(function (data) {
                if (data.data.success) {
                    def.resolve(data.data.data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#/auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        getallbills: function () {
            //alert();
            var url = "http://farmerhelp.mybluemix.net/bills/getallbills/";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
            }).then(function (data) {
                if (data.data.success) {
                    def.resolve(data.data.data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#/auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        revenue: function () {
            var url = "http://farmerhelp.mybluemix.net/bills/revenue";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
            }).then(function (data) {
                if (data.data.success) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#/auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        }

    };
    return BillService;
}]);