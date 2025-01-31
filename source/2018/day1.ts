export const day1 = (data: string[], part: string) => {
  let part1 = data
  .map(freq => { return {Symbol: freq.substring(0,1), number:parseInt(freq.substring(1))}})
  .reduce((total,nextFreq) => nextFreq.Symbol == '+' ? total + nextFreq.number : total - nextFreq.number,0 );

    return part1;
};
