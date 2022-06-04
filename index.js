const container = document.querySelector('.container');
const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('.btn-reset');
const x = document.querySelector('.x');
const o = document.querySelector('.o');
const draw = document.querySelector('.draw');
let resultArray = [];
const btnResults = document.querySelector('.btn-results');
const body = document.querySelector('.body');
const gameResults = document.querySelectorAll('.game-result');
let result = '';
let xWins = 0;
let oWins = 0;
let draws = 0;
let move = 0;

window.addEventListener('load', getLocalStorage);

container.addEventListener('click', oneMove);

function oneMove (event) {
  if (event.target.classList.contains('box') && event.target.classList.contains('unclicked')  && event.target.innerHTML === '') {
    move % 2 === 0 ? event.target.innerHTML = 'X' : event.target.innerHTML = 'O';
    event.target.classList.remove('unclicked');
    move++;
    winCheck();
    boxClickAudio();
  }
}

function winCheck () {
  const winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4 ,8],
    [2, 4, 6]
  ]
  let check = 0;
  for (let i = 0; i < winArr.length; i++) {
    if (boxes[winArr[i][0]].innerHTML === 'X' && boxes[winArr[i][1]].innerHTML === 'X' && boxes[winArr[i][2]].innerHTML === 'X') {
      console.log('X win!');
      xWins++;
      x.innerHTML = `${xWins}`;
      boxes.forEach(item => item.classList.add('inactive'));
      boxes.forEach(item => item.classList.remove('unclicked'));
      boxes[winArr[i][0]].classList.remove('inactive');
      boxes[winArr[i][1]].classList.remove('inactive');
      boxes[winArr[i][2]].classList.remove('inactive');
      setTimeout(showResult, 800, 'X wins');
      setTimeout(playResultAudio, 500);
      check++;
      addResultInArray('X');
      addResultsInTable(); 
    } else if (boxes[winArr[i][0]].innerHTML === 'O' && boxes[winArr[i][1]].innerHTML === 'O' && boxes[winArr[i][2]].innerHTML === 'O') {
      console.log('O win!');
      oWins++;
      o.innerHTML = `${oWins}`;
      boxes.forEach(item => item.classList.add('inactive'));
      boxes.forEach(item => item.classList.remove('unclicked'));
      boxes[winArr[i][0]].classList.remove('inactive');
      boxes[winArr[i][1]].classList.remove('inactive');
      boxes[winArr[i][2]].classList.remove('inactive');
      setTimeout(showResult, 800, 'O wins');
      setTimeout(playResultAudio, 500);
      check++;
      addResultInArray('O');
      addResultsInTable(); 
    } 
  } 
  if (move === 9 && check === 0) {
    draws++;
    draw.innerHTML = `${draws}`;
    boxes.forEach(item => item.classList.add('inactive'));
    setTimeout(showResult, 800, 'draw');
    setTimeout(playResultAudio, 500);
    addResultInArray('draw');
    addResultsInTable(); 
  }
}

function reset () {
  boxes.forEach(item => item.classList.remove('inactive'));
  boxes.forEach(item => item.innerHTML = '');
  move = 0;
  const x = document.querySelector('.show-result');
  if(x) {x.remove();}
  boxes.forEach(item => item.classList.add('unclicked'));
  playResetAudio();
}

resetBtn.addEventListener('click', reset);

function showResult (winner) {
  const showResult = document.createElement('div');
  showResult.classList.add('show-result');
  container.append(showResult);
  showResult.innerHTML = `${winner}!`
  boxes.forEach(item => item.classList.add('inactive'));
}

const resultAudio = new Audio();
const resetAudio = new Audio();
const clickAudio = new Audio();

function playResultAudio() {
  resultAudio.src = './assets/audio/ding-sound-effect_2.mp3';
  resultAudio.currentTime = 0;
  resultAudio.play();
}

function playResetAudio() {
  resetAudio.src = './assets/audio/reset_sound.mp3';
  resetAudio.currentTime = 0;
  resetAudio.play();
}

function boxClickAudio() {
  clickAudio.src = './assets/audio/box-click.mp3';
  clickAudio.currentTime = 0;
  clickAudio.play();
}

let resultTableIsShown = false;
const resultTableContainer = document.querySelector('.result-table-container');
const overlay = document.querySelector('.overlay');

function showResultTable() {
  resultTableContainer.classList.add('active');
  overlay.classList.add('active');
  resultTableIsShown = true;
}

btnResults.addEventListener('click', showResultTable);

function closeResultTable (event) {
    console.log ('DONE')
    resultTableContainer.classList.remove('active');
    overlay.classList.remove('active');
    resultTableIsShown = false;
}

overlay.addEventListener('click', closeResultTable);

function addResultInArray(i) {
  if (resultArray.length <= 9) {
    resultArray.push(i);
    console.log(resultArray);
  } else {
    resultArray.shift();
    resultArray.push(i);
    console.log(resultArray);
  }
}


function addResultsInTable() {
  gameResults.forEach((element, index) => {
    if (resultArray[index]) {
      element.innerHTML = `${resultArray[index]}`;
    } else {
      element.innerHTML = `-`;
    }
  } );
}

function setLocalStorage() {
  localStorage.setItem('results', JSON.stringify(resultArray));
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('results')) {
    resultArray = JSON.parse(localStorage.getItem('results'));
    addResultsInTable();
  }
}
