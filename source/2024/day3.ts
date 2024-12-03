export const day3 = (data: string[], part: string )=> {


    //console.log(data); 
    // /mul\(\d?\d?\d,\d?\d?\d\)/gm
    // /don't\(\)|do\(\)|mul\(\d?\d?\d,\d?\d?\d\)/gm
    let regResults = data.map(memoryRow => [...memoryRow.matchAll(/don't\(\)|do\(\)|mul\(\d?\d?\d,\d?\d?\d\)/gm)]).flat();
    console.log(regResults.length);

    //let multipledData = regResults.map(result => [...result[0].matchAll(/\d?\d?\d/gm)].map(foundInt => parseInt(foundInt[0])))

    if(part == '1'){
        let multipledData = regResults.filter(result => result[0].match(/mul\(\d?\d?\d,\d?\d?\d\)/gm) != null)
            .map(result => [...result[0].matchAll(/\d?\d?\d/gm)]
            .map(foundInt => parseInt(foundInt[0])))
        let totalSum = multipledData.reduce((total,nextSum)=> total + (nextSum[0]*nextSum[1]) ,0)
        console.log(`Star 1 Result : ${totalSum} `);
        return;
    }

    let isEnabled = true;
    let total = 0;

        for (let index = 0; index < regResults.length; index++) {
            const result = regResults[index][0];

            if(result == 'do()'){
                isEnabled=true;
            }
            else if(result == "don't()"){
                isEnabled=false;
            }
            else if(isEnabled){
                let foundValue = [...result.matchAll(/\d?\d?\d/gm)].map(foundInt => parseInt(foundInt[0]));
                let value = foundValue[0] * foundValue[1];
                total += value;
            }


            
        }
        
        console.log(`Star 2 Result : ${total} `);

        return;




};

// bad result 190233294 to high