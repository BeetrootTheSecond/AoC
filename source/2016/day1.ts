import { compass, Compass } from "../utilities/commonDirection";
export const day1 = (data: string[], part: string) => {
  let movements = data[0].split(", ").map((movement) => {
    let splitMove = movement.split("");

    return {
      direction: splitMove[0],
      distance: parseInt(movement.substring(1)),
    };
  });

  //console.log(movements);

  const directionFacing = new compass(Compass.North);
  let movesNorth = 0;
  let movesEast = 0;
  let grid: Array<Array<number>> = [];

  for (let index = 0; index < movements.length; index++) {
    const move = movements[index];

    if (move.direction == "L") {
      directionFacing.rotateLeft();
    } else {
      directionFacing.rotateRight();
    }

    switch (directionFacing.currentDirection) {
      case Compass.North: {
        movesNorth += move.distance;
        break;
      }
      case Compass.East: {
        movesEast += move.distance;
        break;
      }
      case Compass.South: {
        movesNorth -= move.distance;
        break;
      }
      case Compass.West: {
        movesEast -= move.distance;
        break;
      }
    }
  }
  if (part == "1") {
    return movesNorth + movesEast;
  }
};
