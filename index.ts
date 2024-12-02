import { Argument, Command } from 'commander';
import fs from 'fs';


import * as y2024 from './source/2024';

const program = new Command();

program.command('adventofcode')
    .description('')
    .addArgument(new Argument('<year>', 'Year').choices(['2024']))
    .addArgument(new Argument('<day>', 'Day').choices(([...new Array(25)].map((_, i) => (i + 1).toString()))))
    .addArgument(new Argument('<part>', 'Part').choices(['1','2','all']))
    .option('-s, --sample', 'run using sample data',false)
    .action((year,day:string,part,option)=>{
        
        console.log(`Year ${year} , Day ${day} , Part ${part} , Sample ${option.sample}`);
        // load data

        let data = fs.readFileSync(`.input/${year}/${day}.txt`, 'utf-8').split('\n');
        if(option.sample){
            data = fs.readFileSync(`.input/${year}/${day}.sample.txt`, 'utf-8').split('\n');
        }
        
        

        for(const [key, fn] of Object.entries(y2024)){
            if(key.replace("day","") == day){
                fn(data, part);
                break;
             }
        }
    })
    .parse();