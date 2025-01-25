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
  return partOne;
};
