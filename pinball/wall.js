class Wall {
  constructor(x, y, w, h, a, c) {
    this.options = {
      isStatic: true,
      friction: 0,
      restitution: 0.9,
      angle: PI/a,
      chamfer: { radius: c }
    };
    this.body = Matter.Bodies.rectangle(x, y, w, h, this.options);
    this.body.render.fillStyle = "#000";
    Matter.World.add(world, this.body);
  }


  }
