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
    contents: [],
    count: 0,
    cost: 0
  }
}])
