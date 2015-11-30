'use strict';

angular.module('payer', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/payer', {
			templateUrl: 'public/payer/payer.html',
			controller: 'PayerCtrl'
		});
	}])

	.controller('PayerCtrl', ['$scope','AjoutPanierFinalService', function($scope,AjoutPanierFinalService) {
		$scope.produits = AjoutPanierFinalService.getProduits();
		$scope.total = AjoutPanierFinalService.getTotal();


	}]);
