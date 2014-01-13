"use strict"

angular.module("diandanbao_seller.controllers.order", []).controller('ordersController',
  ['$rootScope', '$scope', 'OrderService',
  function($rootScope, $scope, OrderService){
    $scope.orders = [
      {name: '订单1'},
      {name: '订单2'},
      {name: '订单3'},
      {name: '订单4'},
      {name: '订单5'},
      {name: '订单6'}
    ];
}]);