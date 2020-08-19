var canvasdom = document.getElementById('canvasgraph');
var finput = document.getElementById('function');
var gbtn =document.getElementById('graphbtn');
var message=document.getElementById('message');
var zoombtn=document.getElementById('zoombtn');
var zoom=document.getElementById('zoom');
var comparebtn =document.getElementById('compare');
var x;
var y;
var fstring;
var z=10;
comp=false;

var c=canvasdom.getContext('2d');
canvasdom.width=0.95*window.innerWidth;
canvasdom.height=0.85*window.innerHeight;
addEventListener('resize', event => {
	canvasdom.width=0.95*window.innerWidth;
	canvasdom.height=0.85*window.innerHeight;
})


gbtn.addEventListener('click',()=>{
	if(checkstring(finput.value)===true){	
		c.clearRect(0, 0, canvasdom.width, canvasdom.height);
		if(comp==true){fstring2=fstring;}
		fstring= finput.value;
		message.innerText='';
		axis();
		draw2(fstring,'green');
		compare();
	}
})

comparebtn.addEventListener('click',(e)=>{
	if(comp==true){
		e.srcElement.style.backgroundColor="#e6e6ff";
		comparebtn.innerText='Compare';
		comp=false;
	}
	else{
		comp=true;
		e.srcElement.style.backgroundColor="#66ffcc";
		comparebtn.innerText='Uncompare';
	}
})

function compare(){
	if(comp==true){
		draw2(fstring2,'red')
	}
}

zoombtn.addEventListener('click',()=>{
	if(zoom.value>0){
		z=zoom.value;
		c.clearRect(0, 0, canvasdom.width, canvasdom.height);
		axis();
		draw2(fstring,'green');
		compare();
	}else{
		message.innerText="Value of zoom cannot be negative";
	}
})

function checkstring(str){
	for(let i=0;i<str.length;i++){
		if(str[i]=='x'||str[i]=='+'|| str[i]=='-' || str[i]=='*'||str[i]=='/'||(str[i]>='0'&&str[i]<='9')||str[i]==' '){
			continue;
		}
		else{
			message.innerText="Enter a valid function of x";
			return false
		}
	}
	return true
}

function axis(){
	c.fillRect(0,canvasdom.height/2,canvasdom.width,2);
	c.fillRect(canvasdom.width/2,0,2,canvasdom.height);
}
function convert(num,type){
	if(type=='x'){
		return num+canvasdom.width/2;	
	}
	else if(type=='y'){

		return -num +canvasdom.height/2;
	}	
}


function draw2(fstring,color){
	let i=0;
	let x1=0,x2=0,x3=0,x4=0;
	let y1=0,y2=0,y3=0,y4=0;
	let d=0;
	do{
		x=i;
		y=eval(fstring);
		y2=y;
		x2=x;
		line(x1,x2,y1,y2,color);		
		y1=y;
		x1=x;		
		i+=1;	
		}while(x<canvasdom.width/2);
	i=0
	do{
		x=i;
		y=eval(fstring);
		y2=y;
		x2=x;
		line(x1,x2,y1,y2,color);
		y1=y;
		x1=x;		
		i-=1;
	}while(x>-canvasdom.width/2);
}
function line(x1,x2,y1,y2,color){
	if(x1==0&&y1==0&&x2==0){return 0}
	c.beginPath();
	c.moveTo(convert(z*x1,'x'),convert(z*y1,'y'));
	c.lineTo(convert(z*x2,'x'),convert(z*y2,'y'));
	c.strokeStyle = color;
	c.stroke();
}
// function divider(y1,y2,fstring){
// 	if (Math.abs(y2)>canvasdom.height) {
// 		if(y2<0){
// 			y2=-canvasdom.height;
// 		}
// 		else{
// 			y2=canvasdom.height;
// 		}
// 	}
// 	let m,temp=y1;
// 	x-=10
// 	if(Math.abs(y1-y2)>2){				
// 		m=10/(Math.abs(y1-y2));
// 		while(temp<y2){
// 			console.log(m,'m');
// 			x=x/10;
// 			y=10*eval(fstring);
// 			x*=10
// 			c.fillRect(convert(x,'x'),convert(y,'y'),1,1);
// 			x+=m
// 		}
// 	}
// }
// function draw(fstring){
// 	let i=-canvasdom.width/2;
// 	for(;i<canvasdom.height/2;i++){
// 		x=i;
// 		y=eval('10*'+fstring);
// 		x=10*i;
// 		c.fillRect(convert(x,'x'),convert(y,'y'),1,1);
// 	}
// }
// function draw1(fstring){
// 	let i=0;
// 	let y1=0,y2=0;
// 	do{
// 		x=i;
// 		y=10*eval(fstring);
// 		x=10*i;
// 		i+=0.05;
// 		c.fillRect(convert(x,'x'),convert(y,'y'),1,1);
// 		y2=y;
// 		divider(y1,y2,fstring);
// 		y1=y;
// 	}while(x<canvasdom.width/2);
// 	i=0
// 	do{
// 		x=i;
// 		y=0.5*eval(fstring);
// 		x=10*i;
// 		c.fillRect(convert(x,'x'),convert(y,'y'),1,1);
// 		i-=0.05;
// 		console.log(2);
// 		divider(y1,y2,fstring);
// 		y1=y;
// 	}while(x>-canvasdom.width/2);
// }