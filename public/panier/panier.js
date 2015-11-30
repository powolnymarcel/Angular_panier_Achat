'use strict';

angular.module('panier', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/panier', {
			templateUrl: 'public/panier/panier.html',
			controller: 'PanierCtrl'
		});
	}])

	.controller('PanierCtrl', ['$scope',function($scope) {
		$scope.produitsDumagasin = [
			{'produit':'Disque dur ','id':'HDD','selected':0,'prix':[{'taille':'6Tb','prix':'300'},{'taille':'8Tb','prix':'400'}]},
			{'produit':'CPU','id':'CPU','selected':0,'prix':[{'taille':'i3','prix':'189'},{'taille':'i5','prix':'250'}]},
			{'produit':'Moniteur','id':'MON','selected':0,'prix':[{'taille':'16\'','prix':'120'},{'taille':'19\'','prix':'169'}]},
			{'produit':'Souris','id':'SOUR','selected':0,'prix':[{'taille':'Optique','prix':'35'},{'taille':'Avancé','prix':'55'}]},
			{'produit':'RAM','id':'RAM','selected':0,'prix':[{'taille':'6GB','prix':'40'},{'taille':'8GB','prix':'80'}]},
			{'produit':'Claviers','id':'CLA','selected':0,'prix':[{'taille':'Standard','prix':'49'},{'taille':'Avancé','prix':'89'}]}
		];



		$scope.total = function() {
			var leTotal = 0;

			for (var i in $scope.produitsDumagasin) {
				leTotal += parseInt($scope.produitsDumagasin[i].selected);
			}

			return leTotal;

		}


	}])
	.directive('checkListe', function() {
		return {
			//'E' donc sera sous la forme <check-liste></check-liste>
			restrict: 'E',
			scope: {
			option: '=',
				<!-- ATTENTION: Dans la vue le camelCase se transforme en tirets (-) -->
				leNomUniquePourLeNameDuSelect: '=',
				selectionne:'='
		},
			//option est le parametre dans la balise checkList de la vue panier.html
			//option="produit.prix"
			//En remplacement de ma balise "<check-list>" on utilisera ce template
			// Ce template contient un boucle qui itère sur tous les prix de l'objet produit voir scope produitsDumagasin
			//Simple non ? Pareil pour 'leNomUniquePourLeNameDuSelect'
			template: function(elem, attrs) {
				return '<div class="panel-body">\
                    <div class="radio" ng-repeat="i in option">\
                        <label><input ng-model="$parent.selectionne" ng-value="{{i.prix}}" type="radio" name="{{leNomUniquePourLeNameDuSelect}}">{{i.taille}} Au prix de: <b>{{i.prix}} Euros</b></label>\
                    </div>\
                </div>'
			}
		};
	})
