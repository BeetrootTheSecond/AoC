import { Argument, Command } from 'commander';
import fs from 'fs';


import * as y2024 from './source/2024';

const program = new Command();

program.command('adventofcode')
    .description('')
    .addArgument(new Argument('<year>', 'Year').choices(['2024']))
    .addArgument(new Argument('<day>', 'Day').choices(([...new Array(25)].map((_, i) => (i + 1).toString()))))
    .addArgument(new Argument('<part>', 'Part').choices(['1', '2', 'all']))
    .option('-s, --sample', 'run using sample data', false)
    .action((year, day: string, part, option) => {

        //check is data file exists if not create file and return error
        let dataExists = fs.existsSync(`.input/${year}/${day}.txt`);
        if (!dataExists) {

            console.error(`Data file not found for day ${day} ${year}, an empty file has been created!`);
            fs.writeFileSync(`.input/${year}/${day}.txt`, '');
            return;
        }

        // load data

        let data = fs.readFileSync(`.input/${year}/${day}.txt`, 'utf-8').split('\n');
        if (option.sample) {
            let sampleExists = fs.existsSync(`.input/${year}/${day}.sample.txt`);
            if (!sampleExists) {

                console.error(`Sample file not found for day ${day} ${year}, an empty file has been created!`);
                fs.writeFileSync(`.input/${year}/${day}.sample.txt`, '');
                return;
            }
            data = fs.readFileSync(`.input/${year}/${day}.sample.txt`, 'utf-8').split('\n');
        }



        for (const [key, fn] of Object.entries(y2024)) {
            if (key.replace("day", "") == day) {
                const startTime = performance.now();
                let Result = fn(data, part) || 'Not Complete';
                const endTime = performance.now();

                let ResultMeta = { Year: parseInt(year), Day: parseInt(day), Part: parseInt(part), Result, Time: `${endTime - startTime} milliseconds`, Sample: option.sample };

                console.table([ResultMeta]);
                break;
            }
        }
    })
    .parse();