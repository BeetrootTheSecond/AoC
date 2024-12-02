export const day2 = (data: string[], part: string )=> {

    let levels = data.map(level => level.split(' ').map(report => parseInt(report)));
    
    const minDifference = 1;
    const maxDifference = 3;

    let safeLevels = levels.filter(reports => {

        console.log(reports);

            let isSafe = true;
            let isDecreasing = (reports[1] - reports[0]) < 0;
            for (let index = 1; index < reports.length; index++) {
                let reportDiffence = reports[index-1] - reports[index];

                if(reportDiffence < 0  == isDecreasing){
                    isSafe = false;
                    break;
                }

                let reportDiffenceAbs=  Math.abs(reportDiffence)
                if(reportDiffenceAbs< minDifference || reportDiffenceAbs > maxDifference )                
                {
                    isSafe = false; 
                    break;
                }
                
            }
            
            console.log(isSafe);
            return isSafe;

        return false;
        })



    if(part == '1'){

        console.log(`Star 1 Result : ${safeLevels.length} `);
        return;
    }


    console.log(`Star 2 Result : ${safeLevels.length} `);
    return;
}