var obstacleGroup,obstacle,bananaGroup,banana,jungle,
    score,ground,player,sky;
  



function preload() {
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg");
  playerRunning = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");
}

function jump() {
  if (keyDown("space")) {
    player.velocityY = -5;
  }
  player.bounceOff(sky);
  player.collide(ground);
}

function spawnBananas() {
  banana = createSprite(400,random(200,350),10,10);
  banana.addImage(bananaImage);
  banana.lifetime = 400;
  banana.scale = 0.05;
  bananaGroup.add(banana);
  bananaGroup.setVelocityXEach(-5);
}
function spawnObstacles() {
  obstacle = createSprite(400,random(200,350),10,10);
  obstacle.addImage(obstacleImage);
  obstacle.lifetime = 400;
  obstacle.scale = 0.1
  obstacleGroup.add(obstacle);
  obstacleGroup.setVelocityXEach(-5);
}

function setup() {
  createCanvas(400, 400);
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  jungle = createSprite(200,200);
  jungle.addImage("jungle.jpg",jungleImage);
  ground = createSprite(200,375,400,10);
  score = 0;
  player = createSprite(50,350,10,10);
  player.addAnimation("player",playerRunning);
  player.scale = 0.1;
  sky = createSprite(200,150,400,10);
  sky.visible = false;
}

function draw() {
  background(220);
  
  jungle.velocityX = -5;
  if (jungle.x < 0) {
      jungle.x = jungle.width/2;
  }
  ground.visible = false;
  
  jump();
  
  if (World.frameCount % 100 == 0) {
    spawnBananas();
  }
  if (World.frameCount % 150 == 0) {
    spawnObstacles();
  }
  
  if (player.isTouching(bananaGroup)) {
    score = score + 2;
    bananaGroup.destroyEach();
  }
    switch(score) {
    case 10: player.scale = 0.2;
    case 20: player.scale = 0.4;
    case 30: player.scale = 0.6;
    case 40: player.scale = 0.8;
      break;
    default: break;
  }
  if (player.isTouching(obstacleGroup)) {
    player.scale = 0.1;
    obstacleGroup.destroyEach();
  }
  
  drawSprites();
  text("score: " + score,300,50);
}