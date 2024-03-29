let scoreBlock
let score = 0

const config  ={
step: 0,
maxStep: 8,
sizeCell: 16,
sizeBerry: 16 / 4
}

const snake = {
    x: 160,
    y: 160,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3
}

let barry = {
    x: 0,
    y: 0
}

let canvas = document.querySelector("#game-canvas")
let context = canvas.getContext("2d")
scoreBlock = document.querySelector(".game-score .score-count")
drawScore()

let score_audio =  new Audio()

score_audio.src = "audio/score.mp3 "

function gameLoop(){

    requestAnimationFrame(gameLoop);
if(++config.step < config.maxStep){
    return;
}
config.step = 0;

context.clearRect(0,0, canvas.width, canvas.height) ;

drawBerry();
drawSnake();
}
requestAnimationFrame(gameLoop);

function drawSnake(){
    snake.x += snake.dx;
    snake.y += snake.dy;


collisionBorder();

snake.tails.unshift({x: snake.x, y: snake.y});

if(snake.tails.length > snake.maxTails){
    snake.tails.pop();
}

snake.tails.forEach(function(el,index){
    if(index == 0){
        context.fillStyle = "#008000";
    }else{
        context.fillStyle = "#ADFF2F";
    }
    context.fillRect(el.x, el.y, config.sizeCell , config.sizeCell);


    if(el.x === barry.x && el.y === barry.y){
        snake.maxTails++;
        incScore();
        randomPositionBerry();
    }

    for(let i = index + 1; i < snake.tails.length; i++){
        if(el.x == snake.tails[i].x && el.y == snake.tails[i].y){
                refreshGame();
        }
    }

}) ;   
}   

function collisionBorder(){
    if(snake.x < 0){
        snake.x = canvas.width - config.sizeCell;
    } else if(snake.x >= canvas.width){
        snake.x = 0;
    }

    if(snake.y < 0){
        snake.y = canvas.height - config.sizeCell;
    } else if(snake.y >= canvas.height){
        snake.y = 0;
    }
}


function refreshGame(){
    score = 0;
    drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.tails = [];
    snake.maxTails = 3;
    snake.dx = config.sizeCell;
    snake.dy = 0;

    randomPositionBerry();

}

function drawBerry(){
    context.beginPath();
    context.fillStyle ="#FF0000";
    context.arc( barry.x + (config.sizeCell / 2 ), barry.y +(config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI);
    context.fill();

}


function randomPositionBerry(){
    barry.x  = getRandomInt( 0, canvas.width / config.sizeCell)* config.sizeCell;
    barry.y  = getRandomInt( 0, canvas.height / config.sizeCell)* config.sizeCell;
}


function incScore() {
    score++;
    score_audio.play()
    drawScore();
}

function drawScore() {
scoreBlock.innerHTML = score;
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min) - min);
}

document.addEventListener("keydown", function(e){
    if(e.code == "KeyW"){
        snake.dy = -config.sizeCell
        snake.dx = 0;
    }else if (e.code == "KeyA"){
        snake.dx = -config.sizeCell
        snake.dy = 0;
    }else if (e.code == "KeyS"){
        snake.dy = config.sizeCell
        snake.dx = 0;
    }else if (e.code == "KeyD"){
        snake.dx = config.sizeCell
        snake.dy = 0;
    }
});



var initialPoint;
var finalPoint;
document.addEventListener('touchstart', function(event) {
event.preventDefault();
event.stopPropagation();
initialPoint=event.changedTouches[0];
}, false);
document.addEventListener('touchend', function(event) {
event.preventDefault();
event.stopPropagation();
finalPoint=event.changedTouches[0];
var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
if (xAbs > 20 || yAbs > 20) {
if (xAbs > yAbs) {
if (finalPoint.pageX < initialPoint.pageX){snake.dx = -config.sizeCell
    snake.dy = 0;
/*СВАЙП ВЛЕВО*/}
else{snake.dx = config.sizeCell
    snake.dy = 0;
/*СВАЙП ВПРАВО*/}
}
else {
if (finalPoint.pageY < initialPoint.pageY){snake.dy = -config.sizeCell
    snake.dx = 0;
/*СВАЙП ВВЕРХ*/}
else{snake.dy = config.sizeCell
    snake.dx = 0;
/*СВАЙП ВНИЗ*/}
}
}
}, false);

