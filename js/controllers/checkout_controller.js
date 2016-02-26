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
    $scope.bag = bagService.bagContents;
    $scope.count = bagService.itemCount;
    $scope.cost = bagService.totalCost;
  }

  $scope.removeLineItem = function(index) {
    bagService.removeItem(index);
  }

  $scope.editLineItem = function(index) {
    $scope.editingLineItem = !$scope.editingLineItem;
    bagService.editItemQuantity(index, $scope.editingLineItem, $scope.newQuantity);
  }
}]);
