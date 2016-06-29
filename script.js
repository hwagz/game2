angular
  .module('game',[])
  .controller("gameCtrl", ['$scope','$filter',function($scope, $filter) {
    $scope.isMoving = false;
    // Initialization function
    $scope.init = function(){
      $scope.getVals();
      $scope.positionMenus();
      $scope.setCreature("player");
    }
    // Get values for window/distance
    $scope.getVals = function(){
      $scope.windowW = $(window).width();
      $scope.windowH = $(window).height();
    };
    // Positions menus
    $scope.positionMenus = function(){
      $scope.menus = $('.menus');
      $scope.opMenu = $('#options');
      $scope.invMenu = $('#inventory');
      $scope.menus.css({top: ($scope.windowH-35)+'px'});
      $scope.opMenu.css({left:(0)+'px'});
      $scope.invMenu.css({left:($scope.windowW-415)+'px'});
    };
    // Inits creature obj (can be player or enemy)
    $scope.setCreature = function(objName){
      var creature = {};
      creature.top = 0;
      creature.bottom = creature.top+50;
      creature.left = 0;
      creature.right = creature.left+50;
      creature.width = 50;
      creature.height = 50;
      creature.jq = $('#'+objName);
      creature.dist = $scope.windowW/20;
      creature.isMoving = false;
      creature.speed = 100;
      creature.facing = 2;
      creature.inventory = [];
      $scope[objName] = creature;
    };
    // Handles key presses
    $scope.keyHandler = function(e){
      e = e.keyCode;
      //console.log(e);
      if(e>=37 && e<=40){
        // down: 40, right: 39, up: 38, left: 37
        $scope.move(40-e,$scope.player);
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
        // slide inventory
      }
      else if(e==79){
        // slide options
      }
    };
    // Checks bounds of screen
    $scope.isIn = function(obj){
      // should return maximum amount obj can move.
      // takes obj.dist and finds if that max would put the obj oob/off screen
      // if so, returns the difference that the obj is allowed to move

      var isIn = false;
      if(ud=="-"){
        var min = 0;
      }
      else if(ud=="+"){
        var max = tl=="top" ? $scope.windowH : $scope.windowW;

      }
    };
    // Moves movable objects
    $scope.move = function(i,obj){
      if (!obj.isMoving) {
        obj.isMoving = true;
        obj.facing = i;
        i<=1 ? ud="+" : ud="-";
        var directions = ["v",">","^","<"]
        var animateDir = ["top","left"];
        var moveObj = {};
        moveObj[animateDir[i%2]] = ud+"="+obj.dist+"px";
        obj.jq.html(directions[i])
        obj.jq.animate(moveObj,obj.speed,function(){obj.isMoving=false});
      }
    };
  }])
