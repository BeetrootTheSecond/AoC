"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const day1Data_json_1 = __importDefault(require("../2016/day1Data.json"));
function starOneSolution() {
    console.log(day1Data_json_1.default);
    let testData = ['R2', 'L3'];
    let testData2 = ['R2', 'R2', 'R2'];
    let testData3 = ['R5', 'L5', 'R5', 'R3'];
    let facingdirection = 0; //0-N, 1-E, 2-S, 3-W
    let blockDirectionCount = {
        north: 0,
        east: 0
    };
    //count number of blocks away from starting position 
    day1Data_json_1.default.forEach(currentMove => {
        let rotation = currentMove.slice(0, 1);
        let numberOfBlocks = currentMove.slice(1);
        //handle rotation
        if (rotation == 'R') {
            facingdirection++;
            if (facingdirection == 4) {
                facingdirection = 0;
            }
        }
        else if (rotation == 'L') {
            facingdirection--;
            if (facingdirection == -1) {
                facingdirection = 3;
            }
        }
        else {
            throw (new Error(`Unknown rotation current Move :${currentMove}:`));
        }
        switch (facingdirection) {
            case 0: { //north
                blockDirectionCount.north += parseInt(numberOfBlocks);
                break;
            }
            case 1: { //east
                blockDirectionCount.east += parseInt(numberOfBlocks);
                break;
            }
            case 2: { //south
                blockDirectionCount.north -= parseInt(numberOfBlocks);
                break;
            }
            case 3: { //west
                blockDirectionCount.east -= parseInt(numberOfBlocks);
                break;
            }
        }
    });
    //calculate total blocks away
    let totalBlocksAway = Math.abs(blockDirectionCount.north) + Math.abs(blockDirectionCount.east);
    console.log(`Star One : ${totalBlocksAway}`);
}
starOneSolution();
