

var app = angular.module("farmerhelp", ["ngRoute","kendo.directives","ngMap"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when("/index", {
		templateUrl: "partials/login.html",
		controller: "AuthController"
	}).when("/trips/track/:tripId", {
		templateUrl: "partials/trips/track.html",
		controller: "TripsController"
	}).when("/customers/signup", {
		templateUrl: "partials/customers/signup.html",
		controller: "CustomersController"
	}).when("/trucks/signup", {
		templateUrl: "partials/trucks/signup.html",
		controller: "TrucksController"
	}).when("/admin/home", {
		templateUrl: "partials/admin/home.html",
		controller: "AdminController"
	}).when("/farmers/signup", {
		templateUrl: "partials/farmers/signup.html",
		controller: "FarmersController"
	}).when("/products/home", {
		templateUrl: "partials/products/products_list.html",
		controller: "ProductController"
	}).when("/farmers/home", {
		templateUrl: "partials/products/createproduct.html",
		controller: "ProductController"
	}).when("/farmers/homepage", {
		templateUrl: "partials/farmers/homepage.html",
		controller: "FarmersController"
	}).when("/bills/cart", {
		templateUrl: "partials/bills/cart.html",
		controller: "BillsController"
	}).when("/admin/farmersearch", {
		templateUrl: "partials/admin/farmersearch.html",
		controller: "AdminController"
	}).when("/admin/customersearch", {
		templateUrl: "partials/admin/customersearch.html",
		controller: "AdminController"
	}).when("/admin/productsearch", {
		templateUrl: "partials/admin/productsearch.html",
		controller: "AdminController"
	}).when("/bills/orders", {
		templateUrl: "partials/bills/orders.html",
		controller: "BillsController"
	}).when("/analytics/revenue", {
		templateUrl: "partials/analytics/revenue.html",
		controller: "AnalyticsController"
	}).when("/analytics/tripsperdriver", {
		templateUrl: "partials/analytics/tripsperdriver.html",
		controller: "TripAnalyticsController"
	}).when("/admin/trucksearch", {
		templateUrl: "partials/admin/trucksearch.html",
		controller: "AdminController"
	}).when("/analytics/tripspercustomer", {
		templateUrl: "partials/analytics/tripspercustomer.html",
		controller: "TripPerCustomerController"
	}).when("/analytics/tripsanalysismap", {
		templateUrl: "partials/analytics/TripAnalysisMap.html",
		controller: "TripAnalysisMap"
	}).when("/pricetrends", {
		templateUrl: "partials/dopdownlist.html"
	}).otherwise({
		redirectTo: "/index"
	});
	$locationProvider.html5Mode(false);
});

/*
app.controller("MyCtrl", function($scope){
});*/
