var app = angular.module("myapp", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
      .when('/searchresults/:id', {
        templateUrl: 'partials/show.html',
        controller: 'ShowController'
      })
      .when('/searchresults', {
        templateUrl: 'partials/results.html',
        controller: 'MainController'
      })
});
