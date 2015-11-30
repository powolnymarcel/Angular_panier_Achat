'use strict';

angular.module('panier', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/panier', {
			templateUrl: 'public/panier/panier.html',
			controller: 'PanierCtrl'
		});
	}])

	.controller('PanierCtrl', ['$scope','AjoutPanierFinalService', function($scope,AjoutPanierFinalService) {
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
			AjoutPanierFinalService.setTotal(leTotal);
			return leTotal;
		};

		//A chaque modif de du scope produitsDumagasin on appelle le service "AjoutPanierFinalService" et on lui donne la valeur de ce scope
		$scope.$watch('produitsDumagasin',function(){
			AjoutPanierFinalService.setProduit($scope.produitsDumagasin);
		});

		//Recocher les objet au retour du panier final vers la liste d'articles
		if (AjoutPanierFinalService.getProduits() != '') {
			$scope.produitsDumagasin = AjoutPanierFinalService.getProduits();
		}
	}])
	.directive('checkListe', function() {
		return {
			//'E' donc sera sous la forme <check-liste></check-liste>
			restrict: 'E',
			scope: {
			option: '=',
				//ATTENTION: Dans la vue le camelCase se transforme en tirets (-)
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
//In order to get the scroll we'll create another directive.
	// Let's name the directive getScroll. This directive will update the scroll value
	// each time the browser window is scrolled, and based on scroll the affix classes will be updated.

.directive('getScroll', function($window) {
		return {
			scope: {
				scroll: '=scroll'
			},
			link: function(scope, element, attrs) {

				var scrollwindow = angular.element($window);

				scrollwindow.on('scroll', scope.$apply.bind(scope, function() {
					scope.scroll = scrollwindow.scrollTop();
				}));

			}
		};
	})


//Implementing a Checkout Page

//To populate the checkout page with the items selected, we'll need to pass the items between controllers.
// So we'll make use of an AngularJS service to pass the data between controllers.
// Let's create a service called CommonProp where we'll save the items selected and also the total price.
// Open up cart.js and create a service called CommonProp as shown:
.service('AjoutPanierFinalService', function() {
		var Produits = '';
		var Total = 0;

		return {
			getProduits: function() {
				return Produits;
			},
			setProduit: function(value) {
				Produits = value;
			},
			getTotal: function(){
				return Total;
			},
			setTotal: function(value){
				Total = value;
			}
		};
	});

