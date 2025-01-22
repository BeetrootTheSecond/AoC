import { CardinalDirection, Compass } from "../utilities/Compass";
export const day1 = (data: string[], part: string) => {
  let movements = data[0].split(", ").map((movement) => ({
    direction: movement[0],
    distance: parseInt(movement.substring(1)),
  }));

  //console.log(movements);

  const directionFacing = new Compass(CardinalDirection.North);
  let movesNorth = 0;
  let movesEast = 0;
  let pathPositions: Array<Array<number>> = [];

  for (let index = 0; index < movements.length; index++) {
    const move = movements[index];

    if (move.direction == "L") {
      directionFacing.rotateLeft();
    } else {
      directionFacing.rotateRight();
    }

    for (let j = 0; j < move.distance; j++) {
      switch (directionFacing.currentDirection) {
        case CardinalDirection.North: {
          movesNorth += 1;
          break;
        }
        case CardinalDirection.East: {
          movesEast += 1;
          break;
        }
        case CardinalDirection.South: {
          movesNorth -= 1;
          break;
        }
        case CardinalDirection.West: {
          movesEast -= 1;
          break;
        }
      }
      if (part == "2") {
        let XPositions = pathPositions[movesNorth] || [];
        XPositions[movesEast] = XPositions[movesEast]
          ? XPositions[movesEast] + 1
          : 1;
        pathPositions[movesNorth] = XPositions;
        if (XPositions[movesEast] == 2) {
          break;
        }
      }
    }
    if (part == "2") {
      if (pathPositions[movesNorth][movesEast] == 2) {
        break;
      }
    }
  }

  return Math.abs(movesNorth) + Math.abs(movesEast);
};
