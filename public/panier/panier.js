'use strict';

angular.module('panier', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/panier', {
			templateUrl: 'public/panier/panier.html',
			controller: 'PanierCtrl'
		});
	}])

	.controller('PanierCtrl', ['$scope',function($scope) {
		$scope.shopData = [
			{'item':'Hard Disk','id':'HD','selected':0,'prices':[{'size':'200GB','price':'2000'},{'size':'400GB','price':'4000'}]},
			{'item':'CPU','id':'CPU','selected':0,'prices':[{'size':'i3','price':'20000'},{'size':'i5','price':'25000'}]},
			{'item':'Monitor','id':'MON','selected':0,'prices':[{'size':'16\'','price':'3000'},{'size':'19\'','price':'5000'}]},
			{'item':'Optical Mouse','id':'MOU','selected':0,'prices':[{'size':'Optical','price':'350'},{'size':'Advanced','price':'550'}]},
			{'item':'RAM','id':'RM','selected':0,'prices':[{'size':'4GB','price':'4000'},{'size':'8GB','price':'8000'}]},
			{'item':'USB Keyboard','id':'KEY','selected':0,'prices':[{'size':'Standard','price':'2500'},{'size':'Advanced','price':'4500'}]}
		];






	}])
	.directive('checkList', function() {
		return {
			restrict: 'E',
			scope: {
			option: '='
		},
			template: function(elem, attrs) {
				return '<div class="panel-body">\
                    <div class="radio" ng-repeat="i in option">\
                        <label><input type="radio">{{i.size}} Rs.{{i.price}}</label>\
                    </div>\
                </div>'
			}
		};
	})
