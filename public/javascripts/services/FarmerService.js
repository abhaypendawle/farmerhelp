
angular.module("farmerhelp").factory("FarmerService",["$window","$http","$q", function ($window,$http, $q) {
    var FarmerService = {

        getMyProfile : function () {
            //alert("Reached Here");
            var url = "http://farmerhelp.mybluemix.net/farmers/111-11-9910";
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
                if(error.status === 302) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        getMyTweets : function () {
            var url = "http://farmerhelp.mybluemix.net/farmers/getMyTweets";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status === 302) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },
        requestNewResource: function (info) {
            //alert("Reached Here");
            var url = "http://farmerhelp.mybluemix.net/farmers/requestResource";
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
                if(error.status=== 302)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error.data.error);
            });
            return def.promise;
        },

        getWhoReqMyResource : function () {
            //alert("Here also reached");
            var url = "http://farmerhelp.mybluemix.net/farmers/getWhoReqMyResource";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status === 302) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },


        updateFarmerProfile : function (info) {
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
                if(error.status === 302)
                {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        createresource: function (info) {
            var url = "http://farmerhelp.mybluemix.net/farmers/regResource";
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
                if(error.status=== 302)
                {
                    $window.location.href="http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error.data.error);
            });
            return def.promise;
        },

        signup: function (info) {
            var url = "http://farmerhelp.mybluemix.net/farmers";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                    "info": info
                }
            }).then(function (data) {
                if (data.data.success) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                    def.resolve();
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error.data.error);
            });
            return def.promise;
        },

        getMyResources : function () {
            var url = "http://farmerhelp.mybluemix.net/farmers/getMyResources";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status === 302) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        },

        postTweet: function (info) {
            var url = "http://farmerhelp.mybluemix.net/farmers/postTweet";
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {
                    "info": info
                }
            }).then(function (data) {
                if (data.data.success) {
                    //$window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                    def.resolve();
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                def.reject(error.data.error);
            });
            return def.promise;
        },

        getUrl : function (info) {
            var url = "http://farmerhelp.mybluemix.net/farmers/searchfarmpract";
            //alert(info.type);
            var def = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: info
            }).then(function (data) {
                if (data) {
                    def.resolve(data);
                } else {
                    def.reject(data.data.error);
                }
            }, function (error) {
                if(error.status === 302) {
                    $window.location.href = "http://farmerhelp.mybluemix.net/#auth/login";
                }
                def.reject(error);
            });
            return def.promise;
        }

    };
    return FarmerService;
}]);