const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;
let enemyInterval = 100;
let enemyTimer = 0;

let enemies = [];



class Enemy {
    constructor(){
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.x = this.gameWidth;
        this.y = Math.random()*this.gameHeight
        this.width = 100;
        this.height = 100;
    }
    update(){
        this.x--;
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function update(){

    if(enemyTimer>enemyInterval){
        addNewEnemy();
        enemyTimer = 0;
        console.log(enemies);
    }
    else {
        enemyTimer++;
    }
    enemies.forEach(object => object.update());
}
function draw(){
    enemies.forEach(object => object.draw(ctx));
}
function addNewEnemy(){
    enemies.push(new Enemy());
}

let lastTime = 0;
function animate(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    update();
    draw();
    requestAnimationFrame(animate);
}
animate(0);