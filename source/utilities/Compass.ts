export enum CardinalDirection {
  North = 0,
  Northeast = 1,
  East = 2,
  Southeast = 3,
  South = 4,
  Southwest = 5,
  West = 6,
  NorthWest = 7,
}

export class Compass {
  currentDirection: CardinalDirection = 0;
  eightPointCompass: boolean = false;

  constructor(startingDirection: CardinalDirection, eightPointCompass = false) {
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
      this.currentDirection = (this.currentDirection += 7) % 8;
      return;
    }
    this.currentDirection = (this.currentDirection += 6) % 8;
  }

  rotateRight() {
    if (this.eightPointCompass) {
      this.currentDirection = (this.currentDirection += 1) % 8;
      return;
    }
    this.currentDirection = (this.currentDirection += 2) % 8;
  }

  turnAround() {
    this.currentDirection = (this.currentDirection + 4) % 8;
  }

  toString() {
    return CardinalDirection[this.currentDirection];
  }
}
