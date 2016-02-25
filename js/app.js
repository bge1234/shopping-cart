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
