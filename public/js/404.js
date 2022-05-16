// ----------------------------------------------------
// Define top level variables
// ----------------------------------------------------

let squareSize = 20;
let stepsPerSecond = 10;
let intervalID;

// ----------------------------------------------------
// Define functions
// ----------------------------------------------------

// gets rows and cols based on window and squareSize
function getDimensions() {
  let gameAreaWidth = squareSize * Math.floor(window.innerWidth / squareSize);
  let gameAreaHeight =
    squareSize * Math.floor((window.innerHeight - 53) / squareSize);

  gameAreaHeight = Math.max(gameAreaHeight, 300);
  let rows = gameAreaHeight / squareSize;
  let cols = gameAreaWidth / squareSize;

  return [rows, cols];
}

// plot the grid state
function plotGridData(gridData, gameArea) {
  gameArea.innerHTML = "";

  // loop over rows and make the HTML element
  Object.keys(gridData).forEach((row) => {
    // create an object for the row
    const gameRow = document.createElement("div");

    // give the row object styles
    gameRow.classList.add("game-row");
    gameRow.style.minHeight = `${squareSize}px`;
    gameRow.style.maxHeight = `${squareSize}px`;

    // loop over columns, adding cells
    gridData[row].forEach((_, col) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.minWidth = `${squareSize}px`;
      cell.style.maxWidth = `${squareSize}px`;

      // color is based on position in gridData
      cell.style.backgroundColor = gridData[row][col]
        ? "rgba(101, 166, 180, 0.2)"
        : "transparent";

      // update cell color and cursor when mouse is pressed down
      cell.addEventListener("mousedown", () => {
        cell.style.cursor = "crosshair";
        cell.style.backgroundColor =
          cell.style.backgroundColor === "rgba(101, 166, 180, 0.2)"
            ? ""
            : "rgba(101, 166, 180, 0.2)";
        gridData[row][col] = !gridData[row][col];
      });

      // reset the cursor when user stops pressing the mouse
      cell.addEventListener("mouseup", () => {
        cell.style.cursor = "pointer";
      });

      // update cell color when a pressed down cursor drags over cell
      cell.addEventListener("mouseenter", () => {
        if (document.body.matches(":active")) {
          // update gridData information
          gridData[row][col] = !gridData[row][col];

          // styles
          cell.style.backgroundColor =
            cell.style.backgroundColor === "rgba(101, 166, 180, 0.2)"
              ? ""
              : "rgba(101, 166, 180, 0.2)";
          cell.style.cursor = "crosshair";
        }
      });

      // reset the cursor type for the next time the cursor enters this cell
      cell.addEventListener("mouseout", () => {
        cell.style.cursor = "pointer";
      });
      gameRow.appendChild(cell);
    });
    gameArea.appendChild(gameRow);
  });
}

// set up start/stop button
function stopSimulation() {
  clearInterval(intervalID);
}

function startSimulation(stepButton) {
  intervalID = setInterval(() => {
    stepButton.click();
  }, 1000 / stepsPerSecond);
}

// ----------------------------------------------------
// DOMContentLoaded Listener
// ----------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
  // get revelent HTML objects as javascript objects
  const gameArea = document.getElementById("game-area");
  const startButton = document.getElementById("start-button");
  const stepButton = document.getElementById("step-button");
  const resetButton = document.getElementById("reset-button");

  // define initial data object
  let gridData = {};

  // get the number of rows and columns
  const [rows, cols] = getDimensions();

  // get initial gridData object
  Array.from(Array(rows).keys()).forEach((row) => {
    gridData[row] = [];
    // add individual cells
    Array.from(Array(cols).keys()).forEach((_) => {
      gridData[row] = [...gridData[row], Math.random() > 0.9];
    });
  });

  plotGridData(gridData, gameArea);

  // redraw grid when
  window.addEventListener("resize", () => {
    // drawNewGrid(squareSize, gameArea)
    // function to get number of rows and columns
    const [rows, cols] = getDimensions();

    // get blank gridData object (need to replace later)
    Array.from(Array(rows).keys()).forEach((row) => {
      gridData[row] = [];
      // add individual cells
      Array.from(Array(cols).keys()).forEach((_) => {
        //
        gridData[row] = [...gridData[row], Math.random() > 0.9];
        // gridData[row] = [...gridData[row], false]
      });
    });

    // function to display data
    plotGridData(gridData, gameArea);
  });

  // button handlers
  startButton.addEventListener("click", () => {
    if (startButton.innerText === "Start") {
      startButton.innerText = "Stop";
      startButton.style.backgroundColor = "#de2b2b";
      startSimulation(stepButton);
    } else {
      startButton.innerText = "Start";
      startButton.style.backgroundColor = "#5c8b4c";
      stopSimulation();
    }
  });
  startButton.click();

  stepButton.addEventListener("click", () => {
    let newGridData = {};

    Object.keys(gridData).forEach((row) => {
      newGridData[row] = [];
      gridData[row].forEach((colValue, col) => {
        // current cell value
        // let cellValue = gridData[row][col];

        // get index of above and below rows, not the
        const rowAbove =
          row - 1 === -1 ? Object.keys(gridData).length - 1 : row - 1;
        const rowBelow =
          parseInt(row) === Object.keys(gridData).length - 1
            ? 0
            : parseInt(row) + 1;

        const colLeft = col - 1 === -1 ? gridData[row].length - 1 : col - 1;
        const colRight =
          col === gridData[row].length - 1 ? 0 : parseInt(col) + 1;

        let neighbors = [
          gridData[rowAbove][colLeft],
          gridData[rowAbove][col],
          gridData[rowAbove][colRight],

          gridData[row][colRight],
          gridData[row][colLeft],

          gridData[rowBelow][colLeft],
          gridData[rowBelow][col],
          gridData[rowBelow][colRight],
        ];

        const numTrue = neighbors.filter((val) => {
          return val;
        }).length;

        // #1: if live:  stay alive if 2 or 3 live neighbors
        // #2: else: come alive if exactly 3 live neighbors
        const newColValue = colValue
          ? numTrue === 2 || numTrue === 3
          : numTrue === 3;

        // add value to newGridData
        newGridData[row] = [...newGridData[row], newColValue];
      });
    });
    gridData = newGridData;
    plotGridData(gridData, gameArea);
  });

  resetButton.addEventListener("click", () => {
    // stop simulation
    startButton.innerText = "Start";
    startButton.style.backgroundColor = "#5c8b4c";
    stopSimulation();

    gridData = {};

    // get the number of rows and columns
    const [rows, cols] = getDimensions();

    // get initial gridData object
    Array.from(Array(rows).keys()).forEach((row) => {
      gridData[row] = [];
      // add individual cells
      Array.from(Array(cols).keys()).forEach((_) => {
        gridData[row] = [...gridData[row], Math.random() > 0.9];
      });
    });

    plotGridData(gridData, gameArea);
  });
});
