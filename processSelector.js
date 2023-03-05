function burstTimeCompare(proA, proB) {
  if (proA?.remainingBurstTime == null || proB?.remainingBurstTime == null) {
    throw new Error("Invalid argument");
  } else {
    return proA?.remainingBurstTime < proB?.remainingBurstTime ? 0 : 1;
  }
}

function priorityCompare(proA, proB) {
  if (proA?.priority == null || proB?.priority == null) {
    throw new Error("Invalid argument");
  } else {
    return proA?.priority < proB?.priority ? 0 : 1;
  }
}

function processSelect(curr_time, state, compareMethod) {
    var i = 0;
    var selected = -1;
    for (i; state[i]?.arrivalTime <= curr_time; i++) {
        if (selected == -1) {
            if (state[i].remainingBurstTime > 0) {
                selected = i;
            }
        } else {
            if (state[i].remainingBurstTime > 0 && compareMethod(state[i], state[selected]) == 0) {
                selected = i;
            }
        }   
    }

    if (selected == -1) {
        if (i == state.length) {
            return -1;
        } 
        let tmp = state[i].arrivalTime;
        let re = i;
        for (i; i < state.length; i++) {
            if (compareMethod(state[i], state[re]) == 0 && state[i].arrivalTime == tmp) re = i; 
        }
        return re;
    } else {
        return selected;
    }
}

export default {
    processSelectBurstTimeBased: (curr_time, state) => {return processSelect(curr_time, state, burstTimeCompare) },
    processSelectPriorityBased: (curr_time, state) => {return processSelect(curr_time, state, priorityCompare)}
}