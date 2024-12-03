export const day3 = (data: string[], part: string )=> {


    //console.log(data); 
    let regResults = data.map(memoryRow => [...memoryRow.matchAll(/mul\(\d?\d?\d,\d?\d?\d\)/gm)]).flat();
    console.log(regResults.length);

    let multipledData = regResults.map(result => [...result[0].matchAll(/\d?\d?\d/gm)].map(foundInt => parseInt(foundInt[0])))

    console.log(multipledData);

    if(part == '1'){
        let totalSum = multipledData.reduce((total,nextSum)=> total + (nextSum[0]*nextSum[1]) ,0)
        console.log(`Star 1 Result : ${totalSum} `);
        return;
    }

};

// bad result 190233294 to high