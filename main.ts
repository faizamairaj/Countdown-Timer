#! /usr/bin/env node
import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns";

import chalk from "chalk";
console.log(chalk.bold.italic.greenBright("<<<<<<<<<<<<<<<<<<<<<<<< Countdown Timer >>>>>>>>>>>>>>>>>>>>>>>>>>"));

const respones = await inquirer.prompt ([
    {
        type: "number",
        name: "userInput",
        message: "Please inter the amount of seconds",
        validate: (input) => {
            if (isNaN(input)) {
              return (chalk.bold.italic.bgMagenta("Please enter valid number"))
            } else if (input > 60) {
                return (chalk.bold.italic.bgGreen("seconds must be in 60"))
            } else {
                  return true;
            }
        }
    }
]);

let input = respones.userInput

function startTime(val:number){
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initialTime);
    setInterval((()=>{
        const currentTime = new Date()
        const timeDifference = differenceInSeconds(intervalTime, currentTime);

         if(timeDifference <= 0)  {
            console.log(chalk.bold.italic.bgRed("Timer has expired"));
            process.exit()
         }
         const minut = Math.floor((timeDifference%(3600*24))/3600);
         const second = Math.floor(timeDifference%60);
         console.log(chalk.bold.italic.yellowBright(`${minut.toString().padStart(2, "0")}:${second.toString().padStart(2, "0") }`));
    }),1000)
}
startTime(input)
