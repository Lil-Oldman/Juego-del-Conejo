const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var button2;
var fr,rope2;

var starEmpty1, starEmpty2, starEmpty3;
var starFull1, starFull2, starFull3;
var starEmpty_img;
var starFull_img;

var canvasWidth, canvasHeight;

//************VARIABLES  DE SONIDO  */
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  starEmpty_img = loadImage("starEmpty.png");
  starFull_img = loadImage("starFull.png");
 

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  bk_song = loadSound("sound1.mp3");
  cut_sound = loadSound("rope_cut.mp3");
  sad_sound = loadSound("sad.wav");
  eating_sound = loadSound("eating_sound.mp3");
  air = loadSound("air.wav");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  //createCanvas(500,700);
 
  frameRate(80);

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canvasWidth = displayWidth
    canvasHeight = displayHeight
    createCanvas(canvasWidth,canvasHeight);
    console.log("Es movil");
  }else{
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth,canvasHeight);
    console.log("No es movil");
    console.log("CanvasWidth: " +canvasWidth);
    console.log("CanvasHeight: " +canvasHeight);
  }

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("cut_btn.png");
  button2.position(300,30);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  blower = createImg("balloon.png");
  blower.position(200,350);
  blower.size(50,50);
  blower.mouseClicked(blow);
  
  rope = new Rope(5,{x:245,y:30});
  rope2 = new Rope(5,{x: 325,y: 30});

  ground = new Ground(200,canvasHeight,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(420,canvasHeight-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  //Matter.Composite.add(rope.body,fruit);
  Matter.Composite.add(rope2.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);



  starEmpty1 = createSprite(50,50,50,50);
  starEmpty1.addAnimation("Full",starFull_img);
  starEmpty1.addAnimation("Empty",starEmpty_img);
  starEmpty1.changeAnimation("Empty");
  starEmpty1.scale = 0.02;

  starEmpty2 = createSprite(100,50,50,50);
  starEmpty2.addAnimation("Full",starFull_img);
  starEmpty2.addAnimation("Empty",starEmpty_img);
  starEmpty2.changeAnimation("Empty");
  starEmpty2.scale = 0.02;

  starEmpty3 = createSprite(150,50,50,50);
  starEmpty3.addAnimation("Full",starFull_img);
  starEmpty3.addAnimation("Empty",starEmpty_img);
  starEmpty3.changeAnimation("Empty");
  starEmpty3.scale = 0.02;

  starFull1 = createSprite(200,500,50,50);
  starFull1.addAnimation("Empty",starEmpty_img);
  starFull1.addAnimation("Full",starFull_img);
  starFull1.changeAnimation("Full");
  starFull1.scale = 0.02;

  starFull2 = createSprite(150,500,50,50);
  starFull2.addAnimation("Empty",starEmpty_img);
  starFull2.addAnimation("Full",starFull_img);
  starFull2.changeAnimation("Full");
  starFull2.scale = 0.02;

  starFull3 = createSprite(250,500,50,50);
  starFull3.addAnimation("Empty",starEmpty_img);
  starFull3.addAnimation("Full",starFull_img);
  starFull3.changeAnimation("Full");
  starFull3.scale = 0.02;


  bk_song.setVolume(0.42);
  bk_song.play();

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  //image(bg_img,0,0,490,690);
  image(bg_img,0,0,displayWidth,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    bk_song.stop();
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
  //*ANEXO  DE SONIDO 
    fruit=null;
    bk_song.stop();
    sad_sound.play();
   }

  if(collide(fruit,starFull1)==true){
    starFull1.changeAnimation("Empty");
    starEmpty1.changeAnimation("Full");
    console.log("Toca estrella 1");
   }
   if(collide(fruit,starFull2)==true){
    starFull2.changeAnimation("Empty");
    starEmpty2.changeAnimation("Full");
    console.log("Toca estrella 2");
   }
   if(collide(fruit,starFull3)==true){
    starFull3.changeAnimation("Empty");
    starEmpty3.changeAnimation("Full");
    console.log("Toca estrella 3");
   }
  
}


function drop()
{
 //*ANEXO  DE SONIDO 
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play();
}
function drop2()
{
  rope2.break()
  fruit_con_2.detach()
  fruit_con_2 = null;
  cut_sound.play();
}



function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              /*World.remove(engine.world,fruit);
               fruit = null;*/
               return true; 
            }
            else{
              return false;
            }
         }
}
function blow(){
  Matter.Body.applyForce(fruit, {x: 0,y: 0}, {x: 0.01, y: 0});
  air.play();
}

function keyPressed(){
  if(keyCode == RIGHT_ARROW){
    Matter.Body.applyForce(fruit, {x: 0,y: 0}, {x: 0.01, y: 0});
    air.play();
  }
  /*
  if(keyCode == SPACE){
    rope.break();
    fruit_con.detach();
    fruit_con = null; 
    cut_sound.play();
  }
  */
}




