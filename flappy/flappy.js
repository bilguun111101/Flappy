const canvas = document.querySelector('#canvas');
canvas.width = 400; canvas.height = 300;
const ctx = canvas.getContext('2d');

// some variables 
let gameStart = false
let pipes = [];
let point = false;
let score = 0;
let bestScore = [];
let pipeTimer = 0;
let flapTimer = 0;
let imgBird = new Image();
let floor = new Image();
floor.src = 'ground.webp'
imgBird.src = 'https://imgs.search.brave.com/LsVNGazLTaZeuvFJA_M81BXrZc7ZenufWYYSYaiJeM8/rs:fit:50:50:1/g:ce/aHR0cDovL2ZjMDgu/ZGV2aWFudGFydC5u/ZXQvZnM3MS9mLzIw/MTQvMDQwLzYvYS9m/bGFwcHlfYmlyZF9i/eV9hYXY1MTAzLWQ3/NXM2eGYucG5n'

function Pipe(width, x, y) {
    this.width = width;
    this.x = x;
    this.y = y;
}

let bird = {
    x: canvas.width / 5,
    y: canvas.height / 3,
    dy: 0,
    d2y: 0
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) +  min;
}

function addPipe() {
    if(pipeTimer <= 0) {
        pipes.push(new Pipe(60, canvas.width, random(60, canvas.height - 100)))
        pipeTimer = 200
    }
    pipeTimer -= 2;
}

function drawPipes() {
    for(let i = 0; i < pipes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = '#39FF33';
        ctx.rect(pipes[i].x, 0, 60, pipes[i].y);
        // ctx.drawImage(topPipe, pipes[i].x, pipes[i].y)
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = '#39FF33'
        ctx.rect(pipes[i].x, pipes[i].y + 100, 60, pipes[i].y + 10000)
        // ctx.drawImage(bttmPipe, pipes[i].x, pipes[i].y + 100);
        // ctx.shadow
        ctx.stroke();
        ctx.fill();
        ctx.closePath();


        pipes[i].x -= 2;
    } 
}

function border() {
    if (bird.y <= 0) {
        bird.d2y *= -2;
    } else if(bird.y >= canvas.height - 50) {
        gameOver();
    }
}

function toCollidePipe() {
    for(let i = 0; i < pipes.length; i++) {
        if((bird.x + 44 >= pipes[i].x) && (bird.x - 3 <= pipes[i].x + pipes[i].width) && (bird.y <= pipes[i].y - 14|| bird.y + 30 >= pipes[i].y + 93)) {
            gameOver();
            point = false;
        }
        else if((bird.x >= pipes[i].x + pipes[i].width) && (bird.y > pipes[i].y || bird.y + 30 < pipes[i].y + 100)){
            point = true;
            score++;
            // document.querySelector('.score').textContent = 'score: ' + score;
        }
    }
    if (point === true) {
        score++;
        document.querySelector('.score').textContent = 'score: ' + score;
    }
}

function drawBird() {
    bird.y += bird.dy;
    bird.dy += bird.d2y;

    ctx.beginPath();
    ctx.drawImage(imgBird, bird.x, bird.y)
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#047A00'
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.shadowOffsetX = 0; 
    ctx.stroke()
    ctx.closePath()
}

function gameOver() {
    gameStart = false;
    pipes = [];
    bird.d2y = 0;
    bird.dy = 0;
    bird.y = canvas.height / 3;
    document.querySelector('.start').textContent = 'Game over';
    bestScore.push(score);
    score = 0;
    document.querySelector('.score').textContent = 'score: ' + score;
    let ggg;
    for(i = 0; i < bestScore.length; i++) {
        ggg = bestScore[0];
        if (ggg < bestScore[i]) {
            ggg = bestScore[i];
        } else {
            ggg = ggg;
        }
    }
    console.log(bestScore)
    document.querySelector('.bestScore').textContent = 'Best score: ' + ggg;
}

window.addEventListener('keydown', (e) => {
    if(e.key === ' '){
        if(!gameStart){
            bird.d2y = 0.1;
            gameStart = true;
            document.querySelector('.start').textContent = 'Start'
        } else {
            bird.dy = -3;
            flapTimer = 10;
        }
    }
}, false)

function ready() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird()
    if (gameStart) {
        border();
        addPipe();
        toCollidePipe();
        drawPipes();
    }
}

setInterval(ready, 10)