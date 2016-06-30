angular
  .module('game',[])
  .controller("gameCtrl", ['$scope','$filter',function($scope, $filter) {
    $scope.isMoving = false;
    // Initialization function
    $scope.init = function(){
      $scope.getVals();
      $scope.positionMenus();
      $scope.setCreature("player");
    };
    // Get values for window/distance
    $scope.getVals = function(){
      $scope.face = ". .";
      $scope.windowW = window.innerWidth;
      $scope.windowH = window.innerHeight;
    };
    // Positions menus
    $scope.positionMenus = function(){
      $scope.menus = $('.menus');
      $scope.opMenu = $('#options');
      $scope.invMenu = $('#inventory');
      $scope.menus.css({top: ($scope.windowH-20)+'px'});
      $scope.opMenu.css({left:(0)+'px'});
      $scope.invMenu.css({left:($scope.windowW-400)+'px'});
    };
    // Inits creature obj (can be player or enemy)
    $scope.setCreature = function(objName){
      var creature = {};
      creature.width = 50;
      creature.height = 50;
      creature.top = 0;
      creature.bottom = creature.top+creature.height;
      creature.left = 0;
      creature.right = creature.left+creature.width;
      creature.jq = $('#'+objName);
      creature.dist = $scope.windowW/25;
      creature.isMoving = false;
      creature.speed = 100;
      creature.facing = 2;
      creature.inventory = [];
      // still needs health, attack, armor, etc.
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
    // Gets current position of object
    $scope.getPos = function(obj){
      obj.top = parseInt(obj.jq.css("top"));
      obj.left = parseInt(obj.jq.css("left"));
      obj.bottom = parseInt(obj.top)+obj.height;
      obj.right = parseInt(obj.left)+obj.width;

    };
    // Calculates distance object can move and stay in bounds
    $scope.distance = function(obj){
      var moveDist = obj.dist;
      if(obj.facing>1){
        if((obj.top-obj.dist)<0 && obj.facing==2){
          moveDist = obj.top;
        }
        else if((obj.left-obj.dist)<0 && obj.facing==3){
          moveDist = obj.left;
        }
      }
      else if(obj.facing<2){
        if((obj.bottom+obj.dist)>$scope.windowH && obj.facing===0){
          moveDist = $scope.windowH-obj.bottom;
        }
        else if((obj.right+obj.dist)>$scope.windowW && obj.facing==1){
          moveDist = $scope.windowW-obj.right;
        }
      }
      if(moveDist>obj.dist){moveDist=obj.dist;}
      if(moveDist<0){moveDist=0;}
      return moveDist;
    };
    // Moves movable objects
    $scope.move = function(i,obj){
      if (!obj.isMoving) {
        obj.isMoving = true;
        obj.facing = i;
        var ud = i<2 ? "+" : "-";
        var directions = ["v.v",">. >","^.^","< .<"];
        var animateDir = ["top","left"];
        var moveObj = {};
        moveObj[animateDir[i%2]] = ud+"="+$scope.distance(obj)+"px";
        $scope.face = directions[i];
        obj.jq.animate(moveObj,obj.speed);
        setTimeout(function () {
          $scope.getPos(obj);
          obj.isMoving=false;
        }, 100);
      }
    };
  }]);
