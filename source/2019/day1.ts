export const day1 = (data: string[], part: string) => {
    let fuel = data.map(module => Math.floor(parseInt(module)/3)-2 );

    if(part == '1'){
    let part1 = fuel.reduce((total, nextFuel)=> total+ nextFuel,0);
    return part1;
    }

    let part2 = fuel.reduce((total, nextFuel)=> total + (nextFuel + calulateFuel(nextFuel)),0);
    return part2;

};

function calulateFuel(mass:number)
{   
    let fuel = Math.floor(mass/3)-2;
    if(fuel >0){
        fuel += calulateFuel(fuel);
    }
    else if ( fuel < 0 ){
        fuel =0;
    }
    return fuel;
}
