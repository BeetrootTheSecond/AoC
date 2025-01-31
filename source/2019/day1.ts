export const day1 = (data: string[], part: string) => {
    let fuel = data.map(module => Math.floor(parseInt(module)/3)-2 );

    let part1 = fuel.reduce((total, nextFuel)=> total+ nextFuel,0);
    return part1;

};
