import data from '../2016/day1Data.json';






function starOneSolution() {
    console.log(data);
    let testData = ['R2', 'L3'];
    let testData2 = ['R2', 'R2', 'R2'];
    let testData3 = ['R5', 'L5', 'R5', 'R3'];

    let facingdirection = 0; //0-N, 1-E, 2-S, 3-W
    let blockDirectionCount = {
        north: 0,
        east: 0
    };
    //count number of blocks away from starting position 
    data.forEach(currentMove => {
        let Rotation = currentMove.slice(0, 1);
        let BlockCount = currentMove.slice(1);

        //handle rotation
        if (Rotation == 'R') {
            facingdirection++;
            if (facingdirection == 4) {
                facingdirection = 0
            }
        } else if (Rotation == 'L') {
            facingdirection--;
            if (facingdirection == -1) {
                facingdirection = 3;
            }
        }
        else {
            throw (new Error(`Unknown rotation current Move :${currentMove}:`));
        }

        switch (facingdirection) {

            case 0: {//north
                blockDirectionCount.north += parseInt(BlockCount);
                break;
            }
            case 1: {//east
                blockDirectionCount.east += parseInt(BlockCount);
                break;
            }
            case 2: {//south
                blockDirectionCount.north -= parseInt(BlockCount);
                break;
            } case 3: {//west
                blockDirectionCount.east -= parseInt(BlockCount);
                break;
            }
        }


    })


    //calculate total blocks away
    let totalBlocksAway = Math.abs(blockDirectionCount.north) + Math.abs(blockDirectionCount.east);

    console.log(`Star One : ${totalBlocksAway}`);


}

function starTwoSolution() {
    let testData3 = ['R5', 'L5', 'R5', 'R3'];

    let facingdirection = 0; //0-N, 1-E, 2-S, 3-W
    let blockDirectionCount = {
        north: 0,
        east: 0
    };

    let blockDirectionCountFirstPosition = {
        north: 0,
        east: 0
    };

    let foundFlag = false;
    let visitedPosition: Array<string> = [];
    //count number of blocks away from starting position 
    data.forEach(currentMove => {
        let Rotation = currentMove.slice(0, 1);
        let BlockCount = currentMove.slice(1);

        //handle rotation
        if (Rotation == 'R') {
            facingdirection++;
            if (facingdirection == 4) {
                facingdirection = 0
            }
        } else if (Rotation == 'L') {
            facingdirection--;
            if (facingdirection == -1) {
                facingdirection = 3;
            }
        }
        else {
            throw (new Error(`Unknown rotation current Move :${currentMove}:`));
        }

        switch (facingdirection) {

            case 0: {//north
                blockDirectionCount.north += parseInt(BlockCount);
                break;
            }
            case 1: {//east
                blockDirectionCount.east += parseInt(BlockCount);
                break;
            }
            case 2: {//south
                blockDirectionCount.north -= parseInt(BlockCount);
                break;
            } case 3: {//west
                blockDirectionCount.east -= parseInt(BlockCount);
                break;
            }
        }

        let postionID = `n${blockDirectionCount.north}e${blockDirectionCount.east}`;

        if (!foundFlag) {
            if (visitedPosition.includes(postionID)) {
                blockDirectionCountFirstPosition = blockDirectionCount;
                foundFlag = true;
            }
            visitedPosition.push(postionID);
        }

    })


    //calculate total blocks away
    let totalBlocksAway = Math.abs(blockDirectionCountFirstPosition.north) + Math.abs(blockDirectionCountFirstPosition.east);


    console.log(`Star Two : ${totalBlocksAway}`);


}






starOneSolution();
starTwoSolution();