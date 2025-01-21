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
  let grid: Record<string, number> = {};
  let newGrid: Array<Array<number>> = [];

  for (let index = 0; index < movements.length; index++) {
    const move = movements[index];

    if (move.direction == "L") {
      directionFacing.rotateLeft();
    } else {
      directionFacing.rotateRight();
    }

    for (let j = 0; j < move.distance; j++) {
      switch (directionFacing.currentDirection) {
        case Compass.North: {
          movesNorth += 1;
          break;
        }
        case Compass.East: {
          movesEast += 1;
          break;
        }
        case Compass.South: {
          movesNorth -= 1;
          break;
        }
        case Compass.West: {
          movesEast -= 1;
          break;
        }
      }
      if (part == "2") {
        let northside = newGrid[movesNorth] || [];
        northside[movesEast] = northside[movesEast]
          ? northside[movesEast] + 1
          : 1;
        newGrid[movesNorth] = northside;
        if (northside[movesEast] == 2) {
          break;
        }
      }
    }
    if (part == "2") {
      if (newGrid[movesNorth][movesEast] == 2) {
        break;
      }
    }
  }

  return Math.abs(movesNorth) + Math.abs(movesEast);
};
