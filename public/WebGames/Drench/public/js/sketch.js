
let grid;
const setClicks = 30;
const gridSize = 14;
const w = 20;
const buttonSize = 40;
const red = [255, 0, 0, 244, 175, 133];
const green = [0, 0, 255, 208, 122, 193];
const blue = [0, 255, 0, 63, 197, 233];
const Button1 = new Clickable();
const Button2 = new Clickable();
const Button3 = new Clickable();
const Button4 = new Clickable();
const Button5 = new Clickable();
const Button6 = new Clickable();
const resetBtn = new Clickable();
const btnList = [Button1, Button2, Button3, Button4, Button5, Button6];
let clicksLeft = setClicks;
let score = 0;

function make2DArray(gridSize) {
  let arr = new Array(gridSize);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(gridSize);
  }
  return arr;
}

function showScore() {
	const scoreString = 'Your score: ' + score;
	fill('#1199FF');
  textStyle(BOLD);
  textSize(15);
  textAlign(CENTER);
  text(scoreString, 180, 395, 200, 15);
  textSize(0);
}

function showClickCount() {
  const clicksString = 'Clicks Remain: ' + clicksLeft;
  if (clicksLeft >= setClicks / 2) {
    fill('#009900');
  } else if ((clicksLeft >= setClicks / 4) && (clicksLeft < setClicks / 2)) {
    fill('#FFC300');
  } else fill('#FF0000');
  textStyle(BOLD);
  textSize(15);
  textAlign(CENTER);
  text(clicksString, 180, 365, 200, 15);
  textSize(0);
}

function btnSetup(currentBtn, index) {
  let btnColor = color(red[index], green[index], blue[index]);
  if (index <= 2) {
    currentBtn.x = 15 + (index * 50);
    currentBtn.y = 310;
  } else {
    currentBtn.x = 15 + ((index - 3) * 50);
    currentBtn.y = 360;
  }
  currentBtn.height = buttonSize;
  currentBtn.width = buttonSize;
  currentBtn.color = btnColor;
  currentBtn.cornerRadius = 10;
  currentBtn.strokeWeight = 2;
  currentBtn.stroke = '#000000';
  currentBtn.textColor = btnColor;
}

function setChangeAble() {
  // set which cells are changeable
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j].changeAble) {
        if (i === 0 && j >= 0 && j <= gridSize-1) {
          if (j != gridSize-1 && grid[i][j + 1].colorCode === grid[0][0].colorCode) grid[i][j + 1].changeAble = true;
          if (grid[i + 1][j].colorCode === grid[0][0].colorCode) grid[i + 1][j].changeAble = true;
          if (j > 0  && (grid[i][j - 1].colorCode === grid[0][0].colorCode)) grid[i][j - 1].changeAble = true;
        }
        if (i > 0 && i <= gridSize-1 && j >= 0 && j <= gridSize-1) {
          if (j != gridSize-1 && grid[i][j + 1].colorCode === grid[0][0].colorCode) grid[i][j + 1].changeAble = true;
          if (i != gridSize-1 && grid[i + 1][j].colorCode === grid[0][0].colorCode) grid[i + 1][j].changeAble = true;
          if (j > 0  && (grid[i][j - 1].colorCode === grid[0][0].colorCode)) grid[i][j - 1].changeAble = true;
          if (grid[i - 1][j].colorCode === grid[0][0].colorCode) grid[i - 1][j].changeAble = true;
        }
        if (i === gridSize-1 && j >= 0 && j < gridSize-1) {
          if (j != gridSize-1 && grid[i][j + 1].colorCode === grid[0][0].colorCode) grid[i][j + 1].changeAble = true;
          if (grid[i - 1][j].colorCode === grid[0][0].colorCode) grid[i - 1][j].changeAble = true;
          if (j > 0 && (grid[i][j - 1].colorCode === grid[0][0].colorCode)) grid[i][j - 1].changeAble = true;
        }
      }
    }
  }
}

function drawUI() {
  //draw grid once
  background(255);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid[i][j].show();
    }
  }
  showScore();
  showClickCount();
}

