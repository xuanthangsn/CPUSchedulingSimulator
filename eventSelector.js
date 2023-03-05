import processSelect from './processSelector.js';

// first come first serve
function FCFS(curr_time, state) {
    for (let i = 0; i < state.length; i++) {
        if (state[i].remainingBurstTime > 0) {
            if (state[i].arrivalTime > curr_time) {
                return {
                    curr_time: state[i].arrivalTime,
                    event: {
                        name: "",
                        start: curr_time,
                        end: state[i].arrivalTime
                    },
                    newState: [...state]
                }
            }
            else {
                var newState = [...state];
                newState[i] = {
                    ...state[i],
                    remainingBurstTime: 0,
                };
                var eventStartTime = curr_time;
            return {
               curr_time: eventStartTime + state[i].remainingBurstTime,
                event: {
                name: state[i].name,
                start: eventStartTime,
                end: eventStartTime + state[i].remainingBurstTime,
              },
              newState,
            };}
        }
    }
    return null;
}

// shortest job first
function SJF(curr_time, state) {

    var i = processSelect.processSelectBurstTimeBased(curr_time, state);
    if (i == -1) {
        return null;
    }
    if (state[i].arrivalTime > curr_time) {
        return {
            curr_time: state[i].arrivalTime,
            event: {
                name: '',
                start: curr_time, 
                end: state[i].arrivalTime
            },
            newState: [...state]
        }
    } else {
        let newState = [...state];
        newState[i] = {
            ...state[i],
            remainingBurstTime: 0
        };
        let eventStartTime = curr_time;
        return {
            curr_time: eventStartTime + state[i].remainingBurstTime,
            event: {
                name: state[i].name,
                start: eventStartTime,
                end: eventStartTime + state[i].remainingBurstTime
            },
            newState
        }
    }
        
    
}

// shortest remaining time
function SRT(curr_time, state) {
    var i = processSelect.processSelectBurstTimeBased(curr_time, state);
    if (i == -1) {
        return null;
    }
    if (state[i].arrivalTime > curr_time) {
        return {
            curr_time: state[i].arrivalTime,
            event: {
                name: '',
                start: curr_time,
                end: state[i].arrivalTime
            },
            newState: [...state]
        }
    } else {
        let eventStartTime = curr_time;
        var estimatedEndTime = eventStartTime + state[i].remainingBurstTime;
        for (let j = 0; j < state.length; j++) {
          if (
            state[j].arrivalTime > eventStartTime &&
            state[j].arrivalTime < estimatedEndTime &&
            state[j].remainingBurstTime <
              estimatedEndTime - state[j].arrivalTime
          ) {
            let newState = [...state];
            newState[i] = {
              ...state[i],
              remainingBurstTime: estimatedEndTime - state[j].arrivalTime,
            };
            return {
              curr_time: state[j].arrivalTime,
              event: {
                name: state[i].name,
                start: eventStartTime,
                end: state[j].arrivalTime,
              },
              newState,
            };
          }
        }
        let newState = [...state];
        newState[i] = {
          ...state[i],
          remainingBurstTime: 0,
        };
        return {
          curr_time: estimatedEndTime,
          event: {
            name: state[i].name,
            start: eventStartTime,
            end: estimatedEndTime,
          },
          newState,
        };
    }
    
}

// Priority Non-preemptive
function PSN(curr_time, state) {
    var i = processSelect.processSelectPriorityBased(curr_time, state);
    if (i == -1) {
        return null;
    };
    if (state[i].arrivalTime > curr_time) {
        return {
            curr_time: state[i].arrivalTime,
            event: {
                name: "",
                start: curr_time,
                end: state[i].arrivalTime,
            },
            newState: [...state],
        };
    } else {
        let newState = [...state];
        newState[i] = {
          ...state[i],
          remainingBurstTime: 0,
        };
        let eventStartTime = curr_time;
        return {
            curr_time: eventStartTime + state[i].remainingBurstTime,
            event: {
            name: state[i].name,
            start: eventStartTime,
            end: eventStartTime + state[i].remainingBurstTime,
            },
            newState,
        };
    }
    
}

//Priority preemptive
function PSP(curr_time, state) {
    var i = processSelect.processSelectPriorityBased(curr_time, state);
    if (i == -1) {
        return null
    };
    if (state[i].arrivalTime > curr_time) {
      return {
        curr_time: state[i].arrivalTime,
        event: {
          name: "",
          start: curr_time,
          end: state[i].arrivalTime,
        },
        newState: [...state],
      };
    } else {
        let eventStartTime = curr_time;
        let estimatedEndTime = eventStartTime + state[i].remainingBurstTime;
        for (let j = 0; j < state.length; j++) {
          if (
            state[j].arrivalTime > eventStartTime &&
            state[j].arrivalTime < estimatedEndTime &&
            state[j].priority < state[i].priority
            ) {
            let newState = [...state];
            newState[i] = {
              ...state[i],
              remainingBurstTime: estimatedEndTime - state[j].arrivalTime,
            };
            return {
              curr_time: state[j].arrivalTime,
              event: {
                name: state[i].name,
                start: eventStartTime,
                end: state[j].arrivalTime,
              },
              newState,
            };
          }
        }
        let newState = [...state];
        newState[i] = {
          ...state[i],
          remainingBurstTime: 0,
        };
        return {
          curr_time: estimatedEndTime,
          event: {
            name: state[i].name,
            start: eventStartTime,
            end: estimatedEndTime,
          },
          newState,
        };
    }
    
}

// Round Robin
function RR(curr_i, curr_time, state, timeQuantum) {
    var f = false;
    var i = curr_i;
    while (!f || i!=curr_i) {
        if (state[i].remainingBurstTime > 0) {
            if (state[i].arrivalTime > curr_time) {
                return {
                    curr_time: state[i].arrivalTime,
                    event: {
                        name: '',
                        start: curr_time,
                        end: state[i].arrivalTime
                    },
                    newState: [...state],
                    curr_i : i
                }
            } else {
                let eventStartTime = curr_time;
                let cpuDuration = state[i].remainingBurstTime >= timeQuantum ? timeQuantum : state[i].remainingBurstTime;
                let newState = [...state];
                newState[i] = {
                    ...state[i],
                    remainingBurstTime:
                    state[i].remainingBurstTime - cpuDuration,
                };
                return {
                    curr_time: eventStartTime + cpuDuration,
                    event: {
                       name: state[i].name,
                       start: eventStartTime,
                       end: eventStartTime + cpuDuration,
                    },
                    newState,
                    curr_i: i + 1 == state.length ? 0 : i + 1,
                };   
            }
        }
        if(!f) f = (i + 1 == state.length) ? true : false;
        i = (i + 1 == state.length) ? 0 : i + 1;
    }
    return null;
} 

export default {
    FCFS,
    SJF,
    SRT,
    PSN,
    PSP,
    RR
};