
interface Position {
    indexX: number;
    indexY: number
}
enum Direction {
    Up = 0,
    Down = 2,
    Left = 3,
    Right = 1,
}


function moveGuard(labMap: string[][], currentPosition: Position, VP: Position[], direction: Direction) {

    //next Position 
    let newPosition = {
        indexX: currentPosition.indexX, indexY: currentPosition.indexY
    };


    switch (direction) {
        case Direction.Up:
            newPosition.indexX--;
            break;

        case Direction.Right:
            newPosition.indexY++;
            break;

        case Direction.Down:
            newPosition.indexX++;
            break;
        case Direction.Left:
            newPosition.indexY--;
            break;
    }




    VP.push(currentPosition);
    //console.log(`Positions X: ${currentPosition.indexX} Y: ${currentPosition.indexY}`);
    //check if next position is outside of the lab

    if ((newPosition.indexX < 0 && direction == Direction.Up) ||
        (newPosition.indexX == labMap.length && direction == Direction.Down) ||
        (newPosition.indexY < 0 && direction == Direction.Left) ||
        (newPosition.indexY == labMap[0].length && direction == Direction.Right)) {

        //console.log("leaving lab");
    }

    //If there is something directly in front of you, turn right 90 degrees.
    else if (labMap[newPosition.indexX][newPosition.indexY] == '#') {
        //console.log('direction change');
        let newDirection: Direction = direction == 3 ? 0 : direction + 1;
        VP = moveGuard(labMap, currentPosition, VP, newDirection);
    }
    //Otherwise, take a step forward.
    else {
        VP = moveGuard(labMap, newPosition, VP, direction);
    }

    return VP;
}

export const day6 = (data: string[], part: string) => {


    let labMap = data.map(row => row.split(''));

    let visitedPositions: Array<Position> = [];

    labMap.map((x, indexX) => {

        x.map((y, indexY) => {


            if (y == '^') {
                visitedPositions.push({ indexX, indexY });
            }

        })
    })

    //console.log(`Starting Positions X: ${visitedPositions[0].indexX} Y: ${visitedPositions[0].indexY}`);

    visitedPositions = moveGuard(labMap, visitedPositions[0], visitedPositions, Direction.Up);


    let distinctPositions = visitedPositions.reduce((total, position) => {
        let posString = `${position.indexX}-${position.indexY}`

        total[posString] ? total[posString]++ : total[posString] = 1;
        return total;
    }, {} as Record<string, number>);

    if (part == "1") {
        let starOneTotal = Object.keys(distinctPositions).length;
        console.log(`Star 1 Result : ${starOneTotal} `);
        return;
    }



}