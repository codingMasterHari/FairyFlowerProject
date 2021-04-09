var myEngine, myWorld, myRedFlower, myRedFlowerImg, myYellowFlower, myBall, myGround, myFairyBody;

var fairy, fairyImg, gardenImg;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

const bgSound = new Audio("bgSoundTKB.wav");

function preload() {
  fairyImg = loadAnimation("fairyFly1.png", "fairyFly2.png");
  myRedFlowerImg = loadImage("redFlower.png");
  gardenImg = loadImage("roseGarden.png");
}

function setup() {
  createCanvas(1000, 400);

  fairy = createSprite(100, 200);
  fairy.addAnimation("fairy", fairyImg);
  fairy.scale = 0.15;
  // fairy.debug = true;

  myRedFlower = createSprite(800, 30);
	myRedFlower.addImage(myRedFlowerImg);
  myRedFlower.tint = "yellow";
	myRedFlower.scale = 0.1;

  ////////////////////////////////////////////////

  myEngine = Engine.create();
  myWorld = myEngine.world;

	myRedFlowerBody = Bodies.circle(800, 30, 5, {restitution: 0.5, isStatic: true});
	World.add(myWorld, myRedFlowerBody);

  // myFairyBody = Bodies.circle(100, 200, 20, {isStatic: true});
	// World.add(myWorld, myFairyBody);
	
	Engine.run(myEngine);

}

function draw() {
  background(10, 0, 0);
  background(gardenImg);
  
  Engine.update(myEngine);

  myRedFlower.x = myRedFlowerBody.position.x;
  myRedFlower.y = myRedFlowerBody.position.y;

  if(myRedFlower.y > 195 && myRedFlowerBody.position.y > 195) {
    Matter.Body.setStatic(myRedFlowerBody, true)
  }

  // fairy.x = myFairyBody.position.x;
  // fairy.y = myFairyBody.position.y;

  bgSound.play();
	bgSound.loop = true;

  // myFairyBody.x = fairy.x;
  // myFairyBody.y = fairy.y;

  // myRedFlower.collide(fairy);

  drawSprites();
}

function keyPressed() {

	if (keyCode === 40) {
		Matter.Body.setStatic(myRedFlowerBody, false); 
	}

	// fairy left and right
  if (keyCode === 37) {
    fairy.x -= 30;
		// Matter.Body.setPosition(myFairyBody, {x: x-5, y: 0})
	} else if (keyCode === 39) {
    fairy.x += 30;
		// Matter.Body.setPosition(myFairyBody, {x: x+5, y: 0});
	}
}