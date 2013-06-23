//                       ( x , y,wait,position,xFreq,xAmp,yFreq,yAmp)
//              screen is(800 X 600)
//           top left is (0,0)

function level1(){

    //Wobbly near the bottom
    addShip({x:600,y:700,w:25,p:{x:550,y:400},xF:1,yF:1,xA:0,yA:30});

    //Small circle
    addShip({x:816,y:160,w:5,p:{x:600,y:100},xF:1,xA:80,yF:1,yA:80});
    addShip({x:816,y:160,w:6,p:{x:600,y:100},xF:1,xA:80,yF:1,yA:80});
    addShip({x:816,y:160,w:7,p:{x:600,y:100},xF:1,xA:80,yF:1,yA:80});

    //Four in a row vertically
    addShip({x:815,y:350,w:10,p:{x:600,y:350},xF:1,yF:1,xA:120,yA:0});
    addShip({x:815,y:400,w:10,p:{x:600,y:400},xF:1,yF:1,xA:120,yA:0});
    addShip({x:815,y:450,w:10,p:{x:600,y:450},xF:1,yF:1,xA:120,yA:0});
    addShip({x:815,y:500,w:10,p:{x:600,y:500},xF:1,yF:1,xA:120,yA:0});

    //Figure 8
    addShip({x:400,y:615,w:15,p:{x:550,y:400},xF:2,xA:60,yF:1,yA:120});
    addShip({x:400,y:615,w:16,p:{x:550,y:400},xF:2,xA:60,yF:1,yA:120});
    addShip({x:400,y:615,w:17,p:{x:550,y:400},xF:2,xA:60,yF:1,yA:120});
    addShip({x:400,y:615,w:18,p:{x:550,y:400},xF:2,xA:60,yF:1,yA:120});
	
    //Four in a square pattern
    addShip({x:600,y:700,w:25,p:{x:550,y:400},xF:1,yF:1,xA:0,yA:30});
    addShip({x:450,y:700,w:25,p:{x:500,y:400},xF:1,yF:1,xA:0,yA:30});
    addShip({x:450,y:650,w:25,p:{x:500,y:350},xF:1,yF:1,xA:0,yA:30});
    addShip({x:600,y:650,w:25,p:{x:550,y:350},xF:1,yF:1,xA:0,yA:30});
	
    //Twin Bees (TOP)
    addShip({x:815,y:25,w:30,p:{x:550,y:400},xF:1,yF:1,xA:0,yA:60},2);
    addShip({x:815,y:25,w:31,p:{x:550,y:400},xF:1,yF:1,xA:0,yA:60},2);
    addShip({x:815,y:25,w:32,p:{x:550,y:400},xF:1,yF:1,xA:0,yA:60},2);
    addShip({x:815,y:25,w:33,p:{x:550,y:400},xF:1,yF:1,xA:0,yA:60},2);
    addShip({x:815,y:25,w:34,p:{x:550,y:400},xF:1,yF:1,xA:0,yA:60},2);

}

//variable for vulnerablilty

function addShip(o,t){//(object,type)
    if (t == undefined){
	var foo = new Ship();
    }
    if (t == 1){//****************Splitter
	var foo = new Ship();
	foo.kill  = function (){
	    score += 1;
	    bullet.remove(n);
	    enemy.remove(i);
	    enemy.push(createShip(this.x,this.y+30,0,{x:this.x,y:this.y},0,0,1,60));
	    enemy.push(createShip(this.x,this.y-30,0,{x:this.x,y:this.y},0,0,1,60));
	};
    }
    if (t == 2){//*****************Twin Bees
	var foo = new Ship();
	foo.yAction = 0;
	foo.update = function (){
	    if (player.x < this.x){
		this.x -= 1;
	    }
	    if (player.x >= this.x){
		if (player.y > this.y && this.yAction === 0){
		    this.yAction = 1;
		}
		if (player.y <= this.y && this.yAction === 0){
		    this.yAction = -1;
		}
		this.y += this.yAction;
	    }
	    for (n=0;n<bullet.length;n++){
		if (bullet[n] instanceof Box && boxCollide(bullet[n],enemy[i])){
		    this.kill();
		}
	    }
	};
    }
    foo.x = o.x;
    foo.y = o.y;
    foo.i = enemy.length;
    foo.wait = o.w || 1;
    foo.position = o.p;
    foo.xFreq = o.xF || 0;//decimals?
    foo.xAmp = o.xA || 0;
    foo.yFreq = o.yF || 0;
    foo.yAmp = o.yA || 30;
    foo.action = {x:o.xF, y:o.yF};
    enemy.push(foo);
}
//Guy who gets a little bigger each time you hit him, until he explodes.
//a REALLY small guy who zooms in and out of the screen really quickly who only shots one quick aimed shot at a time


