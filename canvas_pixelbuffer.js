$(document).ready(function(){
	console.log("ready");
	checkerboardtexture();
	imageInversion();
	compositeMode();
});


var checkerboardtexture = function(){
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	//create a new 300 x 300 pixel buffer 
	var data = c.createImageData(500,500);  

	//loop over every pixel 
	for(var x=0; x<data.width; x++) {     
		for(var y=0; y<data.height; y++) {
                var val = 0;
                var horz = (Math.floor(x/4) % 2 == 0); 
                //loop every 4 pixels
                var vert = (Math.floor(y/4) % 2 == 0); 
                // loop every 4 pixels
                if( (horz && !vert) || (!horz && vert)) {
                    val = 255;         
                } else {
                    val = 0;         
                }

                if(val == 0) {     val = Math.random()*100; } else {     val = 255-Math.random()*100; } 

                var index = (y*data.width+x)*4;  
                //calculate index
                data.data[index] = val;   
                // red         
                data.data[index+1] = val; 
                // green
                        data.data[index+2] = val; 
                // blue
                         data.data[index+3] = 255; 
                // force alpha to 100%     
                }
            } //set the data back 
            c.putImageData(data,0,0); 
}

var imageInversion = function(){
	var canvas = document.getElementById('canvas2');
	var c = canvas.getContext('2d');
	var img = new Image(); img.onload = function() {     
	//draw the image to the canvas
    c.drawImage(img,0,0);
    //get the canvas data
    var data = c.getImageData(0,0,canvas.width,canvas.height);
    //invert each pixel
    for(n=0; n<data.width*data.height; n++) {
        var index = n*4;
        data.data[index]   = 255-data.data[index];
        data.data[index+1] = 255-data.data[index+1];
        data.data[index+2] = 255-data.data[index+2];
        //don't touch the alpha
    }
    //change to black and white
    for(n=0; n<data.width*data.height; n++) {
     var index = n*4;
      var r = data.data[index];
     var g = data.data[index+1];
     var b = data.data[index+2];
     var v = r*0.21+g*0.71+b*0.07; 
    // weighted average
     data.data[index]   = v;
     data.data[index+1] = v;
     data.data[index+2] = v;
     //don't touch the alpha
     }  
    //set the data back
    c.putImageData(data,0,0); 
	} 
	img.src = "cat.jpg"; 
}

var compositeMode = function(){
	var canvas = document.getElementById('canvas3');
	var c = canvas.getContext('2d');
	c.globalCompositeOperation = "lighter"; 
	//set the blend mode 
	c.fillStyle = "#ff6699";  
	//fill with a pink  
	//randomly draw 50 circles 
	for(var i=0; i<50; i++) {     
		c.beginPath();     
		c.arc(         
			Math.random()*400, 
			// random x         
			Math.random()*400, 
			// random y         
			40,                
			// radius         
			0,Math.PI*2);      
			// full circle     
			c.closePath();     
		c.fill(); } 
}

var shadow = function(){
	c.fillStyle = "black"; 
	c.fillRect(0,0,canvas.width,canvas.height);  
	c.shadowColor = "white"; 
	c.shadowOffsetX = 0; 
	c.shadowOffsetY = 0; 
	c.shadowBlur = 30;  
	c.font = 'bold 80pt Arial'; 
	c.fillStyle = "#55cc55"; 
	c.fillText("ALIEN",30,200); 
}