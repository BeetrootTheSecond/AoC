export const day1 = (data: string[], part: string) => {
    let processedData = data
  .map(freq => { return {Symbol: freq.substring(0,1), number:parseInt(freq.substring(1))}})
    if(part == '1'){
  let part1 = processedData.reduce((total,nextFreq) => nextFreq.Symbol == '+' ? total + nextFreq.number : total - nextFreq.number,0 );

    return part1;
}

    let totalsReached : Record<number,number>=[];
    let currentFreq = 0;

    for (let index = 0; index < processedData.length; index++) {
        const nextFreq = processedData[index];

        currentFreq = nextFreq.Symbol == '+' ? currentFreq + nextFreq.number : currentFreq - nextFreq.number;
        totalsReached[currentFreq] = totalsReached[currentFreq] + 1 || 1;
        if(totalsReached[currentFreq] == 2 ){
            break;
        }

        if(processedData.length-1 == index){
            index = -1;
        }
        
    }
    return currentFreq;

};
