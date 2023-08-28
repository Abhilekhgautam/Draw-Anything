//capture the canvas first
let canvas = document.getElementById("canvas");
let red = document.getElementById("btn-red");
let green = document.getElementById("btn-green");
let circle_btn = document.getElementById("btn-circle");
let bucket_btn = document.getElementById("bucket");
let eraser = document.getElementById("eraser")

var red_clicked = false;
var green_clicked = false;
var circle_btn_clicked = false;
var bucket_btn_clicked = false;
var eraser_btn_clicked = false;

eraser.addEventListener("click", () => {
  //todo:  change the cursor to an image of a eraser
   console.log("Eraser Activated");
   eraser_btn_clicked = !eraser_btn_clicked;
   circle_btn_clicked = false;
   bucket_btn_clicked = false;
   if(eraser_btn_clicked){
     canvas.style.cursor = "url(rectangle.png),auto";	   
   } else if(!eraser_btn_clicked){
     canvas.style.cursor = "url(pencil.png) 0 10 , auto"	   
   }
})

red.addEventListener("click", () => {
   red_clicked = !red_clicked;
   green_clicked = false;
})

green.addEventListener("click", () => {
   green_clicked = !green_clicked;
   red_clicked = false;
})

circle_btn.addEventListener("click", () => {
   circle_btn_clicked = !circle_btn_clicked;	
})

let ctx = canvas.getContext("2d");
console.log(canvas);

var start_x;
var start_y;

var end_x;
var end_y;
var mouseDown = false;
var shiftDown = false;
var currX;
var currY;

const myImageData = ctx.getImageData(50, 100, 50, 50);
console.log(myImageData.data);

canvas.addEventListener("keydown", (e) => {
  if(e.key == "Shift") {
    console.log("Shift was is down")
    shiftDown = true;
    start_x = currX;
    start_y = currY;
  }
})

canvas.addEventListener("keyup", (e) => {
  if(shiftDown && !circle_btn_clicked){
    shiftDown = false; 
    end_x = currX;
    end_y = currY;

    drawLine(start_x, start_y, end_x, end_y);
  }
})

canvas.addEventListener("mousedown", (e) => {
  console.log(e);
  start_x = e.clientX;
  start_y = e.clientY;
  mouseDown = true;

})

canvas.addEventListener("mousemove", (e) => {
  currX = e.clientX;
  currY = e.clientY;
  if(mouseDown && !shiftDown && !circle_btn_clicked && !eraser_btn_clicked){	
    end_x = e.clientX;
    end_y = e.clientY;
    drawLine(start_x, start_y, end_x, end_y);
    start_x = end_x;
    start_y = end_y;
  } else if (mouseDown && eraser_btn_clicked){ 
       console.log("inside if")
       ctx.beginPath();
       console.log(currX, currY);
       ctx.clearRect(currX, currY, 30, 30);
     }
})

canvas.addEventListener("mouseup", (e) => {
  console.log("Mouse is up")	
  end_x = e.clientX;
  end_y = e.clientY;	
  mouseDown = false;
  if(circle_btn_clicked){
     drawCircle(start_x, start_y, Math.abs(end_x - start_x));	  
  }
})

function setStyle(){
  if(red_clicked) {
     ctx.strokeStyle= "red";
  }
  else if(green_clicked) {
     ctx.strokeStyle = "green";
  }
  else {
      ctx.strokeStyle = "black";	  
  }
}

function drawLine(x1, y1, x2, y2){
  setStyle();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();	
}
var prevRadius = 0;
function drawCircle(x1, y1, radius){
   setStyle();	
   ctx.beginPath();
   ctx.arc(x1, y1, radius, 0, Math.PI * 2, true);
   ctx.stroke();
   prevRadius = radius;
}
