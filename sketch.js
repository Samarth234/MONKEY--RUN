var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(450,400);
  
  monkey = createSprite(80,215,20,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  console.log(monkey.y);

  ground = createSprite(400,250,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
 
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(255);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: " + survivalTime,200,50);

  
  if(gameState === PLAY){
  
    if(ground.x < 0){
    ground.x = ground.width/2;
  }
    
    if(keyDown("space")){
    monkey.velocityY = -12;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(ground);
    spawnBanana();
    spawnObstacles();
    
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
    
    survivalTime = Math.ceil(frameCount/frameRate())
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  
  else if(gameState === END){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  } 
  
  
  drawSprites();
}

function spawnBanana() {

  if (frameCount % 150 === 0) {
    var banana = createSprite(450,350,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
       
    banana.lifetime = 150;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    FoodGroup.add(banana);
  }
}


function spawnObstacles() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(450,230,40,10);
    obstacle.x = Math.round(random(300,310));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
       
    obstacle.lifetime = 150;
    
    obstacleGroup.add(obstacle);
  }
}

