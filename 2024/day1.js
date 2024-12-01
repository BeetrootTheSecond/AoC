"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const runSample = false;
//import the data into 2 arrays 
console.log(__dirname);
const sampleData = fs_1.default.readFileSync(path_1.default.join(__dirname, 'data/day1/sample.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, 'data/day1/data.txt'), 'utf-8');
let runningData = data;
if (runSample) {
    runningData = sampleData;
}
let lines = runningData.split('\n');
let splitLine = lines.map(line => line.split('   '));
let leftList = [];
let rightList = [];
splitLine.forEach(row => {
    leftList.push(parseInt(row[0]));
    rightList.push(parseInt(row[1]));
});
console.log(leftList.length);
//sort the array smallest to largest 
leftList.sort();
rightList.sort();
// compare each position in the array to get distance 
let listDiffences = [];
leftList.forEach((location, index) => {
    let locationDiffence = location - rightList[index];
    listDiffences.push(Math.abs(locationDiffence));
});
// get the total disance
let totalDistance = listDiffences.reduce((total, distance) => { return total + distance; }, 0);
console.log(`Star One : ${totalDistance} `);
// Star Two 
// create similarity score 
let similarityScores = [];
leftList.forEach(location => {
    let appearsInRightList = rightList.filter(value => value == location);
    similarityScores.push(location * appearsInRightList.length);
});
let totalSimilarityScore = similarityScores.reduce((total, score) => { return total + score; }, 0);
console.log(`Star Two : ${totalSimilarityScore} `);
//# sourceMappingURL=day1.js.map