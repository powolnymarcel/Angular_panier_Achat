'use strict';


angular.module('panierAchat', [
	'ngRoute',
	'panier',
	'payer'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/panier'
	});
}]);
