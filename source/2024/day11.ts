

export const day11 = (data: string[], part: string) => {
  let stones = data[0].split(" ").map((stone) => parseInt(stone));
  let blinkCount = part == "1" ? 25 : 75;

  let OneAtATimeCache: Record<string, number> = {};
  const OneAtATimeMemor = (blinkNumber: number, stone: number): number => {
    let key = `${blinkNumber}-${stone}`;
    OneAtATimeCache[key] = OneAtATimeCache[key] || OneAtATime(blinkNumber, stone);
    return OneAtATimeCache[key];
  };

  const OneAtATime = (blinkNumber: number, stone: number): number => {
    if (blinkNumber == blinkCount) {
      return 1;
    }
    if (stone == 0) {
      return OneAtATimeMemor(blinkNumber + 1, 1);
    }
    let stoneString = stone.toString();
    if (stoneString.length % 2 == 0) {
      //its Even;
      let splitStoneLeft = parseInt(
        stoneString
          .split("")
          .slice(0, stoneString.length / 2)
          .join("")
      );
      let splitStoneRight = parseInt(
        stoneString
          .split("")
          .slice(stoneString.length / 2, stoneString.length)
          .join("")
      );
      return (
        OneAtATimeMemor(blinkNumber + 1, splitStoneLeft) +
        OneAtATimeMemor(blinkNumber + 1, splitStoneRight)
      );
    }
    return OneAtATimeMemor(blinkNumber + 1, stone * 2024);
  };

  let stonesResults = stones.map((stone: number) => {
    return OneAtATimeMemor(0, stone);
  });

  let TotalStones = stonesResults.reduce(
    (total, stoneCount) => (total += stoneCount),
    0
  );

  //console.log(`Results : ${TotalStones}`);
  return TotalStones;
};
