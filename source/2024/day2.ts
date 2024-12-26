export const day2 = (data: string[], part: string) => {

    let levels = data.map(level => level.split(' ').map(report => parseInt(report)));



    if (part == '1') {
        let safeLevels = levels.filter(reports => isReportSafe(reports))
        //console.log(`Star 1 Result : ${safeLevels.length} `);
        return safeLevels.length;
    }


    let safeLevels = levels.filter(reports => {

        let isSafe = isReportSafe(reports);
        if (isSafe) {
            return isSafe;
        }

        for (let index = 0; index < reports.length; index++) {
            let reportCopy = [...reports];
            let newReport = reportCopy.splice(index, 1);
            let safeWithoutIndex = isReportSafe(reportCopy);
            if (safeWithoutIndex) {
                return safeWithoutIndex;
            }
        }

        return isSafe;


    })


    //console.log(`Star 2 Result : ${safeLevels.length} `);
    return safeLevels.length;
}

function isReportSafe(reports: number[]) {

    const minDifference = 1;
    const maxDifference = 3;

    //console.log(reports);

    let isSafe = true;
    let isDecreasing = (reports[1] - reports[0]) < 0;
    for (let index = 1; index < reports.length; index++) {
        let reportDiffence = reports[index - 1] - reports[index];

        if (reportDiffence < 0 == isDecreasing) {
            isSafe = false;
            break;
        }

        let reportDiffenceAbs = Math.abs(reportDiffence)
        if (reportDiffenceAbs < minDifference || reportDiffenceAbs > maxDifference) {
            isSafe = false;
            break;
        }

    }

    //console.log(isSafe);
    return isSafe;

}