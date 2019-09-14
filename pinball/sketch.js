let engine;
let render;
let myConstraint;
let paddleRight;
let paddleV;
let ball;
let nouns = [
  "SF Nouns/alcatraz.svg",
  "SF Nouns/bridge.svg",
  "SF Nouns/cable-car.svg",
  "SF Nouns/chinatown.svg",
  "SF Nouns/city-hall.svg",
  "SF Nouns/crab.svg",
  "SF Nouns/ferry-building.svg",
  "SF Nouns/sea-lion.svg",
  "SF Nouns/sutro-tower.svg",
  "SF Nouns/transamerica.svg"
];
let obstacles = [];
let hitFilter1;
let hitFilter2;
let hitFilter3;
let numberOfCounts;

function setup() {
  noCanvas();
  engine = Matter.Engine.create();
  world = engine.world;
  world.gravity.y = 0.7;
  numberOfCounts = 0;
  render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false
    }
  });

  // Machine Outline
  let rightWall = new Wall(795, 360, 10, 500, 1, 0);
  let innerRightWall = new Wall(700, 400, 10, 500, 1, 0);
  let topRightAngle = new Wall(710, 20, 100, 10, 7, 0);
  let topRightAngle2 = new Wall(776, 78, 90, 10, 3, 0);
  let topLeftAngle = new Wall(70, 30, 200, 10, -7, 0);
  let topWall = new Wall(400, 0, 560, 10, 1, 0);
  let leftWall = new Wall(5, 360, 10, 600, 1, 0);
  let insideLeft = new Wall(120, 350, 30, 200, 1, 10);
  let insideLeftSmall = new Wall(220, 350, 30, 130, 1, 10);
  let insideLeftAngle = new Wall(170, 470, 30, 140, -3, 10);
  let insideRight = new Wall(580, 350, 30, 200, 1, 10);
  let insideRightSmall = new Wall(480, 350, 30, 130, 1, 10);
  let insideRightAngle = new Wall(530, 470, 30, 140, 3, 10);
  let leftBottomTriangle = new Poly(85, 600, 3, 150, 3, 0);
  let rightBottomTriangle = new Poly(620, 600, 3, -150, 3, 0);
  let leftMidTriangle = new Poly(28, 200, 3, 50, 1, 10);
  let rightMidTriangle = new Poly(678, 200, 3, -50, 1, 10);
  let topLeftTriangle = new Poly(0,-10,3,150,1,0);
 let topRightTriangle1 = new Poly(810,-10,3,-150,1,0);
 let topRightTriangle2 = new Poly(827,10,3,150,6,0);

  // Paddle Right
  paddleRight = new Box(440, 520, 100, 20, false, 0, 0);
  paddleRight.body.collisionFilter.group = 1;
  let paddleAnchorRight = new Circle(465, 510, 1, true);
  let paddleRightConstraintOptions = {
    bodyA: paddleRight.body,
    pointA: {
      x: 50,
      y: 0
    },
    bodyB: paddleAnchorRight.body,
    pointB: {
      x: 0,
      y: 0
    },
    length: 1,
    stiffness: 0.1
  };
  myConstraint = Matter.Constraint.create(paddleRightConstraintOptions);
  Matter.World.add(world, myConstraint);

  // Paddle Left
  paddleLeft = new Box(240, 520, 100, 20, false, 0, 0);
  paddleLeft.body.collisionFilter.group = 1;
  let paddleAnchorLeft = new Circle(235, 510, 1, true);
  let paddleLeftConstraintOptions = {
    bodyA: paddleLeft.body,
    pointA: {
      x: -50,
      y: 0
    },
    bodyB: paddleAnchorLeft.body,
    pointB: {
      x: 0,
      y: 0
    },
    length: 1,
    stiffness: 0.1
  };
  my2ndConstraint = Matter.Constraint.create(paddleLeftConstraintOptions);
  Matter.World.add(world, my2ndConstraint);

  // Paddle Limiters
  let limiterTopRight = new Circle(430, 430, 20, true);
  limiterTopRight.body.collisionFilter.group = -1;
  limiterTopRight.body.render.fillStyle = "#fff";
  limiterTopRight.body.render.visible = false;
  let limiterBottomRight = new Circle(430, 570, 20, true);
  limiterBottomRight.body.collisionFilter.group = -1;
  limiterBottomRight.body.render.fillStyle = "#fff";
    limiterBottomRight.body.render.visible = false;
  let limiterTopLeft = new Circle(270, 430, 20, true);
  limiterTopLeft.body.collisionFilter.group = -1;
  limiterTopLeft.body.render.fillStyle = "#fff";
  limiterTopLeft.body.render.visible = false;
  let limiterBottomLeft = new Circle(270, 570, 20, true);
  limiterBottomLeft.body.collisionFilter.group = -1;
  limiterBottomLeft.body.render.fillStyle = "#fff";
  limiterBottomLeft.body.render.visible = false;

  // Obstacles
  let obstacle1 = new Box(360, 220, 70, 70, true, 0, 30);
  obstacle1.body.render.sprite.texture = "SF Nouns/cable-car.svg";
  obstacle1.body.collisionFilter.group = -2;
  let obstacle2 = new Box(180, 150, 70, 70, true, 0, 30);
  obstacle2.body.render.sprite.texture = "SF Nouns/bridge.svg";
  obstacle2.body.collisionFilter.group = -2;
  let obstacle3 = new Box(540, 150, 70, 70, true, 0, 30);
  obstacle3.body.render.sprite.texture = "SF Nouns/transamerica.svg";
  obstacle3.body.collisionFilter.group = -2;
  obstacles.push(obstacle1, obstacle2, obstacle3);

  // Displayed when obstacles are hit
  hitFilter1 = new Box(360, 200, 100, 100, true, 0, 0);
  hitFilter1.body.render.fillStyle = "#f4d905";
  hitFilter1.body.render.opacity = 0;
  hitFilter1.body.collisionFilter.group = -2;
  hitFilter2 = new Box(180, 140, 100, 100, true, 0, 0);
  hitFilter2.body.render.fillStyle = "#f4d905";
  hitFilter2.body.render.opacity = 0;
  hitFilter2.body.collisionFilter.group = -2;
  hitFilter3 = new Box(540, 140, 100, 100, true, 0, 0);
  hitFilter3.body.render.fillStyle = "#f4d905";
  hitFilter3.body.render.opacity = 0;
  hitFilter3.body.collisionFilter.group = -2;

  // ball
  ball = new Ball(760, 500, 20);
  ball.body.collisionFilter.group = -1;
  Matter.Body.setVelocity(ball.body, {
    x: 0,
    y: -19
  });
  Matter.Engine.run(engine);
  Matter.Render.run(render);

  // collision events
  Matter.Events.on(engine, "collisionStart", function(event) {
    var pairs = event.pairs;
    // change colours to show those starting a collision
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      if (pair.bodyA.collisionFilter.group === -2) {
        pair.bodyA.render.opacity = 1;
        numberOfCounts++;
        updateScore();
      }
    }
  });
}

// Arrow key functionality
function keyPressed() {
  if (keyCode === 39) {
    Matter.Body.setVelocity(paddleRight.body, {
      x: 0,
      y: -19
    });
  } else if (keyCode === 37) {
    Matter.Body.setVelocity(paddleLeft.body, {
      x: 0,
      y: -19
    });
  }
}

// workaround for making hitFilters go back to opacity 0 after hit
function draw() {
  if (frameCount % 5 === 0) {
    hitFilter1.body.render.opacity = 0;
    hitFilter2.body.render.opacity = 0;
    hitFilter3.body.render.opacity = 0;
  }
}

function updateScore() {
  $("#score")[0].innerHTML = numberOfCounts;
}
