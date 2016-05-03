/**
 * Created by SHAILESH-PC on 4/24/2016.
 */

angular.module("farmerhelp").factory("AdminService",["$window","$http","$q", function ($window, $http, $q) {
    var AdminService = {
        signup: function () {
            var url = "http://farmerhelp.mybluemix.net/admin/listunapprovedfarmers";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {

                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status === 403) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },
        getPendingProducts: function () {
            var url = "http://farmerhelp.mybluemix.net/admin/listunapprovedproducts";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {

                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

         getPendingTrucks : function () {
             alert("In trucks");
             var url = "http://farmerhelp.mybluemix.net/trucks/pending";
             var def = $q.defer();
             $http({
                 method: 'GET',
                 url: url,
                 data: {

                 }
             }).then(function (data) {
                 if (data) {
                     def.resolve(data);
                 } else {
                     def.reject(data.data.error);
                 }
             }, function (error) {
                 if(error.status=== 403)
                 {
                     $window.location.href="http://farmerhelp.mybluemix.net/#auth/login";
                 }
                 def.reject(error);
             });
             return def.promise;
         },

        declineReq: function (ssn,productID) {
            var url,x;
            if (productID === undefined) {
                 url = "http://farmerhelp.mybluemix.net/admin/declinefarmer";
                x = "f";
            }
            else
            {
                url = "http://farmerhelp.mybluemix.net/admin/declineproduct";
                x = "p";
            }
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                  "ssn" : ssn,
                    "productID" : productID
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(x);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        getFarmersByAdvancedSearch :function(info){
            var url = "http://farmerhelp.mybluemix.net/admin/getFarmersByAdvancedSearch";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        getTrucksByAdvancedSearch : function(info){
            alert("In getrucks by sreach ");
            var url = "http://farmerhelp.mybluemix.net/trucks/search";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        getProductsByAdvancedSearch :function(info){
            var url = "http://farmerhelp.mybluemix.net/admin/getProductsByAdvancedSearch";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        farmerViewInfo : function(info)
        {
            var url = "http://farmerhelp.mybluemix.net/admin/farmerViewInfo";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        customerViewInfo : function(info)
        {
            var url = "http://farmerhelp.mybluemix.net/admin/customerViewInfo";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        updateCustomerInfo:function(info){
            var url = "http://farmerhelp.mybluemix.net/customers/updateCustomer";
            var def = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: {
                    "info" : info
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        },

        updateProductInfo:function(info){
            alert("In admin service");
            var url = "http://farmerhelp.mybluemix.net/products";
            var def = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: {
                    "info" : info
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        },


        updateTruckInfo : function(info){
            alert("URL is http://farmerhelp.mybluemix.net/trucks/updateTruck");
            var url = "http://farmerhelp.mybluemix.net/trucks/updateTruck";
            var def = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: {

                    "info" : info
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;
        },

        getBillInformation : function(){
            var url = "http://farmerhelp.mybluemix.net/bills/getallbillsadmin";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;


        },
        tripsInfo : function()
        {
            alert("in service trips info");
            var url = "http://farmerhelp.mybluemix.net/trips";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url,
                data: {
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;

        },

        updateFarmerInfo: function(info){
            var url = "http://farmerhelp.mybluemix.net/farmers/updateFarmer";
            var def = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: {
                    "info" : info
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error);
            });
            return def.promise;

        },


        productViewInfo : function(info)
        {
            var url = "http://farmerhelp.mybluemix.net/admin/productViewInfo";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },

        truckViewInfo : function(info)
        {
            var url = "http://farmerhelp.mybluemix.net/trucks/id/"+info.ssn;
            var def = $q.defer();
            $http({
                "method" : 'GET',
                "url" : url,
                "data" : {

                }

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },


        getCustomersByAdvancedSearch :function(info){
            var url = "http://farmerhelp.mybluemix.net/admin/getCustomersByAdvancedSearch";
            var def = $q.defer();
            $http({
                "method" : 'POST',
                "url" : url,
                "data" : info

            }).then(function(data){
                if(data)
                {
                    def.resolve(data);
                }
                else
                {
                    def.reject(data.data.error);
                }
            },function(err){
                def.reject(error);
            });
            return def.promise;
        },




        approveReq: function (ssn,productID) {
            var url,x;
            if (productID === undefined) {
                url = "http://farmerhelp.mybluemix.net/admin/approvefarmer";
                x = "f";
            }
            else
            {
                url = "http://farmerhelp.mybluemix.net/admin/approveproduct";
                x = "p";
            }
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                    "ssn" : ssn,
                    "productID" : productID
                }
            }).then(function (data) {
                if (data) {
                    def.resolve(x);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        getPendingCustomers: function () {
            var url = "http://farmerhelp.mybluemix.net/admin/listunapprovedcustomers";
            var def = $q.defer();
            $http({
                method: 'GET',
                url: url
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status=== 403)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        }
    };
    return AdminService;
}]);
