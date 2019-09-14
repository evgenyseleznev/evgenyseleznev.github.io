class Vert {
  constructor(x, y) {
    this.options = {
      friction: 0,
      restitution: 0.9,
      isStatic: true
    };
    let vertices = [{
      x: 0,
      y: 0
    }, {
      x: 50,
      y: 50
    }, {
      x: 50,
      y: 0
    }];
    this.x = x;
    this.y = y;
    this.body = Matter.Bodies.fromVertices(x, y, vertices, this.options);
    Matter.World.add(world, this.body);
  }

}
