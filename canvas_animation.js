$(document).ready(function(){
	console.log("ready");
	window.requestAnimFrame(animation);
	window.requestAnimFrame(particleAnimation);
	window.requestAnimFrame(drawSprite);
	//drawSprite();
});
var x = 0;

var img = new Image();
img.src = "sprite.png";

var tick2 = 0;
var frame = tick/3 % 10;
var xx = frame * 13;

var drawSprite = function(){
	window.requestAnimFrame(drawSprite);
	var canvas = document.getElementById('canvas3');
	var c = canvas.getContext('2d');
	c.fillStyle = "white";
	frame = tick2/3 % 10;
	xx = frame * 13;
	c.drawImage(
		img,
		xx,0,13,13,
		0,0,13,13
		);
	tick2++;
}

var canvas2 = document.getElementById('canvas2');
var particles = [];
var tick = 0;


var particleAnimation = function(){
	window.requestAnimFrame(particleAnimation);
	createParticles();
	updateParticles();
	killParticles();
	drawParticles();
};

var createParticles = function(){
	if(tick % 10 == 0){
		if(particles.length < 100){
			particles.push({
				x: Math.random()*canvas.width,
				y: 0,
				speed: Math.random()*3,
				radius: Math.random()*5,
				color: "white"
			});
		}
	}
};

var updateParticles = function(){
	for(var i in particles){
		//var part = particles[i];
		//part.y += part.speed;
		particles[i].y += particles[i].speed;
	}
};

var killParticles = function(){
	for(var i in particles){
		var part = particles[i];
		if(part.y > canvas2.height){
			part.y = 0;
		}
	}
};

var drawParticles = function(){
	var c = canvas2.getContext('2d');
	c.fillStyle = "black";
	c.fillRect(0,0,canvas2.width, canvas2.height);
	for(var i in particles){
		var part = particles[i];
		c.beginPath();
		c.arc(part.x, part.y, part.radius, 0, Math.PI*2);
		c.closePath();
		c.fillStyle = part.color;
		c.fill();
	}
}

var animation = function(){
	window.requestAnimFrame(animation);
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.clearRect(0,0,canvas.width,canvas.height);
	c.fillStyle = "red";
	c.fillRect(x,100,200,100);
	x+=5;
};

// shim layer with setTimeout fallback 
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||            
   		window.webkitRequestAnimationFrame ||            
   		window.mozRequestAnimationFrame    ||            
   		window.oRequestAnimationFrame      ||            
   		window.msRequestAnimationFrame     ||            
   		function( callback ){             
   			window.setTimeout(callback, 1000 / 60);           
   		}; 
})(); 