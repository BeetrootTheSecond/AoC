import path, { dirname } from 'path';
import fs from 'fs';

const runSample = false ;

//import the data into 2 arrays 
console.log(__dirname)
const sampleData = fs.readFileSync(path.join(__dirname, 'data/day1/sample.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, 'data/day1/data.txt'), 'utf-8');

let runningData= data;
if(runSample){
    runningData = sampleData;
}

let lines = runningData.split('\n')

let splitLine =lines.map(line => line.split('   '))

let leftList:number[]=[]; 
let rightList:number[]=[];

splitLine.forEach(row=> 
{
    leftList.push(parseInt(row[0]));
    rightList.push(parseInt(row[1]));
}
)

console.log(leftList.length);

//sort the array smallest to largest 
leftList.sort();
rightList.sort();


// compare each position in the array to get distance 

let listDiffences: number[] = [];

leftList.forEach((location,index) => {

    let locationDiffence = location - rightList[index];

    listDiffences.push(Math.abs(locationDiffence));
})


// get the total disance

let totalDistance = listDiffences.reduce((total,distance) => { return total+ distance},0); 

console.log(`Star One : ${totalDistance} `);