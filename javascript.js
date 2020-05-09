var c;
var ctx;
var ballx=50;
var ballspeedx=10;
var bally=50;
var ballspeedy=4;

var pl1score=0;
var pl2score=0;
const WINNING_SCORE = 3;

var show_winscr = false;

var paddle1y = 250;
var paddle2y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;


function calculateMousePos(evt){
    var rect = c.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };  
}
function handlemouseclick(evt){
    if(show_winscr){
        pl1score = 0;
        pl2score = 0;
        show_winscr = false;
        
    }
    
}

    window.onload=function(){    
    c=document.getElementById("mycanvas");
    ctx=c.getContext("2d");
        var fps = 30;
        setInterval(function(){
                    move();
                draw();
                    } , 1000/fps);
        c.addEventListener('mousedown', handlemouseclick);
        
        c.addEventListener('mousemove',function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1y = mousePos.y-(PADDLE_HEIGHT/2);
        });
     
    };
function ballReset(){
   if (pl1score >= WINNING_SCORE || pl2score >= WINNING_SCORE){    
       
       show_winscr = true;
   }
    ballspeedx= -ballspeedx;
    ballx = c.width/2;
    bally = c.height/2;
}
function computer_movement(){
    var paddle2ycentre = paddle2y+(PADDLE_HEIGHT/2);
    if(paddle2ycentre<bally-35){
        paddle2y = paddle2y+5;
    }
    else if(paddle2ycentre > bally+35){
        paddle2y = paddle2y-5;
    }
}
function move(){
    if(show_winscr){
        return;
    }
    computer_movement();
        
    ballx = ballx+ballspeedx;
    bally = bally+ballspeedy;
    
    if (ballx>c.width){
        if(bally > paddle2y && bally <paddle2y+PADDLE_HEIGHT){
            ballspeedx = -ballspeedx;
            var deltay = bally-(paddle2y+PADDLE_HEIGHT/2);
            ballspeedy = deltay * 0.35;
        }
        else{
            pl1score++;
            ballReset();      
        }
    }
    if (ballx<0){
        if(bally > paddle1y && bally <paddle1y+PADDLE_HEIGHT){
            ballspeedx = -ballspeedx;
            var deltay = bally-(paddle1y+PADDLE_HEIGHT/2);
            ballspeedy = deltay * 0.35;

        }
        else{
            pl2score++;
            ballReset();
           
        }
        
    }
   
    if (bally>c.height){
        ballspeedy= -ballspeedy;
    }
    if (bally<0){
        ballspeedy = -ballspeedy;
    }
}
function drawnet(){
    for(var i=0; i< c.height ; i+=40) {
        colorRect(c.width/2-1 ,i,2,20, "white");
    }
}


function draw(){ 
    
    colorRect(0 ,0,c.width,c.height, "black");
    if(show_winscr){
        ctx.fillStyle = 'white';
        
        if (pl1score >= WINNING_SCORE){
            ctx.fillText("Player 1 Won!", 350,200);
            
        }
           else if( pl2score >= WINNING_SCORE){  
                ctx.fillText("Computer Won!", 350,200);
       
   }
        //ctx.fillStyle = 'white';
        ctx.fillText("Click to continue", 350,250);
        return;
    }
     drawnet();
    colorRect(0,paddle1y,10,PADDLE_HEIGHT, "white");
    colorRect(c.width-PADDLE_THICKNESS,paddle2y,PADDLE_THICKNESS,PADDLE_HEIGHT, "white");

    colorCircle(ballx, bally ,10,"white");
    ctx.fillText(pl1score, 100,100);
    ctx.fillText(pl2score, c.width-100,100);
    
}
function colorRect(leftX ,topY,width,height, drawColor){
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX ,topY,width,height);
}
function colorCircle(centreX ,centreY,radius,drawColor){
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(centreX ,centreY,radius ,0,Math.PI*2,true);
    ctx.fill();
    
}