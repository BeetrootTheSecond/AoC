export const day1 = (data: string[], part: string) => {
  let part2 = 0;
  let EndFloors = data[0].split("").reduce((total, floorChar, index) => {
    if (total == -1 && part2 == 0) {
      part2 = index;
    }

    if (floorChar == "(") {
      return total + 1;
    }
    return total - 1;
  }, 0);

  if (part == "1") {
    return EndFloors;
  }
  return part2;
};
