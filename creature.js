// Creature class file.

function Creature(name){
  this.face = ". .";
  this.name = name;
  this.width = 50;
  this.height = 50;
  this.top = 0;
  this.bottom = this.top+this.height;
  this.left = 0;
  this.right = this.left+this.width;
  this.jq = $('#'+name);
  this.dist = window.innerWidth/25;
  this.isMoving = false;
  this.speed = 50;
  this.facing = 2;
  this.inventory = [
    {
      name: "potion",
      quantity: 5
    }
  ];
  this.type = name=="player" ? "player" : "enemy";

  // Updates the objects location
  this.getPos = function(){
    this.top = this.jq.css("top").replace("px", "")*1;
    this.left = this.jq.css("left").replace("px", "")*1;
    this.bottom = this.top+this.height;
    this.right = this.left+this.width;
  };
  // Puts the object in a random position
  this.randomPos = function(){
    var maxH = window.innerHeight-this.height;
    var maxW = window.innerWidth-this.width;
    var newTop = Math.random()*maxH;
    var newLeft = Math.random()*maxW;
    this.jq.css({top:newTop,left:newLeft});
    this.getPos();
  };
  // Calculates distance object can move and stay in bounds
  this.distance = function(){
    var moveDist = this.dist;
    if(this.facing>1){
      if(this.facing==2 && (this.top-this.dist)<0){
        moveDist = this.top;
      }
      else if(this.facing==3 && (this.left-this.dist)<0){
        moveDist = this.left;
      }
    }
    else if(this.facing<2){
      if(this.facing===0 && (this.bottom+this.dist)>window.innerHeight){
        moveDist = window.innerHeight-this.bottom;
      }
      else if(this.facing==1 && (this.right+this.dist)>window.innerWidth){
        moveDist = window.innerWidth-this.right;
      }
    }
    if(moveDist>this.dist){moveDist=this.dist;}
    if(moveDist<0){moveDist=0;}
    return moveDist;
  };
  // Moves creature objects
  this.move = function(i){
    if (!this.isMoving) {
      this.isMoving = true;
      this.facing = i;
      var ud = i<2 ? "+" : "-";
      var directions = ["v.v",">. >","^.^","< .<"];
      var animateDir = ["top","left"];
      var moveObj = {};
      moveObj[animateDir[i%2]] = ud+"="+this.distance()+"px";
      // face only updating for enemies when player makes a keypress
      // non issue after spritesheet though
      this.face = directions[i];
      this.jq.animate(moveObj,this.speed);
      var that=this;
      setTimeout(function () {
        that.getPos();
        that.isMoving=false;
      }, this.speed);
    }
  };
}
