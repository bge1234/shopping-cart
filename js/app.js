var app = angular.module("myapp", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'partials/checkout.html',
        controller: 'MainController'
      })
        .when('/', {
          templateUrl: 'partials/main.html',
          controller: 'MainController'
        })
});

app.service('bagService', [function(){
  return {
    bagContents: [],
    itemCount: 0,
    totalCost: 0,
    addItem: function () {

    },
    removeItem: function() {

    },
    editItemQuantity: function() {

    },
    emptyBagContents: function() {

    }
  }
}])
