let cameraX = 0;
let cameraY = 0;
let cameraZ = 0;
let camPitch = 0;
let camYaw = 0;
let newX = 0;
let lastposition;
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
	for (x=0;x<10;x++) {
		terrain[x] = []
		for(y=0; y<10;y++){
			terrain[x][y] = []
			for(z=0; z<10;z++){
				terrain[x][y][z] = new Block(floor(map(noise(x), 0, 1, 0, 10)), floor(map(noise(x,y+1), 0, 1, 0, 10)), floor(map(noise(x,y,z+1), 0, 1, 0, 10)))
			}
		}
	}
//ore genning
	for (x=0;x<10;x+=1) {
		for(y=0; y<10;y++){
			for(z=0; z<10;z++){
				lastposition = z
				randomizer = noise(random(100))
				if (randomizer < 0.4 && terrain[x][y][z].y > 2){
				terrain[x][y][z].textr = textarray[1]
			}
			if (randomizer < 0.23 && terrain[x][y][z].y > 3){
			terrain[x][y][z].textr = textarray[2]
		}
		if (randomizer < 0.085 && terrain[x][y][z].y > 7){
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
	if (terrain[lastposition][lastposition][lastposition].z * 50 + zoff > 500){
		terrain[lastposition][lastposition][lastposition] = new Block(lastposition+1,lastposition+1,lastposition+1)
	}
	//movement stuff start
	if (keyCode == UP_ARROW && keyIsPressed){
		zoff += 15
		//newZ = sin( mx/width ) * 2
	}
	else if (keyCode == DOWN_ARROW && keyIsPressed){
		zoff -= 15
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
//no collision rip
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
	for (let i = 0; i < textarray.length; i++){
	        texture(textarray[i])
	        for (x=0;x<terrain.length;x++){
	            for (y=0;y<terrain.length; y++){
	                for (z=0;z<terrain.length; z++){
	                    if (terrain[x][y][z].textr == textarray[i]){
													if (terrain[x][y][z].z * 50 + zoff <= 500 && terrain[x][y][z].z * 50 + zoff >= -500){
	                        push()
	                        translate(terrain[x][y][z].x * 50+xoff,terrain[x][y][z].y * 50+yoff, terrain[x][y][z].z*50+zoff)
	                        box(50, 50, 50)
	                        pop()
												}
												else{
													terrain[x][y][z].IsVisible = false
												}
	                }
	            }
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
	this.IsVisible = true
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
