export enum Compass {
  North = 0,
  Northeast = 1,
  East = 2,
  Southeas = 3,
  South = 4,
  Southwest = 5,
  West = 6,
  NorthWest = 7,
}

export class compass {
  currentDirection: Compass = 0;
  eightPointCompass: boolean = false;

  constructor(startingDirection: Compass, eightPointCompass = false) {
    this.currentDirection = startingDirection;
    this.eightPointCompass = eightPointCompass;
    if (!eightPointCompass) {
      if (this.currentDirection % 2 == 1) {
        throw new Error("Invaild starting direction selected");
      }
    }
  }

  rotateLeft() {
    if (this.eightPointCompass) {
      if (this.currentDirection == 0) {
        this.currentDirection = 7;
        return;
      }
      this.currentDirection--;
      return;
    }
    if (this.currentDirection == 0) {
      this.currentDirection = 6;
      return;
    }
    this.currentDirection -= 2;
    return;
  }

  rotateRight() {
    if (this.eightPointCompass) {
      if (this.currentDirection == 0) {
        this.currentDirection = 7;
        return;
      }
      this.currentDirection++;
      return;
    }

    if (this.currentDirection == 6) {
      this.currentDirection = 0;
      return;
    }
    this.currentDirection += 2;
    return;
  }

  turnAround() {
    this.currentDirection += 4;
    if (this.currentDirection > 7) {
      this.currentDirection -= 8;
    }
    return;
  }

  print() {
    return Compass[this.currentDirection];
  }
}
