function calculateCellWidth(duration) {
  return duration >= 2 ? duration : 2;
}

function calculateBorderWidth(state) {
  return state[state.length - 1].start.toString().length - 1;
}

function granttChart(events) {
  const borderWidth = calculateBorderWidth(events);
  const heads = events.map((e, i) => {
    const cellWidth = calculateCellWidth(e.end - e.start);
    if (i === events.length - 1) {
      return (
        "+".repeat(borderWidth) +
        "-".repeat(cellWidth) +
        "+".repeat(borderWidth)
      );
    }
    return "+".repeat(borderWidth) + "-".repeat(cellWidth);
  });
  const bodys = events.map((e, i) => {
    const cellWidth = calculateCellWidth(e.end - e.start);
    const textPosition =
      (cellWidth - e.name.length) % 2 == 0
        ? (cellWidth - e.name.length) / 2
        : Math.round((cellWidth - e.name.length) / 2) - 1;
    if (i === events.length - 1) {
      return (
        "|".repeat(borderWidth) +
        " ".repeat(textPosition) +
        e.name +
        " ".repeat(cellWidth - textPosition - e.name.length) +
        "|".repeat(borderWidth)
      );
    }
    return (
      "|".repeat(borderWidth) +
      " ".repeat(textPosition) +
      e.name +
      " ".repeat(cellWidth - textPosition - e.name.length)
    );
  });
  const tails = events.map((e, i) => {
    const cellWidth = calculateCellWidth(e.end - e.start);
    if (i === events.length - 1) {
      return (
        e.start +
        " ".repeat(borderWidth + cellWidth - e.start.toString().length) +
        e.end
      );
    }
    return (
      e.start + " ".repeat(borderWidth + cellWidth - e.start.toString().length)
    );
  });
  const head = heads.join("");
  const body = bodys.join("");
  const tail = tails.join("");
  return [head, body, head ,tail].join("\n");
}



export default granttChart;