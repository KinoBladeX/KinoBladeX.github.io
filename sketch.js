let cameraX = 0;
let cameraY = 0;
let cameraZ = 0;
let camPitch = 0;
let camYaw = 0;
let newX = 0;
let newY
let newZ
let xoff = 0 ;
let yoff = 0;
let zoff = 0;
let mxcurrent;
let mxdelta;
let mycurrent;
let mydelta;
let terrain = [];
let textarray = [];
let blocktext;
let randomizer;

function preload() {
	//textures and shiiz
	textarray[0] = loadImage('dirt.jpg')
	textarray[1] = loadImage('stone.png')
	textarray[2] = loadImage('coal.png')
	textarray[3] = loadImage('diamond.png')
}


function setup() {
	createCanvas(1000, 1000, WEBGL);
	//are you ready to enter the ｎｅｘｔ ｄｉｍｅｎｓｉｏｎ
	//this creates a TWO dimensional array
	//Imagine it as one array per X coordinate
	//actually, that's a bad way to imagine it, just watch a tutorial and you'll be fine

	mxcurrent = mouseX
mycurrent = mouseY
//dirt genning
	for (x=0;x<10;x+=1) {
		terrain[x] = []
		for(y=0; y<10;y++){
			terrain[x][y] = []
			for(z=0; z<10;z++){
				terrain[x][y][z] = new Block(x,y,z)
			}
		}
	}
//ore genning
	for (x=0;x<10;x+=1) {
		for(y=0; y<10;y++){
			for(z=0; z<10;z++){
				randomizer = random(0,4)
				if (randomizer < 2){
				terrain[x][y][z].textr = textarray[1]
			}
			if (randomizer < 0.7){
			terrain[x][y][z].textr = textarray[2]
		}
		if (randomizer < 0.2){
		terrain[x][y][z].textr = textarray[3]
	}
			}
		}
	}
}
function draw() {
	//vars

	var mx = constrain(mouseX-(width/2), -(width/2), width)
	var yawradian = radians(mx)
	var my = constrain(mouseY-(height/2), -(height/2), height)
	var pitchradian = radians(my)
	var mxdelta = mouseX-mxcurrent
	var mydelta = mouseY-mycurrent
	camYaw += mydelta/2.5
	camPitch += mxdelta/2.5
	LockCamera()
	//vars end

	//movement stuff start
	if (keyCode == UP_ARROW && keyIsPressed){
		xoff-=cos(radians(camPitch))*6
		zoff-=sin(radians(camPitch))*6
		console.log("xoff is:", sin(radians(camPitch))*6, "zoff is:", sin(radians(camPitch))*6)
		//newZ = sin( mx/width ) * 2
	}
	else {
		newX = 0;
		newY = 0;
		newZ = 0;
	}
	//movement stuff end

	//collision junk start
	//remember that time dan said "it's better to check if the object is NOT touching", yeah thats what's going on here

	background(51);
	rotateX(camYaw/50)
	rotateY(camPitch/50)

	cameraX += newX
	cameraZ += newZ
	cameraY += newY

	camera(cameraX+80 , cameraY, cameraZ, cameraX+80, cameraY, cameraZ,1,0,1)
	DrawCubes()

	mxcurrent = mouseX
	mycurrent = mouseY

}

function RandomTextures() {
	for (i = 0; i < terrain.length; i++) {
  terrain[i].textr = random(textarray)
}
}

function DrawCubes() {
	for (x=0;x<terrain.length;x++){
		for (y=0;y<terrain.length; y+=1){
			for (z=0;z<terrain.length; z+=1){
				push()
				texture(terrain[x][y][z].textr)
				translate(terrain[x][y][z].x * 50+xoff,terrain[x][y][z].y * 50+yoff, terrain[x][y][z].z*50+zoff)
				box(50, 50, 50)
				pop()
			}
		}
	}
}

function Block(MyX, MyY, MyZ){
	this.x = MyX
	this.y = MyY
	this.z = MyZ
	//random textures are tweaking for some reason XD
	this.textr = textarray[0]
}

function LockCamera(){
	//we dont want to be cracking our necks trying to look around? Now do we?
	if(camPitch>90){
		camPitch = 90;
	}
	else if(camPitch< -90){
		camPitch = -90
	}

	if (camYaw<0.0){
		camYaw+= 360
	}
	else if(camYaw>360){
		camYaw-= 360
	}
}
