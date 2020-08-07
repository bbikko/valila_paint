const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_DEFAULT_SIZE = 700;
const DEFAULT_COLOR = "#2c2c2c";

canvas.width = CANVAS_DEFAULT_SIZE;
canvas.height = CANVAS_DEFAULT_SIZE;

ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = DEFAULT_COLOR;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClock(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleChangeRange(event){
    const range = event.target.value;    
    ctx.lineWidth = range;
}

function handleModeClick(){
    if( filling === false){
        filling = true;
        mode.innerText = "Fill";
    }else {
        filling = false;
        mode.innerText = "Paint";
    }    
}

function handleCanvasClick(){
    if( filling ) {
        ctx.fillRect(0, 0, CANVAS_DEFAULT_SIZE, CANVAS_DEFAULT_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS.jpeg";
    link.click();

}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClock ));
}

//Array 로 만들어줌 
//console.log(Array.from(colors));

if( range ){
    range.addEventListener("input", handleChangeRange);
}

if( mode ) {
    mode.addEventListener("click", handleModeClick);
}

if( saveBtn ) {
    saveBtn.addEventListener("click", handleSaveClick);
}