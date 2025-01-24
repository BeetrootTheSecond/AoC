export const day3 = (data: string[], part: string) => {
  let triangle = data
    .map((rawstring) =>
      rawstring
        .trim()
        .split("  ")
        .map((s) => parseInt(s.trim()))
        .filter((digit) => !isNaN(digit))
        //.sort((a,b)=>b-a)
    )
    if(part=='1'){
    let starOne = triangle.filter(
      (possibleTrangle) =>
        possibleTrangle[0] < (possibleTrangle[1] + possibleTrangle[2])  &&
         possibleTrangle[1] < (possibleTrangle[0] + possibleTrangle[2]) &&
         possibleTrangle[2] < (possibleTrangle[1] + possibleTrangle[0])
    );

  return starOne.length;
    }

let rotatedGrid :number[][]= [[],[],[]]

for (let index = 0; index < triangle.length; index++) {
  const element = triangle[index];
  for (let j = 0; j < element.length; j++) {

    rotatedGrid[j].push(element[j]);
  }
}

//console.log(rotatedGrid);
let triangleCount = rotatedGrid.map(column =>{
  let count = 0;

for (let index = 0; index < column.length; index+=3) {
  const element = column[index];
  const element1 = column[index+1];
  const element2 = column[index+2];
  if(element < (element1 + element2)  &&
  element1 < (element + element2) &&
  element2 < (element1 + element)){
    count++;
  }
  
}

return count;

}).reduce((total,current)=> total+=current,0)


return triangleCount;
    
};
