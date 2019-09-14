class Ball {
  constructor(x, y, r) {
    this.options = {
      friction: 0,
      frictionAir: 0.01,
      restitution: 1,
      density: 0.0005
    };
    this.body = Matter.Bodies.circle(x, y, r, this.options);
    this.r = r;
    Matter.World.add(world, this.body);

  }


  isOffScreen() {
    let pos = this.body.position;
    return (pos.y > height + 100);
  }

  removeFromWorld() {
    Matter.World.remove(myWorld, this.body);
  }
}
