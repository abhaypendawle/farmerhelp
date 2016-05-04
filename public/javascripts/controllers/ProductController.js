
/**
 * Created by Dell on 20-04-2016.
 */
var app = angular.module("farmerhelp");


angular.module("farmerhelp").controller("ProductController", ["$scope", "$window", "ProductService",
	function ($scope, $window, ProductService) {
	$scope.createproduct = function () {

		var info = {
			"productName": $scope.productName,
			"productPrice": $scope.productPrice,
			"description": $scope.description,
			"productImage": $scope.productImage

		}
		var promise = ProductService.createproduct(info);
		promise.then(function (result) {
			alert("Product has been added successfully!");
		}, function (error) {
			alert("Error - " + error);
		});
	}

	extractCartItems = function () {
		$scope.cartList = [];
		for (var i = 0 ; i < $scope.cart.length ; i++) {
			for(var j = 0; j < $scope.productList.length ; j++ ) {
				if($scope.productList[j].productID === $scope.cart[i].productID) {
					$scope.productList[j].quantity = $scope.cart[i].quantity;
					$scope.cartList.push($scope.productList[j]);
				}
			}
		}
	}

	$scope.deleteproduct = function (productID) {
		var promise = ProductService.deleteproduct(productID);
		promise.then(function (result) {
			alert("product has been deleted successfully!");
		}, function (error) {
			alert("Error" + error);
		});
	}

	$scope.updateCart = function (productID, quantity) {
		var promise = ProductService.updateCart(productID, quantity);
		promise.then(function (cart) {
			$scope.cart = cart;
			extractCartItems();
		}).catch(function (error) {
			alert("Sorry! something went wrong!");
		});
	}

	$scope.addToCart = function (product) {
		for(var i = 0 ; i < $scope.cartList.length ; i++) {
			if($scope.cartList[i].productID === product.productID) {
				$scope.updateCart(product.productID, ($scope.cartList[i].quantity + 1));
				return;
			}
		}
		var promise = ProductService.addToCart(product.productID);
		promise.then(function (cart) {
			$scope.cart = cart;
			extractCartItems();
		}).catch(function (error) {
			alert("Error " + error);
		});
	}

	$scope.checkout = function () {
		var promise = ProductService.checkout($scope.cartList);
		promise.then(function (result) {
			$window.location.href = "http://farmerhelp.mybluemix.net/#bills/orders";
		}).catch(function (error) {
			alert("Oops! Something went wrong! " + error);
		});
	}

	init = function () {
		$scope.cart = [];
		var promise = ProductService.listproducts();
		promise.then(function (data) {
			$scope.productList = data;
			$scope.source = new kendo.data.DataSource({
				data: data,
				pageSize: 21
			});
			var cartPromise = ProductService.getCart();
			cartPromise.then(function (cart) {
				$scope.cart = cart;
				extractCartItems();
			}).catch(function (error) {
				alert("Ooops! something went terribly wrong! " + error);
			});
		}).catch(function (error) {
			alert("Error");
		});
	}
	init();
}]);