var PLAY=1;
var END;
var gameState=PLAY;

var monkey , monkeyrunning;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var gameoverimg,gameover
var background, backgroundImage,ground2;
var obstaclesGroup;
var counter=0;


function preload(){
    
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg");
  gameoverimg= loadImage("glitch-game-background_23-2148090006.jpg");
  monkeyrunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
}



function setup() {
  canvas=createCanvas(displayWidth-20,displayHeight-30);
  background = createSprite(0,0,displayWidth-20,displayHeight-30);
  background.addImage(backgroundImage)
  background.scale = 3.2    
  
  
    ground2= createSprite(0,displayHeight-100,1000,20);
 
  ground2.visible = false;

  
 monkey = createSprite(70,318,20,50);
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale = 0.14 ;

  
 obstaclesGroup =createGroup();
bananaGroup=createGroup();
  
  score=0
}


function draw() {
  
  if(gameState===PLAY){
 
    background.velocityX = -4

    if (background.x < 0){
      background.x = background.width/2;
    }
  
     if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
     }
  
     camera.position.x = displayHeight/2;
   
     camera.position.y = monkey.y 
   
     monkey.velocityY = monkey.velocityY + 0.8
  
  
  if( obstaclesGroup.isTouching(monkey)){ 
    
   obstaclesGroup.destroyEach();
    counter=counter+1;
 
  
    console.log(counter+" "+frameCount);
    monkey.scale=0.12;
    if(counter===2){
      gameState=END;
      
      console.log(counter+" "+frameCount);
    }
   }
   
    
    
  
    if(bananaGroup.isTouching(monkey)){
      
      score = score + 2;
      bananaGroup.destroyEach();
 
      switch(score){
        case 10:monkey.scale=0.16;
                break;
        case 20:monkey.scale=0.18;
                break;
        case 30:monkey.scale=0.20;
                break;
        case 40:monkey.scale=0.22;
                break;
        case 50:monkey.scale=0.24;
                break;
        case 60:monkey.scale=0.28;
                break
        case 70:monkey.scale=0.32;
                break;
          default: break;
      }
    }
  }
  
  
  else if(gameState===END){
    counter=0
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    background.velocityX=0
   background = createSprite(displayWidth/4,monkey.y,displayWidth,displayHeight);
   background.addImage(gameoverimg)
   background.scale=5
    
    score=0 
   
  }  
  

  
  monkey.collide(ground2);
  
  banana();
  Obstacles();
  
  drawSprites();
  
   stroke("yellow");
  textSize(50);
  fill("yellow")
  text("score: "+ score, 800,450);
          

}

function Obstacles(){
 if (frameCount % 500 === 0){
   var obstacles = createSprite(displayWidth-20,displayHeight-170,10,40);
    obstacles.addImage(obstaceImage);
    obstacles.scale = 0.4;
    obstacles.velocityX = -3;
  
   obstaclesGroup.add(obstacles);
   
 }
}
function banana(){
  if (frameCount % 300 === 0){
   var banana = createSprite(displayWidth-20,165,10,40);
    banana.y = Math.round(random(50,displayHeight-200));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    
    bananaGroup.add(banana);
    
}
}




