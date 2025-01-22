import { Direction, Vector } from "../utilities/Vector";

export const day2 = (data: string[], part: string) => {
  const instructions = data.map((row) => row.split(""));

  console.log(instructions);

  let keypad: Array<Array<string | null>> =
    part == "1"
      ? [
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
        ]
      : [
          [null, null, "1", null, null],
          [null, "2", "3", "4", null],
          ["5", "6", "7", "8", "9"],
          [null, "A", "B", "C", null],
          [null, null, "D", null, null],
        ];
  let position = part == "1" ? new Vector(1, 1) : new Vector(2, 0);
  let bathroomCode: Array<string | null> = [];

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

  let finalBathroomCode: string | null = bathroomCode.reduce(
    (final, digit) => `${final}${digit}`,
    ""
  );
  return finalBathroomCode;
};
