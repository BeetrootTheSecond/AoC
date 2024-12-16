
interface topPos {
    height: number; x: number; y: number
}

interface trailHead extends topPos {
    height: number; x: number; y: number;
    score: number; topPoses: topPos[];

}

const checkNextPosition = (topographicMap: topPos[][], currentPos: topPos) => {

    let nextPos: topPos[] = [currentPos]

    if (currentPos.height == 9) {
        return nextPos;
    }



    //up
    if (topographicMap[currentPos.y - 1] != undefined && topographicMap[currentPos.y - 1][currentPos.x] != undefined && topographicMap[currentPos.y - 1][currentPos.x].height == currentPos.height + 1) {
        nextPos.push(...checkNextPosition(topographicMap, topographicMap[currentPos.y - 1][currentPos.x]));
    }

    //down
    if (topographicMap[currentPos.y + 1] != undefined && topographicMap[currentPos.y + 1][currentPos.x] != undefined && topographicMap[currentPos.y + 1][currentPos.x].height == currentPos.height + 1) {
        nextPos.push(...checkNextPosition(topographicMap, topographicMap[currentPos.y + 1][currentPos.x]));
    }
    //left
    if (topographicMap[currentPos.y][currentPos.x - 1] != undefined && topographicMap[currentPos.y][currentPos.x - 1].height == currentPos.height + 1) {
        nextPos.push(...checkNextPosition(topographicMap, topographicMap[currentPos.y][currentPos.x - 1]));
    }
    //right
    if (topographicMap[currentPos.y][currentPos.x + 1] != undefined && topographicMap[currentPos.y][currentPos.x + 1].height == currentPos.height + 1) {
        nextPos.push(...checkNextPosition(topographicMap, topographicMap[currentPos.y][currentPos.x + 1]));
    }




    return nextPos;
}

export const day10 = (data: string[], part: string) => {

    const topographicMap: topPos[][] = data.map((line, y) => line.split('').map((cell, x) => ({ height: parseInt(cell), x, y })));

    const trailHeads: trailHead[] = topographicMap.flat().filter(cell => cell.height == 0).map(topPos => ({ ...topPos, score: 0, topPoses: [] }));


    trailHeads.map(trailHead => {

        trailHead.topPoses = checkNextPosition(topographicMap, topographicMap[trailHead.y][trailHead.x]);
        let highPoints = Array.from(new Set(trailHead.topPoses.filter(pos => pos.height == 9).map(topPos => JSON.stringify(topPos)))).map(topPos => JSON.parse(topPos) as topPos)
        trailHead.score = highPoints.length;
        //console.log(trailHead);
    })
    //console.log(trailHeads);




    if (part == '1') {
        let starOne = trailHeads.reduce((total, trailHead) => total += trailHead.score, 0);
        console.log(`Star One : ${starOne}`);

        return starOne;
    }


}   