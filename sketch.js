//Global Variables
var monkey,ground,bg;
var bananaImage,obstacleImage,bgImage;

var foodGroup,obstaclesGroup;
var score = 0;


function preload(){
  
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
                                  "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  bgImage = loadImage("jungle2.jpg");

}


function setup() {
  createCanvas(600,300);

   //create background
  bg = createSprite(0,0,50,50);
  bg.addImage(bgImage);
  bg.scale = 1.2;         
  bg.velocityX = -5;
  bg.x=bg.width/2;
  
  //create monkey
   monkey = createSprite(109,240,10,10);
  monkey.addAnimation("running",monkeyAnimation);
   monkey.scale = 0.08;
 
  //create moving ground
   ground = createSprite(600,286,1200,10);
  ground.velocityX = -2;
  ground.visible = false;
  
 
  //create groups
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  // text properties
  textSize(20);
  fill("white");
}


function draw(){
  
  //create background
 background(255); 
  
  //make the monkey jump when space is pressed
  if(keyDown("space")){
      monkey.velocityY=-12;
  }
  
  //make monkey collide with ground
 monkey.collide(ground);

  
  //create scrolling background
  if(bg.x<0){
   bg.x=bg.width/2;
 }
  
  //add gravity
monkey.velocityY=monkey.velocityY+0.8
  
 //create a scrolling ground
if(ground.x<0){
    ground.x=ground.width/2;
}
  
  
  
  //increase score by 2 if monkey touches food
  if(foodGroup.isTouching(monkey)){
   score = score +2;
   foodGroup.destroyEach(); 
    
   }
  
  //increae size of monkey if score becomes 10,20,30,40
  switch(score){
    case 10 : monkey.scale = 0.1;
              break;
    case 20 : monkey.scale = 0.12;
              break;
    case 30 : monkey.scale = 0.14;
              break;
    case 40 : monkey.scale = 0.16;
              break;
      default: break;
 }
  
   
  //decrease size by 2 if monkey touches obstacles
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale =0.08;
    
   }
  
  //call food function
  food();

 //call obstacles function
 obstacles();

 
  
 //draw the sprites
  drawSprites();
  
  //display score
  text("Score: "+score,500,50);
}

function food(){
  if(frameCount%80===0){
 
     //create banana
      var banana = createSprite(540,random(90,150),10,10);
        banana.addImage(bananaImage);
        banana.scale=0.08;
        
    //give velocity and lifetime to it    
        banana.velocityX=-6;
        banana.lifetime=100;
        
    //add banana to its group    
        foodGroup.add(banana);
    
  }
}

 function obstacles(){
  if(frameCount%300===0){
 
     //create obstacle
      var stone =createSprite(540,random(90,150),10,10);
        stone.addImage(obstacleImage);
        stone.scale=0.08;
        
    //give velocity and lifetime to it    
        stone.velocityX=-6;
        stone.lifetime=100;
        
    //add     obstacle to its group    
        obstaclesGroup.add(stone);
    
  }
}
 
