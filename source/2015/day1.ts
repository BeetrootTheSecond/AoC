export const day1 = (data: string[], part: string) => {
  let EndFloors = data[0].split("").reduce((total, floorChar) => {
    if (floorChar == "(") {
      return total + 1;
    }
    return total - 1;
  }, 0);

  if (part == "1") {
    return EndFloors;
  }
};
