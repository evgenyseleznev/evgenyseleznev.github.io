class Box {
  constructor(x, y, w, h, fixed, a,c) {
    this.options = {
      friction: 0,
      restitution: 1,
      isStatic: fixed,
      angle: a,
      chamfer: { radius: c }
    };
    this.body = Matter.Bodies.rectangle(x, y, w, h, this.options);
    this.body.render.fillStyle = "#000";
    Matter.World.add(world, this.body);
  }
}
