export const day3 = (data: string[], part: string) => {
  let triangle = data
    .map((rawstring) =>
      rawstring
        .trim()
        .split("  ")
        .map((s) => parseInt(s.trim()))
        .filter((digit) => !isNaN(digit))
        .sort((a,b)=>b-a)
    )
    .filter(
      (possibleTrangle) =>
        possibleTrangle[0] < (possibleTrangle[1] + possibleTrangle[2])  &&
         possibleTrangle[1] < (possibleTrangle[0] + possibleTrangle[2]) &&
         possibleTrangle[2] < (possibleTrangle[1] + possibleTrangle[0])
    );

  return triangle.length;
};
