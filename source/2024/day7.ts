export const day7 = (data: string[], part: string) => {
  let mathEqueutions = data.map((row) => {
    let splitData = row.split(":");
    return {
      result: parseInt(splitData[0]),
      parameters: splitData[1]
        .trim()
        .split(" ")
        .map((para) => parseInt(para)),
    };
  });

  //console.log(mathEqueutions);

  let trueEqueutions = mathEqueutions.filter((mE) => {

    let allResults = mE.parameters.reduce((results, para, currentIndex) => {
      if (currentIndex == 0) {
        return [para];
      }
      let newResult: number[] = [];
      results.map(result => {
        newResult.push(result + para);
        newResult.push(result * para);

        if (part == '2') {
          if (currentIndex < mE.parameters.length) {
            //let concat = parseInt(`${para}${mE.parameters[currentIndex + 1]}`);
            //newResult.push(result + concat);
            newResult.push(parseInt(`${result}${para}`));
          }
        }
      });
      return newResult;
    }, [] as Array<number>);

    if (allResults.filter((value) => value == mE.result).length >= 1) {
      return true;
    }
    return false;


  });

  if (part == "1") {
    let starOneTotal = trueEqueutions.reduce((total, val) => total += val.result, 0);
    //console.log(`Star 1 Result : ${starOneTotal} `);
    return starOneTotal;
  }

  let starTwoTotal = trueEqueutions.reduce((total, val) => total += val.result, 0);
  //console.log(`Star 2 Result : ${starTwoTotal} `);
  return starTwoTotal;
};
