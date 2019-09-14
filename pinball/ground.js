class Ground {
  constructor(x, y, w, h, a) {
    this.options = {
      isStatic: true,
      friction: 0,
      restitution: 0.9,
      angle: PI/a
    };
    this.body = Matter.Bodies.rectangle(x, y, w, h, this.options);
    this.w = w;
    this.h = h;
    Matter.World.add(world, this.body);
  }


}
