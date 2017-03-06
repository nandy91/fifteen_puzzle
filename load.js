//clear timer and start again
function restartTimer(){
  clearInterval(timer);
  seconds=0;
  document.getElementById("soFar").innerHTML = seconds;
  startTimer();
}
// called when the page loads to begin the timer
function startTimer() {
  timer = window.setInterval("updateTime()", 1000);
  } // end function startTimer

// called every 1000 ms to update the timer
function updateTime() {
    ++seconds;
    document.getElementById("soFar").innerHTML = seconds;
  } // end function updateTime

//start timer first time and initialize the game
function start() {
  seconds = 0;
 startTimer();
 count=0;
  restart();
}


//create a simple game
function simple_game() {
 clear_moves();
 restartTimer();
  for (i = 0; i < oCells.length; i++) {
    oCells[i].innerHTML = '';
  }
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  for (i = 0; i < numbers.length; i++) {
    oCells[i].innerHTML = numbers[i];
    console.log(numbers[i]);
  }
  oCells[11].innerHTML = '';
  oCells[15].innerHTML = 12;
  reDrawBoard(11);
}
//create new game
function restart() {
  clear_moves();
  restartTimer();
  for (i = 0; i < oCells.length; i++) {
    oCells[i].innerHTML = '';//clear cells
  }
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  numbers.shuffle();
  for (i = 0; i < numbers.length; i++) {
    oCells[i].innerHTML = numbers[i];//write to cells
  }
 
  reDrawBoard(numbers.length);
}
//count the moves in the game
function count_moves(){
  count++;
  document.getElementById("moves").innerHTML = count; 
}
//clear the moves to 0
function clear_moves()
{
  count=0;
  document.getElementById("moves").innerHTML = count;
}

//change the table cells after every onclick of cell
function reDrawBoard(num) {
 
  for (i = 0; i < oCells.length; i++) {
    oCells[i].onclick = oCells[i].className = '';
    oCells[i].title = 'Invalid Move';
  }
  touchingCells = new Array();
  //console.log("the initial number" + num);
  oBlank = oCells[num];
  oCells[num].className='blankCell';//get blank cell
  console.log("blank in redraw" + oBlank);
  oBlank.rowNum = new Number(getRowIndex(oBlank));
  oBlank.cellNum = new Number(getCellIndex(oBlank));
  oBlank.cellIndx = (oBlank.rowNum * 4) + oBlank.cellNum;
  touchingCells = getTouchingCells(oBlank); //get the cells touching current blank square
  assignOnclicks(); //to the cells currently touching the blank square
}

function getTouchingCells(obj) {
  var newTouchingCells = new Array();
  if (obj.cellNum - 1 >= 0) { //get left touching cell
    newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum - 1]);
  }
  if (obj.cellNum + 1 <= 3) { //get right touching cell
    newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum + 1]);
  }
  if (obj.rowNum - 1 >= 0) { //get above touching cell
    newTouchingCells.push(oTable.rows[obj.rowNum - 1].cells[obj.cellNum]);
  }
  if (obj.rowNum + 1 <= 3) { //get below touching cell
    newTouchingCells.push(oTable.rows[obj.rowNum + 1].cells[obj.cellNum]);
  }
  for (i = 0; i < newTouchingCells.length; i++) {
    newTouchingCells[i].className = 'touchingCells';
    newTouchingCells[i].title = 'Valid move: CLICK to swap';
   
  }
  return newTouchingCells;
}
//get row 'tr' from table
function getRowIndex(obj) {
  var oParent = obj.parentNode;
  while (oParent.nodeName.toLowerCase() != 'tr') {
    oParent = oParent.parentNode;
  }
  return oParent.rowIndex;
}
//get cell 'td' from table
function getCellIndex(obj) {
  var rowIndex = getRowIndex(obj);
  for (i = 0; i < oRows[rowIndex].cells.length; i++) {
    if (obj == oRows[rowIndex].cells[i]) {
      return i;
    }
  }
}
//
function assignOnclicks() {
  for (i = 0; i < touchingCells.length; i++) {
    touchingCells[i].onclick = function() {
      var cellIndex = (getRowIndex(this) * 4) + getCellIndex(this);
      var blankIndx = oBlank.cellIndx;
      //swap clicked cell contents with blank cell contents
      var temp = oCells[cellIndex].innerHTML;
      oCells[cellIndex].innerHTML = '';
      oCells[blankIndx].innerHTML = temp;
      if (isWinner()) {
        reDrawBoard(15);
        alert('You win Congratulations!!!');
        clearInterval(timer);
        
      } else {
        console.log(cellIndex);
        reDrawBoard(cellIndex); //cellIndex is the cell index of the new blank square
      }
    }
  }
}

function isWinner() {
  var isWin = true;
  sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  for (i = 0; i < numbers.length; i++) {
    if (new Number(oCells[i].innerHTML) != sequence[i]) {
      isWin = false;
      i = numbers.length;
    }
  }
  return isWin;
}
Array.prototype.shuffle = function() {
  var s = [];
  while (this.length) s.push(this.splice(Math.random() * this.length, 1));
  while (s.length) this.push(s.pop());
  return this;
}

window.onload = function() {
   var count=0;
var seconds=0;
var timer;
  var f=0;
  oTable = document.getElementById('tblBoard');
  oRows = document.getElementById('tblBoard').getElementsByTagName('tr');
  oCells = document.getElementById('tblBoard').getElementsByTagName('td');
  for(i=0; i< oCells.length;i++){
oCells[i].addEventListener("click",count_moves);      
   }                                                  
  document.getElementById('simple').onclick = simple_game;
  document.getElementById('btnRestart').onclick = restart;
  start();
  
  }

