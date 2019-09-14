class Poly {
  constructor(x, y, s, r, a, c) {
    this.options = {
      friction: 0,
      restitution: 0.9,
      isStatic: true,
      angle: PI/a,
      chamfer: { radius: c }
    };

    this.body = Matter.Bodies.polygon(x, y, s, r, this.options);
    this.body.render.fillStyle = "#000";
    Matter.World.add(world, this.body);
  }

}
