//capture the canvas first
let canvas = document.getElementById("canvas");
let pencil = document.getElementById("pencil")
let color = document.getElementById("color-picker");
let circle_btn = document.getElementById("circle");
let eraser = document.getElementById("eraser")
let rangeSlider = document.getElementById("rangeSlider");

var pencil_selected = true;
var circle_selected = false;
var eraser_selected = false;

pencil.addEventListener("click", () => {
  eraser_selected = false;
  circle_selected = false;
  pencil_selected = true;
  setStyle();
})

eraser.addEventListener("click", () => {
   eraser_selected = true;
   pencil_selected = false;
   circle_selected = false;
   setStyle();
})

circle_btn.addEventListener("click", () => {
   circle_selected = !circle_selected;	
})

let ctx = canvas.getContext("2d");

var start_x;
var start_y;

var end_x;
var end_y;
var mouseDown = false;
var shiftDown = false;
var currX;
var currY;
// Thank you stackoverflow :)
// returns the actual coordinates in the canvas
function translatedX(x){
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (x - rect.left);
}

function translatedY(y){
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (y - rect.top);
}
//Thank you stack overflow again
canvas.addEventListener("keydown", (e) => {
  if(e.key == "Shift") {
    shiftDown = true;
    start_x = currX;
    start_y = currY;
  }
})

canvas.addEventListener("keyup", (e) => {
  if(shiftDown && !circle_selected){
    shiftDown = false; 
    end_x = currX;
    end_y = currY;

    drawLine(start_x, start_y, end_x, end_y);
  }
})

canvas.addEventListener("mousedown", (e) => {
  start_x = translatedX(e.clientX);
  start_y = translatedY(e.clientY);
  mouseDown = true;

})

canvas.addEventListener("mousemove", (e) => {
  currX = translatedX(e.clientX);
  currY = translatedY(e.clientY);
  if(mouseDown && !shiftDown && !circle_selected && !eraser_selected){	
    end_x = translatedX(e.clientX);
    end_y = translatedY(e.clientY);
    drawLine(start_x, start_y, end_x, end_y);
    start_x = end_x;
    start_y = end_y;
  } else if (mouseDown && eraser_selected){ 
       ctx.beginPath();
       ctx.clearRect(currX, currY, 20, 20);
     }
})

canvas.addEventListener("mouseup", (e) => {
  end_x = translatedX(e.clientX);
  end_y = translatedY(e.clientY);	
  mouseDown = false;
  if(circle_selected){
     drawCircle(start_x, start_y, Math.abs(end_x - start_x));	  
  }
})


function setStyle(){
  ctx.strokeStyle = color.value;
  ctx.lineWidth = rangeSlider.value;
  if(eraser_selected){
     canvas.style.cursor = "url(rectangle.png),auto";	   
  }else if(!eraser_selected){
     canvas.style.cursor = "url(pencil.png) 0 10 , auto"	   
  }
}

function drawLine(x1, y1, x2, y2){
  setStyle();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();	
}
function drawCircle(x1, y1, radius){
   setStyle();	
   ctx.beginPath();
   ctx.arc(x1, y1, radius, 0, Math.PI * 2, true);
   ctx.stroke();
}
