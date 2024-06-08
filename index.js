#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds, addSeconds } from "date-fns";
// Green design for the top and bottom of the welcome title
const greenDesign = chalk.bold.green("<<< %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% >>>");
// Function to create a rainbow-like effect
function rainbowText(text) {
    const rainbowColors = [chalk.red, chalk.yellow, chalk.green, chalk.blue, chalk.magenta];
    let coloredText = "";
    for (let i = 0; i < text.length; i++) {
        coloredText += rainbowColors[i % rainbowColors.length](text[i]);
    }
    return coloredText;
}
// Create rainbow-colored welcome title
const welcomeTitle = rainbowText("          Welcome to NMJ CountDown Timer ");
console.log(greenDesign);
console.log(welcomeTitle);
console.log(greenDesign);
// Prompt the user for input
inquirer.prompt([
    {
        type: "number",
        name: "userInput",
        message: chalk.blue.bold("Please enter the amount of seconds:"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.greenBright.bold("Please enter a valid number");
            }
            else if (input > 60) {
                return chalk.yellowBright.bold("Seconds must be less than or equal to 60");
            }
            else {
                return true;
            }
        }
    }
]).then((response) => {
    // Use userInput for the countdown timer
    const { userInput } = response;
    function startTime(val) {
        const inTime = addSeconds(new Date(), val);
        const displayTime = () => {
            const currentTime = new Date();
            const timeDiff = differenceInSeconds(inTime, currentTime);
            if (timeDiff < 0) {
                clearInterval(timer);
                console.log(chalk.red.bold("Timer has expired"));
                console.log(chalk.green.bold("Thanks for using my app!"));
                process.exit();
            }
            const minutes = Math.floor(timeDiff / 60);
            const seconds = timeDiff % 60;
            const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            console.log(chalk.bgRed.bold(timeString)); // Print the current time
        };
        displayTime(); // Display time immediately
        const timer = setInterval(displayTime, 1000);
    }
    startTime(userInput);
});
