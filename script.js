// TODO: Class contructors and instance methods

angular
  .module('game',[])
  .controller("gameCtrl", ['$scope','$filter','$compile',function($scope, $filter,$compile) {
    // needs some work
    $scope.numEnemies = 6;
    $scope.eMoveInterval = 2000;
    // for later pause function
    $scope.paused = false;
    // Initialization function
    $scope.init = function(){
      $scope.getVals();
      $scope.positionMenus();
      $scope.player = $scope.setCreature("player");
      $scope.randomPos($scope.player);
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
      $scope.menus.css({top: ($scope.windowH-20)+'px'});
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
        $scope.enemies[i] = $scope.setCreature($scope.enemies[i]);
        $scope.randomPos($scope.enemies[i]);
      }
      $compile(container)($scope)
    }
    // Inits creature obj (can be player or enemy)
    $scope.setCreature = function(objName){
      var creature = {};
      creature.face = ". .";
      creature.name = objName;
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
      creature.type = objName=="player" ? "player" : "enemy";
      // still needs health, attack, armor, etc.
      return creature;
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
      console.log("Not yet implemented");
      if(e==73){
        // slide inventory
      }
      else if(e==79){
        // slide options
      }
    };
    // Gets current position of object
    $scope.getPos = function(obj){
      obj.top = obj.jq.css("top").replace("px", "")*1;
      obj.left = obj.jq.css("left").replace("px", "")*1;
      obj.bottom = obj.top+obj.height;
      obj.right = obj.left+obj.width;
    };
    // Places the object at a random location on the screen
    $scope.randomPos = function(obj){
      var maxH = $scope.windowH-obj.height;
      var maxW = $scope.windowW-obj.width;
      var newTop = Math.random()*maxH;
      var newLeft = Math.random()*maxW;
      obj.jq.css({top:newTop,left:newLeft});
      $scope.getPos(obj);
    };
    // Calculates distance object can move and stay in bounds
    $scope.distance = function(obj){
      var moveDist = obj.dist;
      if(obj.facing>1){
        if(obj.facing==2 && (obj.top-obj.dist)<0){
          moveDist = obj.top;
        }
        else if(obj.facing==3 && (obj.left-obj.dist)<0){
          moveDist = obj.left;
        }
      }
      else if(obj.facing<2){
        if(obj.facing===0 && (obj.bottom+obj.dist)>$scope.windowH){
          moveDist = $scope.windowH-obj.bottom;
        }
        else if(obj.facing==1 && (obj.right+obj.dist)>$scope.windowW){
          moveDist = $scope.windowW-obj.right;
        }
      }
      if(moveDist>obj.dist){moveDist=obj.dist;}
      if(moveDist<0){moveDist=0;}
      return moveDist;
    };
    // Moves creature objects
    $scope.move = function(i,obj){
      if (!obj.isMoving) {
        obj.isMoving = true;
        obj.facing = i;
        var ud = i<2 ? "+" : "-";
        var directions = ["v.v",">. >","^.^","< .<"];
        var animateDir = ["top","left"];
        var moveObj = {};
        moveObj[animateDir[i%2]] = ud+"="+$scope.distance(obj)+"px";
        // face only updating for enemies when player makes a keypress
        // non issue after spritesheet though
        obj.face = directions[i];
        obj.jq.animate(moveObj,obj.speed);
        setTimeout(function () {
          $scope.getPos(obj);
          obj.isMoving=false;
        }, 100);
      }
    };
    // Moves enemies on an interval
    $scope.eMove = function(){
      for (i = 0,len=$scope.enemies.length; i < len; i++) {
        var j = Math.floor(Math.random()*4);
        $scope.move(j,$scope.enemies[i])
      }
      setTimeout(function () {
        $scope.eMove();
      }, $scope.eMoveInterval);
    }
  }]);
