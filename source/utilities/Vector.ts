export class Vector {
  static UP = new Vector(-1, 0);
  static DOWN = new Vector(1, 0);
  static LEFT = new Vector(0, -1);
  static RIGHT = new Vector(0, 1);

  constructor(public x: number, public y: number) {}
  public add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }
}
