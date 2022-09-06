const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
var engine, world, ground;
var background_gif, tower, cannon, cannonBase;
var angle;
var balls = [];
var boats = [];
var boatImages = [];
var boatData;
var boatSheet;
var brokenBoatImages = [];
var brokenBoatData;
var brokenBoatSheet;
var splashImages = [];
var splashData;
var splashSheet;
var isGameOver = false;
var score = 0;
var backgroundMusic, cannonExplosion, cannonWater, pirateLaugh;


function preload() {
  background_gif = loadImage("assets/background.gif");
  tower_img = loadImage("assets/tower.png");
  boatSheet = loadImage("assets/boat/boat.png");
  boatData = loadJSON("assets/boat/boat.json");
  brokenBoatSheet = loadImage("assets/boat/brokenBoat.png");
  brokenBoatData = loadJSON("assets/boat/brokenBoat.json");
  splashSheet = loadImage("assets/waterSplash/waterSplash.png");
  splashData = loadJSON("assets/waterSplash/waterSplash.json");
  backgroundMusic = loadSound("assets/background_music.mp3");
  cannonExplosion = loadSound("assets/cannon_explosion.mp3");
  cannonWater = loadSound("assets/cannon_water.mp3");
  pirateLaugh = loadSound("assets/pirare_laugh.mp3");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(150,355,170,200,options);
  World.add(world, tower);

  angleMode(DEGREES);
  angle = 20;
  cannon = new Cannon(170, 95, 100, 100, angle);

  //extracing the boat images one by one using afor loop and pushing them into an empty array
  var frameInfo = boatData.frames;
  for (var i = 0; i < frameInfo.length; i++)
  {
    var pos = frameInfo[i].position;
    var img = boatSheet.get(pos.x,pos.y,pos.w,pos.h);
    boatImages.push(img);
  }
  
  var brokenFrameInfo = brokenBoatData.frames;
  for (var i = 0; i < brokenFrameInfo.length; i++)
  {
    var brokenPos = brokenFrameInfo[i].position;
    var brokenImg = brokenBoatSheet.get(brokenPos.x,brokenPos.y,brokenPos.w,brokenPos.h);
    brokenBoatImages.push(brokenImg);
  }

  var splashFrame = boatData.frames;
  for (var i = 0; i < splashFrame.length; i++)
  {
    var splashPos = splashFrame[i].position;
    var splashImg = splashSheet.get(splashPos.x,splashPos.y,splashPos.w,splashPos.h);
    splashImages.push(splashImg);
  }
}

function draw() {
  background(189);
  
  Engine.update(engine);


  image(background_gif, 0, 0, 1200, 600);
  if (!backgroundMusic.isPlaying())
  {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
  }
  textSize(20);
  text("Score: "+score,width-200,50);
  push();
  imageMode(CENTER);

  image(tower_img, tower.position.x, tower.position.y, 170, 350);
  pop ();

  rect(ground.position.x, ground.position.y, width * 2, 1);

  cannon.display();
  for (var i = 0; i < balls.length; i++)
  {
    showCannonballs(balls[i],i);
    collisionWithBoat(i);
  }
  showBoats();

}

function collisionWithBoat(index)
{
  for (var i = 0; i < boats.length; i++)
  {
    if (balls[index] != undefined && boats[i] != undefined)
    {
        var collision = Matter.SAT.collides(balls[index].body,boats[i].body);
        if (collision.collided)
        {
          boats[i].remove(i);
          World.remove(world,balls[index].body);
          delete balls[index];
          score++;
        }
    }
  }
}

function showCannonballs(ball,i)
{
  if (ball)
  {
    ball.display();
    ball.animate();
    if (ball.body.position.x > width+10 || ball.body.position.y > height - 50)
    {
      ball.remove(i);
    }
  }
}

function showBoats()
{
  if (boats.length > 0)
  {
    if (boats[boats.length-1].body == undefined || boats[boats.length-1].body.position.x < width-300)
    {
      var numbers = [-40,-60,-70,-50];
      var position = random(numbers);
      boat = new Boat(width,height-50,150,150,position,boatImages);
      boats.push(boat);
    }
    for (var i = 0; i < boats.length; i++)
    {
      if (boats[i])
      {
        Body.setVelocity(boats[i].body,{x: -2,y:0});
        boats[i].display();
        boats[i].animate();
        var towerCollision = Matter.SAT.collides(tower,boats[i].body);
        if (towerCollision.collided && !boats[i].isBroken)
        {
          isGameOver = true;
          gameOver();
        }
      }
    }
  } else 
  {
    boat = new Boat(width,height-50,150,150,-50,boatImages);
    boats.push(boat);
  }
}

function keyPressed()
{
  if (keyCode == RIGHT_ARROW)
  {
    cannonball = new Cannonball(cannon.x, cannon.y-10);
    balls.push(cannonball);
  }
}

function keyReleased() 
{
  if (keyCode == RIGHT_ARROW) {
    cannonExplosion.play();
    balls[balls.length-1].shoot();
  }
}

function gameOver()
{
  swal({
    title: "Game Over",
    text: "Thanks for playing",
    imageUrl: "https://th.bing.com/th/id/R.d4f24c3cdcf9261f1e1d9f13e234de57?rik=u7bzQHALojCrDw&riu=http%3a%2f%2fsweetclipart.com%2fmultisite%2fsweetclipart%2ffiles%2fx_mark_red_circle.png&ehk=8CU8M3DrNvMs6wr4DPqhJDnuFhj5pEDOE0BrDUJzI44%3d&risl=&pid=ImgRaw&r=0",
    imageSize: "200x200",
    confirmButtonText: "Play Again"
  },
  function(isConfirm)
  {
    if (isConfirm)
    {
      location.reload();
    }
  }
  ) 
}