#!/usr/bin/env node

import { algorithm, processInput, askInput } from "./inputProcessing.js";
import CPUScheduler from "./CPUScheduler.js";
import algorithms from "./constant/algorithms.js";
import sample from "./constant/sample.js";

await askInput();
var output;
switch (algorithm) {
  case algorithms.firstComeFirstServe:
    output = CPUScheduler.firstComeFirstServe(processInput);
  case algorithms.shortestJobFirst:
    output = CPUScheduler.shortestJobFirst(processInput);
  case algorithms.shortestRemainingTime:
    output = CPUScheduler.shortestRemainingTime(processInput);
  case algorithms.nonPreemptivePriority:
    output = CPUScheduler.priorityNonPreemptive(processInput);
  case algorithms.preemptivePriority:
    output = CPUScheduler.priorityPreemptive(processInput);
  case algorithms.roundRobin:
    output = CPUScheduler.roundRobin(processInput);
}
console.log(output);

// console.log(CPUScheduler.firstComeFirstServe(sample.FCFSExample));