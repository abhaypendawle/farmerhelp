
require.config({
	baseUrl: "javascripts",
	paths: {
		"angular": "./vendor/angular-1.5.3",
		"angularAMD": "./vendor/angularAMD",
		"ngload": "./vendor/ng-load",
		"angular-route" : "./vendor/angular-route",
		"app": "./app"
	},
	shim: {
		"angularAMD": ["angular"],
		"ngload": ["angularAMD"],
		"angular-route": ["angular"]
	},
	deps: ["app"]
});