const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;
let enemyInterval = 400;
let enemyTimer = 0;


const flyingDino = new Image();
flyingDino.src = 'flying dino.png';
const jumpingDino = new Image();
jumpingDino.src = 'jumping dino.png';
const runningDino = new Image();
runningDino.src = 'running dino.png';

let enemies = [];
const enemyTypes = ['running'];

class Enemy {
    constructor(){
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.markedForDeletion = false;
        this.frameX;
        this.maxFrame = 7; //tí phải đổi
        // this.fps = 20;
        this.frameInterval = 100;// có thể chia fps
        this.frameTimer = 0;
    }
    update(deltaTime){
        this.x -= this.speed*deltaTime; 
        //remove enemies
        if (this.x + this.width < 0){
            this.markedForDeletion = true;
        }
        if (this.frameTimer > this.frameInterval){
            if (this.frameX < this.maxFrame){
                this.frameX++
            }
            else {
                this.frameX = 0;
            }
        }
        else if (this.frameTimer < this.frameInterval){
            this.frameTimer += deltaTime;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX* this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class RunningDino extends Enemy {
    constructor(){
        super();
        this.spriteWidth = 94.5;
        this.spriteHeight = 72;
        this.x = this.gameWidth;
        this.y =this.gameHeight - this.spriteHeight;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.speed = Math.random()*0.1 + 0.1;
        this.image = runningDino;
        // console.log(this.height);
    }
    update(deltaTime){
        super.update(deltaTime);
    }
};

function update(deltaTime){
    enemies =  enemies.filter(object => !object.markedForDeletion)   
    if(enemyTimer>enemyInterval){
        addNewEnemy();
        enemyTimer = 0;
        console.log(enemies);
    }
    else {
        enemyTimer+=deltaTime;
    }
    enemies.forEach(object => object.update(deltaTime));
}
function draw(){
    enemies.forEach(object => object.draw(ctx));
}
function addNewEnemy(){
    enemies.push(new RunningDino());
}

let lastTime = 0;
function animate(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    update(deltaTime);
    draw();
    requestAnimationFrame(animate);
}
animate(0);
