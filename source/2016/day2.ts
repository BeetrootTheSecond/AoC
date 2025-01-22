import { Vector } from "../utilities/Vector";

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

  console.log(keypad[position.x][position.y]);
  for (let index = 0; index < instructions.length; index++) {
    const line = instructions[index];
    line.forEach((move) => {
      let direction = Vector.UP;
      switch (move) {
        case "U": {
          direction = Vector.UP;
          break;
        }
        case "D": {
          direction = Vector.DOWN;
          break;
        }
        case "L": {
          direction = Vector.LEFT;
          break;
        }
        case "R": {
          direction = Vector.RIGHT;
          break;
        }
      }

      let savedPosition = position;
      position = position.add(direction);
      if (
        !(keypad[position.x] != null && keypad[position.x][position.y] != null)
      ) {
        position = savedPosition;
      }
    });

    bathroomCode.push(keypad[position.x][position.y]);
  }

  let finalBathroomCode: string | null = bathroomCode.reduce(
    (final, digit) => `${final}${digit}`,
    ""
  );
  return finalBathroomCode;
};
