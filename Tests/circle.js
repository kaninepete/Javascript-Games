//canvas.width = 10;

var boxes = [];
var center = {x:100,y:100,r:10};


function Box() {
    this.x = 0;
    this.y = 0;
    this.h = 1;
    this.w = 1;
    this.fill = "#444";
    this.draw = function(ctx) {
        display.ctx.fillStyle = this.fill;
        display.ctx.fillRect(this.x-10, this.y-10, this.h, this.w);

    };
}

function addRect(x, y, w, h, fill) {
    var rect = new Box();
    rect.x = x;
    rect.y = y;
    rect.w = w;
    rect.h = h;
    rect.fill = fill;
    boxes.push(rect);
    invalidate();
}


function stuffToDraw() {
    display.ctx.fillStyle = "#11f";
    display.ctx.fillRect(0, 0, 400, 300);
	display.ctx.fillStyle = "#000";
	display.ctx.beginPath();
	display.ctx.arc( center.x, center.y, center.r, 0, Math.PI*2, true);
	display.ctx.closePath();
	display.ctx.fill();	
	var l = boxes.length;
    for (var i = 0; i < l; i++) {
        boxes[i].draw(display.ctx);
    }
    if (display.mySel != null) {
        display.ctx.strokeStyle = "#f00";
        display.ctx.lineWidth = 3;
        display.ctx.strokeRect(display.mySel.x-10,display.mySel.y-10,display.mySel.w,display.mySel.h);
    }
    display.valid = true;
}



function myDown(e) {
    getMouse(e);
    var l = boxes.length;
    for (var i = l - 1; i >= 0; i--) {
        if ((display.mx > boxes[i].x-10 && display.mx < boxes[i].x-10 + boxes[i].w)&&(display.my > boxes[i].y && display.my < boxes[i].y + boxes[i].h)) {
            display.mySel = boxes[i];
            display.offsetx = display.mx - display.mySel.x;
            display.offsety = display.my - display.mySel.y;
            display.mySel.x = display.mx - display.offsetx;
            display.mySel.y = display.my - display.offsety;
            display.isDrag = true;
            canvas.onmousemove = myMove;
            invalidate();
            return;
        }
        display.mySel = null;
    }
}

function myUp(e) {
    //alert("clicked: x=" + display.mx + " y=" + display.my);
      display.isDrag = false;
  canvas.onmousemove = null;

}

function myMove(e){
  if (display.isDrag){
    getMouse(e);
 
    display.mySel.x = display.mx - display.offsetx;
    display.mySel.y = display.my - display.offsety;   
    //alert("drag");
	var AB = (-1/slopeOf(boxes[0],boxes[1]));
	var midAB = midpoint(boxes[0],boxes[1]);//{x:1,y:3}
	var BC = (-1/slopeOf(boxes[1],boxes[2]));
	var midBC = midpoint(boxes[1],boxes[2]);
	//var rad = distance(boxes[0],center);
	center = cross(midAB.y, AB, midAB.x, midBC.y, BC, midBC.x);//{x:75,y:75,r:20};
    // something is changing position so we better invalidate the canvas!
    invalidate();
  }
}
/*
function myDblClick(e) {
    getMouse(e);
    //alert("clicked: x=" + display.mx + " y=" + display.my);
    addRect(display.mx-10,display.my-10,20,20,'#2BB8FF');
}*/

function poop(){
    display.draw();
}

setInterval(poop, 20);
addRect(200, 200, 64, 64, '#FFC02B');
addRect(100, 200, 16, 16, '#C0FF2B');
addRect(200, 100, 32, 32, '#FF2BC0');

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.ondblclick = myDblClick;

invalidate();
