var Tower, TowerImg;
var Door, DoorImg, DoorsGroup;
var climber, climberImg, climbersGroup;
var Ghost, GhostImg;
var InvisibleBlock, InvisibleBlocksGroup;
var gameState = 'PLAY', SpookySound;

function preload()
  {
    GhostImg = loadImage('ghost-standing.png');
    
    TowerImg = loadImage('tower.png');
    DoorImg = loadImage('door.png');
    climberImg = loadImage('climber.png');
    SpookySound = loadSound('spooky.wav');
  }

function setup()
  {
    createCanvas(600,600);
    SpookySound.loop();
    
    Tower = createSprite(300,300);
    Tower.addImage("tower",TowerImg);
    Tower.velocityY = 5;
    
    Ghost = createSprite(300,300,50,50);
    Ghost.scale = 0.3;
    Ghost.addImage(GhostImg);
    
    DoorsGroup = new Group ();
    climbersGroup = new Group();
    InvisibleBlocksGroup = new Group();
  }

function draw()
  {
    background("azure");
    
    
    if(gameState === 'PLAY')
      {
    if(Tower.y > 575)
      {
        Tower.y = 300;
      }
    if(keyDown("left_arrow"))
      {
        Ghost.x = Ghost.x - 3;
      }
    
    if(keyDown("right_arrow"))
      {
        Ghost.x = Ghost.x + 3;
      }
    
    if(keyDown("space"))
      {
        Ghost.velocityY = -5;
      }
    
    //Adding Gravity to the Ghost
    Ghost.velocityY = Ghost.velocityY + 0.8;
    
    if(climbersGroup.isTouching(Ghost))
      {
        Ghost.velocityY = 0;
      }
    
    if(InvisibleBlocksGroup.isTouching(Ghost) || Ghost.y > 600)
      {
        Ghost.destroy();
        gameState = 'END';
      }
    spawnDoors();
    
    drawSprites();
      }
    
    if(gameState === 'END')
      {
        stroke("black");
        fill("blue");
        textSize(50);
        text("Game Over", 220, 300);
      }
  }

function spawnDoors()
  {
    if(frameCount % 240 === 0)
      {    
        Door = createSprite(300,10);
        Door.addImage(DoorImg);
        
        climber = createSprite(200,75);
        climber.addImage(climberImg);
        
        InvisibleBlock = createSprite(200,80);
        InvisibleBlock.height = 10;
        InvisibleBlock.width = climber.width;
        
        
        //InvisibleBlock.visible = false;
        
        
        Door.velocityY = 5;
        Door.x = Math.round(random(120,400));
        
        climber.x = Door.x;
        climber.velocityY = 5;
        InvisibleBlock.x = Door.x;
        InvisibleBlock.velocityY = 5;
        
        Ghost.depth = Door.depth;
        Ghost.depth +=1;
        
        Door.lifetime = 110;
        climber.lifetime = 110;
        InvisibleBlock.lifetime = 110;
        
        DoorsGroup.add(Door);
        climbersGroup.add(climber);
        InvisibleBlock.debug = true;
        InvisibleBlocksGroup.add(InvisibleBlock);
        
      }
  }