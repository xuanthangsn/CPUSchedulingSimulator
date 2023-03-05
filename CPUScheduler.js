import eventSelector from './eventSelector.js';

function nonTimeQuantum(state, processSelect) {
    var result = new Array();
    var curr_time = 0;
    var state = [...state];
    state.sort((a, b) => a.arrivalTime > b.arrivalTime ? 1 : -1);
    var event = processSelect(curr_time, state);
    while(event) {
        result.push(event.event);
        curr_time = event.curr_time;
        state = event.newState;
        event = processSelect(curr_time, state);
    }
    return result;
}

function roundRobin(state, timeQuantum) {
    var result = new Array();
    var curr_i = 0;
    var curr_time = 0;
    var state = [...state];
    state.sort((a, b) => a.arrivalTime > b.arrivalTime ? 1 : -1);
    var event = eventSelector.RR(curr_i, curr_time, state, timeQuantum);
    while (event) {
        //console.log(event);
        result.push(event.event);
        //console.log(result);
        curr_i = event.curr_i;
        curr_time = event.curr_time;
        state = event.newState;
        event = eventSelector.RR(curr_i, curr_time, state, timeQuantum);
    };
    return result;
}


export default {
    firstComeFirstServe : (state) => {return nonTimeQuantum(state, eventSelector.FCFS)},
    shortestJobFirst: (state) => {return nonTimeQuantum(state, eventSelector.SJF);},
    shortestRemainingTime: (state) => {return nonTimeQuantum(state, eventSelector.SRT);},
    priorityNonPreemptive: (state) => {return nonTimeQuantum(state, eventSelector.PSN);},
    priorityPreemptive: (state) => {return nonTimeQuantum(state, eventSelector.PSP);},
    roundRobin,
}