
export const day1 = (data: string[], part: string) => {



    //import the data into 2 arrays 

    // const sampleData = fs.readFileSync('.input/2024/1.sample.txt', 'utf-8');
    // const data = fs.readFileSync('.input/2024/1.txt', 'utf-8');

    let splitLine = data.map(line => line.split('   '))

    let leftList = splitLine.map(row => parseInt(row[0])).sort();
    let rightList = splitLine.map(row => parseInt(row[1])).sort();

    if (part == '1') {
        let listDiffences: number[] = leftList.map((location, index) => Math.abs(location - rightList[index]));
        let totalDistance = listDiffences.reduce((total, distance) => total + distance, 0);
        //console.log(`Star One : ${totalDistance} `);
        return totalDistance;
    }

    let similarityScores: number[] = leftList.map(location => location * rightList.filter(value => value == location).length);
    let totalSimilarityScore = similarityScores.reduce((total, score) => total + score, 0);
    //console.log(`Star Two : ${totalSimilarityScore} `);
    return totalSimilarityScore;
}