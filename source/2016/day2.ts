import { Direction, Vector } from "../utilities/Vector";

export const day2 = (data: string[], part: string) => {
  const instructions = data.map((row) => row.split(""));

  console.log(instructions);

  let keypad: Array<Array<number>> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let position = new Vector(1, 1);
  let bathroomCode: Array<number> = [];

  console.log(keypad[position.X][position.Y]);
  for (let index = 0; index < instructions.length; index++) {
    const line = instructions[index];
    line.forEach((move) => {
      let direction = Direction.Up;
      switch (move) {
        case "U": {
          direction = Direction.Up;
          break;
        }
        case "D": {
          direction = Direction.Down;
          break;
        }
        case "L": {
          direction = Direction.Left;
          break;
        }
        case "R": {
          direction = Direction.Right;
          break;
        }
      }

      let savedPosition = position.copy();
      position.moveVector(direction);
      if (
        !(keypad[position.X] != null && keypad[position.X][position.Y] != null)
      ) {
        position = savedPosition;
      }
    });

    bathroomCode.push(keypad[position.X][position.Y]);
  }

  let finalBathroomCode: string = bathroomCode.reduce(
    (final, digit) => `${final}${digit}`,
    ""
  );
  return finalBathroomCode;
};
