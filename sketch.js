var bird1,bird2,deadbird;
var pole,background;
var invisibleGround;
var bird;
var score=0;
var obsGroup;
const PLAY=1;
const END=0;
var gameState=PLAY;
var gameover;
function preload()
{
  bgIMG=loadImage("images/background.jpg");
  b1IMG=loadImage("images/bird1.png");
  b2IMG=loadImage("images/bird2.png");
  b3IMG=loadImage("images/deadbird.png");
  obsIMG=loadImage("images/pole.jpg");
  gameoverIMG=loadImage("images/gameover.png");

  bird_flying=loadAnimation("images/bird1.png");
  bird_running=loadAnimation("images/bird2.png");
  bird_dead=loadAnimation("images/deadbird.png");
}
function setup() {
  createCanvas(1000,800);
bg=createSprite(315,250);
  bg.addImage(bgIMG);
bg.velocityX=-2;
bg.x=bg.width/2;
bg.scale=3;
/*b1=createSprite(10,20,0.1,0.1);
b1.addImage(b1IMG);
b1.scale=0.2;

b2=createSprite(60,400,0.1,0.1);
b2.addImage(b2IMG);
b2.scale=0.5;

b3=createSprite(90,200,0.1,0.1);
b3.addImage(b3IMG);
b3.scale=0.2;*/
obsGroup=new Group();


bird=createSprite(100,700,0.1,0.1);
bird.addAnimation("flying",bird_flying);
bird.addAnimation("running",bird_running);
bird.addAnimation("dead",bird_dead);
bird.scale=1;
}

function draw()
 {
   invisibleGround=createSprite(200,700,1000,20);
   invisibleGround.visible=false;
  
   if(gameState===PLAY){

   
   if(bg.x<0){
     bg.x=bg.width/2;
    
   }
   
   if(keyDown("space")&& bird.y>=399){
     bird.velocityY=-20;
     score=score+1;
     }
    if(score>0&&score%100===0){
      obs.velocityX=-(4+3*score/100);
    }
     if(bird.y<=399){
       bird.changeAnimation("flying",bird_flying);
       bird.scale=0.3;
     }
     if(bird.y>=399){
       bird.changeAnimation("running",bird_running);
       bird.scale=0.6;
           }
           

    bird.velocityY+=0.5;
   //console.log(bird.y);
 
  
 spawnObstacles();
 if(obsGroup.isTouching(bird)){
  console.log("END");
  gameState=END;
}
          }
          else if(gameState===END){
bird.changeAnimation("dead",bird_dead);
bird.scale=0.2;
bg.velocityX=0;
obsGroup.setVelocityXEach(0);
gameOver=createSprite(500,500);
gameOver.addImage(gameoverIMG);
gameOver.scale=0.5;
          }
  bird.collide(invisibleGround);
  
  drawSprites();
  textSize(24);
  fill("red");
text("Score : "+score,800,50);


}
function spawnObstacles(){
  if(World.frameCount%200===0){

  
  obs=createSprite(600,550,0.1,0.1);
  obs.addImage(obsIMG);
  obs.scale=2.5;
obs.velocityX=-4; 
obsGroup.add(obs);

}
}