function setup() {
  createCanvas(380, 420);
  grid = make2DArray(gridSize);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = new Cell(i, j, w);
        }
  }

  //set first cell changeAble
  grid[0][0].changeAble = true;
  setChangeAble();
  drawUI();

  // button setup
  for (ind = 0; ind <= 5; ind++){
    btnSetup(btnList[ind], ind);
  }

  //reset btn
  resetBtn.x = 180;
  resetBtn.y = 300;
  resetBtn.color = '#C0C0C0';
  resetBtn.cornerRadius = 10;
  resetBtn.strokeWeight = 2;
  resetBtn.stroke = '#808080';
  resetBtn.textColor = '#808080';
  resetBtn.text = 'RESET';

}

function draw() {
  // draw button panel with buttons
  fill('#C0C0C0');
  stroke('#808080');
  rect(5, 300, 160, 110);
  for (btnInd = 0; btnInd <= 5; btnInd++) {
    btnList[btnInd].draw();
  }
  resetBtn.draw();
}

// *******************************
// higlight button on hover
// *******************************

// button1
Button1.onOutside = () => {
  Button1.stroke = '#000000';
};
Button1.onHover = () => {
  Button1.stroke = '#FFFFFF';
};

// button2
Button2.onOutside = () => {
  Button2.stroke = '#000000';
};
Button2.onHover = () => {
  Button2.stroke = '#FFFFFF';
};

// button3
Button3.onOutside = () => {
  Button3.stroke = '#000000';
};
Button3.onHover = () => {
  Button3.stroke = '#FFFFFF';
};

// button4
Button4.onOutside = () => {
  Button4.stroke = '#000000';
};
Button4.onHover = () => {
  Button4.stroke = '#FFFFFF';
};

// button5
Button5.onOutside = () => {
  Button5.stroke = '#000000';
};
Button5.onHover = () => {
  Button5.stroke = '#FFFFFF';
};

// button6
Button6.onOutside = () => {
  Button6.stroke = '#000000';
};
Button6.onHover = () => {
  Button6.stroke = '#FFFFFF';
};

// reset button
resetBtn.onOutside = () => {
  resetBtn.stroke = '#808080';
};
resetBtn.onHover = () => {
  resetBtn.stroke = '#FFFFFF';
};

function checkWin() {
  let breakCheck = false;
  let conditionCheck = false;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if ((i === 0 && j != 0) || i != 0) {
        if (grid[i][j].colorCode != grid[0][0].colorCode) {
          conditionCheck = false;
          breakCheck = true;
          break;
        } else conditionCheck = true;
      }
    }
    if (breakCheck) break;
  }
  return conditionCheck;
}

function colorChange(toColor) {
  // check if same color
  if (toColor != grid[0][0].colorCode) { 
    // change colours
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j].changeAble) {
          grid[i][j].c = color(red[toColor], green[toColor], blue[toColor]);
          grid[i][j].colorCode = toColor;
        }
      }
    }
    for (recurse = 0; recurse < gridSize; recurse++) {
      setChangeAble();
    }
    drawUI();

    // check win conditions and click remaining
    if (checkWin()) {
      score += clicksLeft * 10;
      alert("Great, You Won! New round?");
      newGame();
    }
    clickAmount();

    // refresh UI
    drawUI();
  }
}

function clickAmount() {
    clicksLeft -= 1;
    console.log(clicksLeft);

    if(clicksLeft === 0) {
      alert('Game Over!');
      score = 0;
      newGame();
    }
}

function newGame() {
  if (checkWin()) {
    clicksLeft = setClicks + 1;
  } else clicksLeft = setClicks;
  setup();
}

// ***************************************
// button click methods to folow
// ***************************************

// button1
Button1.onPress = function () {
  console.log("button 1 pressed");
};
Button1.onRelease = function () {
  colorChange(0);
};

// button2
Button2.onPress = function () {
  console.log("button 2 pressed");
};
Button2.onRelease = function () {
  colorChange(1);
};

// button3
Button3.onPress = function () {
  console.log("button 3 pressed");
};
Button3.onRelease = function () {
  colorChange(2);
};

// button4
Button4.onPress = function () {
  console.log("button 4 pressed");
};
Button4.onRelease = function () {
  colorChange(3);
};

// button5
Button5.onPress = function () {
  console.log("button 5 pressed");
};
Button5.onRelease = function () {
  colorChange(4);
};

// button6
Button6.onPress = function () {
  console.log("button 6 pressed");
};
Button6.onRelease = function () {
  colorChange(5);
};

// reset button
resetBtn.onPress = function () {
  console.log("RESET!");
};
resetBtn.onRelease = function () {
  score = 0;
  newGame();
};
