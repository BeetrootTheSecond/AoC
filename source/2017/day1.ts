export const day1 = (data: string[], part: string) => {
  let numbers = data[0].split("").map((number) => parseInt(number));

  let partOne = numbers.reduce((total, nextDigit, index) => {
    if (index == numbers.length - 1) {
      if (nextDigit == numbers[0]) {
        return total + nextDigit;
      }
    }
    if (nextDigit == numbers[index + 1]) {
      return total + nextDigit;
    }
    return total;
  }, 0);
  //console.log(numbers);
  if (part == "1") {
    return partOne;
  }
  let halfway = numbers.length / 2;
  let partTwo = numbers.reduce((total, nextDigit, index) => {
    if (nextDigit == numbers[(index + halfway) % numbers.length]) {
      return total + nextDigit;
    }
    return total;
  }, 0);
  return partTwo;
};
