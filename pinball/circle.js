class Circle {
  constructor(x, y, r, fixed) {
    this.options = {
      friction: 0,
      restitution: 1,
      isStatic: fixed
    };
    this.body = Matter.Bodies.circle(x, y, r, this.options);
    this.r = r;
    this.body.render.fillStyle = "#000";
    Matter.World.add(world, this.body);
  }
}
