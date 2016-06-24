angular
  .module('game',[])
  .controller("gameCtrl", ['$scope','$filter',function($scope, $filter) {
    $scope.dataTest = "hithere";
  }])
