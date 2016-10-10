$(document).ready(function(){
	console.log("ready");
	drawBarchart();
	drawPiechart();
});

var drawBarchart = function(){
	var data = [ 16, 68, 20, 30, 54 ]; 
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');

	c.fillStyle = "white";
	c.fillRect(0,0,500,500);

	c.fillStyle = "blue";
	for(var i =0; i<data.length; i++){
		c.fillRect(40 + i*100, 490-data[i]*5 - 30, 50, data[i]*5);
	}

	c.fillStyle = "black";
	c.lineWidth = 2.0;
	c.beginPath();
	c.moveTo(30,10);
	c.lineTo(30,460);
	c.lineTo(490,460);
	c.stroke();

	c.fillStyle = "black";
	for(var i = 0; i < 6; i++){
		c.fillText((5-i)*20 + "",4,i*80+60);
		c.beginPath();
		c.moveTo(25,i*80+60);
		c.lineTo(30,i*80+60);
		c.stroke();
	}

	var labels = ["JAN","FEB","MAR","APR","MAY"];
	for(var i = 0; i<5; i++){
		c.fillText(labels[i], 50+i*100, 475);
	}
};

var drawPiechart = function(){
	//initialize data set 
	var data = [ 100, 68, 20, 30, 100 ];  
	var canvas = document.getElementById('canvas2'); 
	var c = canvas.getContext('2d'); 
	//draw background 
	c.fillStyle = "white"; 
	c.fillRect(0,0,500,500);

	var colors = ["orange","green","blue","yellow","teal"];
	var total = 0;
	for(var i = 0; i<data.length; i++){
		total += data[i];
	}

	var prevAngle = 0;
	for(var i=0; i<data.length; i++){
		var fraction = data[i]/total;
		var angle = prevAngle + fraction*Math.PI*2;
		//c.fillStyle = colors[i];

		var grad = c.createRadialGradient(250,250,10,250,250,100);
		grad.addColorStop(0,"white");
		grad.addColorStop(1,colors[i]);
		c.fillStyle = grad;

		c.beginPath();
		c.moveTo(250,250);
		c.arc(250,250,100, prevAngle, angle, false);
		c.lineTo(250,250);

		c.fill();
		
		c.strokeStyle = "black";
		c.stroke();
		prevAngle = angle;
	}

	c.fillStyle = "black";
	c.font = "24pt sans-serif";
	var text = "Sales Data from 2025";
	var metrics = c.measureText(text);
	c.fillText(text, 250-metrics.width/2, 400); 
};