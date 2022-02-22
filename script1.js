const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;
let enemyInterval = 400;
let enemyTimer = 0;


const flyingDino = new Image();
flyingDino.src = 'flying dino.png';
const jumpingSpider = new Image();
jumpingSpider.src = 'spider.png';
const runningDino = new Image();
runningDino.src = 'running dino.png';

let enemies = [];
const enemyTypes = ['running','flying','jumping'];

class Enemy {
    constructor(){
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.markedForDeletion = false;
        this.frameX=0;
       
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
                this.frameTimer = 0;
            }
            else {
                this.frameX = 0;
            }
        }
        else{
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
        this.maxFrame = 7; //tí phải đổi
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
class FlyingDino extends Enemy {
    constructor(){
        super();
        this.maxFrame = 6; //tí phải đổi
        this.spriteWidth = 1200/7;
        this.spriteHeight = 151;
        this.x = this.gameWidth;
        this.y =this.gameHeight*Math.random() *0.6;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.speed = Math.random()*0.1 + 0.1;
        this.image = flyingDino;
        this.angle = 0;
        this.curve = Math.random() * 3;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += Math.sin(this.angle)* this.curve;
        this.angle += 0.1;
    }
};
class JumpingSpider extends Enemy {
    constructor(){
        super();
        this.maxFrame = 7; 
        this.spriteWidth = 1254/8;
        this.spriteHeight = 91;
        this.x = this.gameWidth;
        this.y =this.gameHeight*Math.random() *0.6;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.speed = Math.random()*0.1 + 0.1;
        this.image = jumpingSpider;
        this.vy = 0;
        this.weight = 1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += this.vy;
        if(this.y < this.gameHeight - this.height){
            this.vy += this.weight;// khi vy <0 thì nvat sẽ nhảy lên, đạt đỉnh khi vy = 0, vy >0 sẽ đi xuống
        } else {
            this.vy = -15;
        }
    }
};
function update(deltaTime){
    enemies =  enemies.filter(object => !object.markedForDeletion)   
    if(enemyTimer>enemyInterval){
        addNewEnemy();
        enemyTimer = 0;
        // console.log(enemies);
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
   
    let randomEnemy = enemyTypes[Math.floor(Math.random()*enemyTypes.length)]
    if (randomEnemy == 'running'){
        enemies.push(new RunningDino());
    }
    else if (randomEnemy == 'flying'){
        enemies.push(new FlyingDino());
    }
    else if (randomEnemy == 'jumping'){
        enemies.push(new JumpingSpider());
    }
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
