
var app = angular.module("farmerhelp");
app.factory("AnalyticsService",["$http","$q","BillService", function ($http, $q, BillService) {
	var AnalyticsService = {
		getRevenueByDay: function () {
			return BillService.revenue();
		}
	};
	return AnalyticsService;
}]);