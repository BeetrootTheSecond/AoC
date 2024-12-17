
const modStone = (stone:number)=>{
    let newStones = [];

    if(stone == 0){
        return [1];
    }
    let stoneString = stone.toString();
    if(stoneString.length  %2 == 0){
        //its Even;
        let splitStoneLeft = parseInt(stoneString.split('').slice(0, (stoneString.length/2)).join(''));
        let splitStoneRight = parseInt(stoneString.split('').slice((stoneString.length/2), stoneString.length).join(''));
        return [splitStoneLeft,splitStoneRight];

    }

    return [stone*2024];
}

export const day11 = (data: string[], part: string) => {

    let stones = data[0].split(' ').map(stone=>parseInt(stone));
    let blinkCount= 25;

    for (let blinkNumber = 0; blinkNumber < blinkCount; blinkNumber++) {
        stones = stones.map(stone=> modStone(stone)).flat();
        
    }



if(part== '1')
{
    let starOne = stones.length;
    console.log(`Star One Results : ${starOne}`);
    return starOne;
}

}