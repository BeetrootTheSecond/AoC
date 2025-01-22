export enum Direction {
  Up = 0,
  Right,
  Down,
  Left,
  UpRight,
  DownRight,
  DownLeft,
  UpLeft,
}

export class Vector {
  X: number;
  Y: number;

  constructor(X: number, Y: number) {
    this.X = X;
    this.Y = Y;
  }

  moveVector(direction: Direction) {
    switch (direction) {
      case Direction.Up: {
        this.X -= 1;
        break;
      }
      case Direction.Down: {
        this.X += 1;
        break;
      }
      case Direction.Left: {
        this.Y -= 1;
        break;
      }
      case Direction.Right: {
        this.Y += 1;
        break;
      }
      case Direction.UpRight: {
        this.X -= 1;
        this.Y += 1;
        break;
      }
      case Direction.DownRight: {
        this.X += 1;
        this.Y += 1;
        break;
      }
      case Direction.UpLeft: {
        this.X -= 1;
        this.Y -= 1;
        break;
      }
      case Direction.DownLeft: {
        this.X += 1;
        this.Y -= 1;
        break;
      }
    }
  }

  copy() {
    return new Vector(this.X, this.Y);
  }
}
