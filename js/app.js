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
    addItem: function(tea, quantity) {
      if (quantity === undefined || quantity === null)
        quantity = 1;

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
          quantity: quantity,
          editing: false
        };
        this.bagContents.push(newTea);
        this.itemCount += quantity;
        this.totalCost += quantity * tea.price;
      }
      else {
        this.bagContents[pos]["quantity"] += quantity;
        this.itemCount++;
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

          if(newQuantity > this.bagContents[index]["quantity"]) {
            this.itemCount += newQuantity;
            this.totalCost += this.bagContents[index]["price"] * newQuantity;
          }
          else if(newQuantity < this.bagContents[index]["quantity"]) {
            this.itemCount -= newQuantity;
            this.totalCost -= this.bagContents[index]["price"] * newQuantity;
          }

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
