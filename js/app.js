const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
// const radius = document.getElementById("jsRadius");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsClear");
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// let radiusSize = radius.value;
let balls=[];
let ballNumber = 0;
let color = "rgb(0, 0, 0)";

canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let balling = false;
let rainbow = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

class Ball {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.c = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
        this.size = 10 + Math.random()*30;
        this.directionX = Math.random()*10 - 5;
        this.directionY = Math.random()*10 - 5;
    }
    update(){
        this.x += this.directionX;
        this.y += this.directionY;
        if(this.x + this.size >= canvas.height || this.x - this.size <= 0){
            this.directionX *= -1
        }
        if(this.y + this.size >= canvas.width || this.y - this.size <= 0){
            this.directionY *= -1
        }
    }
    draw(){
        if(rainbow){
            ctx.fillStyle= this.c;
            ctx.strokeStyle= this.c;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

function makeBall(x, y){
    for(i=0; i<ballNumber; i++){
        balls[i] = new Ball(x, y)
    }
}

function ballAnimate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i=0; i<ballNumber; i++){
        balls[i].update();
        balls[i].draw();
    }
    if(balling){
        requestAnimationFrame(ballAnimate);
    }
}

function onMouseDown(event) {
    if(rainbow){
        color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }

    startPainting();

    ballNumber++
    if(balling){
        clear.innerText = "STOP";
        makeBall(event.offsetX, event.offsetY);
        if(ballNumber === 1){
            ballAnimate();
        }
    }
}

 
function onMouseMove(event) {
    let x = event.offsetX
    let y = event.offsetY
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function handleColorClick(event) {
    if(!event.target.classList.contains("rainbow")){
        color = event.target.style.backgroundColor;

    } else {
        rainbow = true;
        color = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`; 
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

// function handleRadiusChange(event){
//     const size = event.target.value;
//     radiusSize = size;
// }

function handleModeClick(event) {
    if(filling === true){
        balling = true;
        filling = false;
        mode.innerText = "Ball";
    } else if (balling === true){
        balling = false;
        mode.innerText = "Paint";
    } else {
        filling = true;
        mode.innerText = "Fill";
    }
}

function handleClearClick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (balling){
        balling = false;
        clear.innerText = "Clear"
        mode.innerText = "Paint";
    } else {
        ballNumber = 0;
    }
}

function handleCanvasClick(){
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[✨]"
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange)
};

// if(radius){
//     radius.addEventListener("input", handleRadiusChange)
// };

if(mode){
    mode.addEventListener("click", handleModeClick)
};

if(clear){
    clear.addEventListener("click", handleClearClick)
};

if(saveBtn){
    saveBtn.addEventListener("click", handleCM)
};