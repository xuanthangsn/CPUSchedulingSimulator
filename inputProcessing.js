import inquirer from "inquirer";
import algorithms from "./constant/algorithms.js";
var algorithm;
var processNum;
var processInput = new Array();
async function askAlgorithm() {
  const answer = await inquirer.prompt({
    name: "algorithm",
    type: "list",
    message: "Choose a CPU scheduling algorithm in the following list",
    choices: [
        algorithms.firstComeFirstServe,
        algorithms.shortestJobFirst,
        algorithms.shortestRemainingTime,
        algorithms.nonPreemptivePriority,
        algorithms.preemptivePriority,
        algorithms.roundRobin
    ],
    default() {
      return "First-come-first-serve";
    },
  });
  algorithm = answer.algorithm;
}

async function askProcessNum() {
  var answer;
  while (answer?.processNum == null || answer?.processNum <= 0) {
    let askForFirstTime = answer == null ? true : false;
    answer = await inquirer.prompt({
      name: "processNum",
      type: "input",
      message: askForFirstTime
        ? "Enter number of process"
        : "Invalid!!! Please enter again!!",
    });
  }
  processNum = answer.processNum;
}

async function askProcessInput(processNum) {
  for (let i = 0; i < processNum; i++) {
    let answer = await inquirer.prompt({
      name: "num",
      type: "input",
      message: "P" + (i + 1),
      filter: (input) => {
        return filterInput(input);
      },
      validate: (input) => {
        return validateProcessInput(input);
      },
    });
    let process = {
      name: "P" + (i + 1),
      arrivalTime: answer.num[0],
      burstTime: answer.num[1],
      remainingBurstTime: answer.num[1],
      priority: answer.num[2],
    };
    processInput.push(process);
  }
}

function filterInput(str) {
  return str.split(/\s+/).slice(0, 4).map(e => Number(e));
}
function validateProcessInput(numbers) {
  if (
    numbers.length < 3 ||
    isNaN(numbers[0]) ||
    isNaN(numbers[1]) ||
    isNaN(numbers[2])
  )
    return "Invalid input";
  if (numbers[0] < 0 || numbers[1] <= 0 || numbers[2] <= 0)
    return "Invalid input";
  return true;
}

async function askInput() {
  await askAlgorithm();
  await askProcessNum();
  await askProcessInput(processNum);
}
// await askInput();
// console.log(processInput);
export { askInput, algorithm, processInput };
