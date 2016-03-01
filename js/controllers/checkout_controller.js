app.controller("CheckoutController", ["$scope", "bagService", function($scope, bagService){
  $scope.categories = [];
  $scope.bag = bagService.bagContents;
  $scope.count = bagService.itemCount;
  $scope.cost = bagService.totalCost;
  $scope.editingLineItem = false;

  $scope.emptyBag = function() {
    bagService.emptyBagContents();
  }

  $scope.checkout = function() {
    for (var i = 0; i < bagService.bagContents.length; i++) {
      bagService.bagContents[i]["editing"] = false;
    }

    $scope.bag = bagService.bagContents;
    $scope.count = bagService.itemCount;
    $scope.cost = bagService.totalCost;
  }

  $scope.removeLineItem = function(index) {
    bagService.removeItem(index);

    $scope.bag = bagService.bagContents;
    $scope.count = bagService.itemCount;
    $scope.cost = bagService.totalCost;
  }

  $scope.editLineItem = function(index, bagtea) {
    bagService.editItemQuantity(index, parseInt(bagtea.newQuantity));

    $scope.bag = bagService.bagContents;
    $scope.count = bagService.itemCount;
    $scope.cost = bagService.totalCost;
  }
}]);
