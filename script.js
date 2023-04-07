// HTML ELEMENTS
// grid
const grid = document.getElementById("grid-container");
// buttons
let chooseColorBtn = document.getElementById("colorBtn");
let gridBtn = document.getElementById("gridBtn");
let lightBtn = document.getElementById("lightBtn");
let closeColorPick = document.getElementById("closeColorpick");
let colorDrawBtn = document.getElementById("colorDraw");
let randomBtn = document.getElementById("randomDraw");
// popup elements
let gridForm = document.getElementById("gridForm");
let popupColor = document.getElementById("popupColor");
// inputs
let colorpicker = document.getElementById("colorpicker");
let gridCells = document.getElementsByClassName("square");

// Stored variables
let chosenColor = null;
let penMode = null;

// OPEN & CLOSE color popup
chooseColorBtn.addEventListener("click", (e) => {
  popupColor.style.display = "flex";
});

closeColorPick.addEventListener("click", (e) => {
  popupColor.style.display = "none";
});

// SAVE color picked
colorpicker.addEventListener("change", (e) => {
  chosenColor = e.target.value;
});

// OPEN grid popup
gridBtn.addEventListener("click", () => {
  gridForm.style.display = "block";
});

// CLOSE grid popup and create new grid
gridForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let size = document.getElementById("square").value;
  if (parseInt(size) > 100) {
    warning.style.display = "block";
  } else {
    gridForm.style.display = "none";
    grid.innerHTML = "";
    createGrid(size);
  }
});

// DRAW WITH RANDOM COLOR
// Random Int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// Random rgb color
function getRandomColor() {
  color = `rgb(${getRandomInt(257)}, ${getRandomInt(257)}, ${getRandomInt(
    257
  )}`;
  return color;
}

function randomColorSquare(i) {
  gridCells[i].addEventListener("mouseenter", function (event) {
    gridCells[i].style.backgroundColor = getRandomColor();
  });
}

function randomHandler(i) {
  for (let i = 0; i < gridCells.length; i++) {
    randomColorSquare(i);
  }
}

// CHANGE PENMODE WITH BUTTONS
colorDrawBtn.addEventListener("click", () => {
  penMode = "usercolor";
});

randomBtn.addEventListener("click", () => {
  penMode = "random";
});

lightBtn.addEventListener("click", (e) => {
  penMode = "light";
});

darkBtn.addEventListener("click", (e) => {
  penMode = "dark";
});

// PENMODE
function changeColor(event) {
  if (penMode === "random") {
    this.style.backgroundColor = getRandomColor();
  } else if (penMode === "usercolor") {
    this.style.backgroundColor = chosenColor;
  } else if (penMode === "light") {
    var cellRgb = this.style.backgroundColor;
    console.log(cellRgb);
    var rgb = cellRgb.match(/\d+/g);

    newR = parseInt(rgb[0]) + parseInt(rgb[0]) * 0.1;
    newG = parseInt(rgb[1]) + parseInt(rgb[1]) * 0.1;
    newB = parseInt(rgb[2]) + parseInt(rgb[2]) * 0.1;

    cellRgb = `rgb(${newR}, ${newG}, ${newB})`;
    this.style.backgroundColor = cellRgb;
  } else if (penMode === "dark") {
    var cellRgb = this.style.backgroundColor;
    console.log(cellRgb);
    var rgb = cellRgb.match(/\d+/g);

    newR = parseInt(rgb[0]) - parseInt(rgb[0]) * 0.1;
    newG = parseInt(rgb[1]) - parseInt(rgb[1]) * 0.1;
    newB = parseInt(rgb[2]) - parseInt(rgb[2]) * 0.1;

    cellRgb = `rgb(${newR}, ${newG}, ${newB})`;
    this.style.backgroundColor = cellRgb;
  }
}

// CREATE GRID
function createGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  // Create cells
  for (let i = 0; i < size * size; i++) {
    let cells = document.createElement("div");
    cells.classList.add("square");
    cells.addEventListener("mouseenter", changeColor);
    grid.appendChild(cells);
  }
}

createGrid(4);
