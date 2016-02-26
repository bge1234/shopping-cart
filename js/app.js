var app = angular.module("myapp", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
      .when('/checkout', {
        templateUrl: 'partials/checkout.html',
        controller: 'CheckoutController'
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
    addItem: function(tea, addQuantity) {
      var found = false;
      var pos = 0;

      for (var i = 0; i < this.bagContents.length; i++) {
        if(tea["name"] === this.bagContents[i]["tea"]["name"]) {
          found = true;
          pos = i;
        }
      }

      if(!found) {
        var newTea = {
          tea: tea,
          quantity: addQuantity,
          editing: false
        };
        this.bagContents.push(newTea);
        this.itemCount += addQuantity;
        this.totalCost += addQuantity * tea.price;
      }
      else {
        this.bagContents[pos]["quantity"] += addQuantity;
        this.itemCount += addQuantity;
        this.totalCost += tea.price;
      }
    },
    removeItem: function(index) {
      this.itemCount -= this.bagContents[index]["quantity"];
      this.totalCost -= this.bagContents[index]["tea"]["price"] * this.bagContents[index]["quantity"];
      this.bagContents.splice(index, 1);

      if(this.bagContents.length === 0)
        history.back(-1);
    },
    editItemQuantity: function(index, newQuantity) {
      this.bagContents[index]["editing"] = !this.bagContents[index]["editing"];

      if(!this.bagContents[index]["editing"]) {
        if(newQuantity !== undefined && newQuantity !== null && newQuantity > 0) {
          this.itemCount = this.itemCount - this.bagContents[index]["quantity"] + newQuantity;
          this.totalCost = this.totalCost - (this.bagContents[index]["tea"]["price"] * this.bagContents[index]["quantity"]) + (this.totalCost = this.bagContents[index]["tea"]["price"] * newQuantity);
          this.bagContents[index]["quantity"] = newQuantity;
        }
      }
    },
    emptyBagContents: function() {
      this.bagContents = [];
      this.itemCount = 0;
      this.totalCost = 0;
    }
  }
}])
