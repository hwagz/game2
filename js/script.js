// TODO: Class contructors and instance methods

angular
  .module('game',[])
  .controller("gameCtrl", ['$scope','$filter','$compile',function($scope, $filter,$compile) {
    // needs some work
    $scope.numEnemies = 6;
    $scope.eMoveInterval = 2000;
    $scope.editOptions = ["speed","facing"];
    // for later pause function
    $scope.paused = false;
    // Initialization function
    $scope.init = function(){
      $scope.getVals();
      $scope.positionMenus();
      $scope.player = new Creature("player");
      $scope.player.randomPos();
      $scope.createEnemies();
      $scope.eMove();
    };
    // Get values for window/distance, prob other things later
    $scope.getVals = function(){
      $scope.windowW = window.innerWidth;
      $scope.windowH = window.innerHeight;
    };
    // Positions menus
    $scope.positionMenus = function(){
      $scope.menus = $('.menus');
      $scope.opMenu = $('#options');
      $scope.invMenu = $('#inventory');
      $scope.menus.css({top: (0)+'px'});
      $scope.opMenu.css({left:(0)+'px'});
      $scope.invMenu.css({left:($scope.windowW-400)+'px'});
    };
    // Creates enemies
    $scope.createEnemies = function(){
      var container = $('.eContainer');
      $scope.enemies = [];
      for(i=0;i<$scope.numEnemies;i++){
        $scope.enemies[i]="e"+i;
      }
      for(i=0,len=$scope.enemies.length;i<len;i++){
        container.append("<div class='enemy' id='"+$scope.enemies[i]+"'>{{enemies["+i+"].face}}</div>");
        $scope.enemies[i] = new Creature($scope.enemies[i]);
        $scope.enemies[i].randomPos();
      }
      $compile(container)($scope)
    }
    // Handles key presses
    $scope.keyHandler = function(e){
      e = e.keyCode;
      //console.log(e);
      if(e>=37 && e<=40){
        // down: 40, right: 39, up: 38, left: 37
        $scope.player.move(40-e);
      }
      else if(e==73 || e==79){
        // I: 73, O: 79
        $scope.menuToggle(e);
      }
    };
    // Slides menus up
    $scope.menuToggle = function(e){
      // slide menus up and down
      if(e==73){
        $('#invBox').slideToggle();
      }
      else if(e==79){
        $('#opBox').slideToggle();
      }
    };
    // Moves enemies on an interval
    $scope.eMove = function(){
      for (i = 0,len=$scope.enemies.length; i < len; i++) {
        var j = Math.floor(Math.random()*4);
        $scope.enemies[i].move(j)
      }
      setTimeout(function () {
        $scope.eMove();
      }, $scope.eMoveInterval);
    }
  }]);
