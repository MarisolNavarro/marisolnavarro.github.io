/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;

   var KEY = { 
  "W": 87,
  "S": 83,
  "UP": 38,
  "DOWN": 40,
}
  // Game Item Objects
   var positionX = 0; 
   var speedX = 0;
   var positionY = 0; 
   var speedY = 0; 
   var rightPositionX = 420
   var rightPositionY = 100
   var rightSpeedY = 0
   var rightSpeedX = 0
   var leftPositionX = 0
   var leftPositionY = 100
   var leftSpeedY = 0
   var leftSpeedX = 0
   var ball = factoryFunction("#ball");
   var leftPaddle = factoryFunction("#leftPaddle");
   var rightPaddle = factoryFunction("#rightPaddle");
   
   ball.speedX = Math.random() * 10 - 5;
   ball.speedY = Math.random() * 10 - 5;
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second) 
  $(document).on('keydown', handleKeyDown);    
  $(document).on('keydown', handleKeyDownTwo);
   $(document).on('keyup', handleKeyUp);    


  // change 'eventType' to the type of event you want to handle


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    doCollide(ball, leftPaddle);
    redrawGameItem();
    
  }
  
  /* 
  Called in response to events.
  */
    function handleKeyDown(event) {
        console.log("handleKeyDown")  
        if (event.which === KEY.UP) {   
            rightSpeedX -= 5;
            console.log("up pressed");
        }
        else if (event.which === KEY.DOWN) {
            rightSpeedX += 5;
            console.log("down pressed");

        }
    }
        function handleKeyDownTwo(event) {
      
            if (event.which === KEY.W) {
                speedY -= 5;
                console.log("up pressed");
            }
            else if (event.which === KEY.S) {
                speedY += 5;
                console.log("down pressed");

            }
        }

         function handleKeyUp(event) {
            if (event.which === KEY.W) {
                speedX = 0;
                console.log("up pressed");
            }

            else if (event.which === KEY.S) {
                speedX = 0;
            console.log("down pressed");
            }
            else if (event.which === KEY.UP) {
                speedY = 0;
            console.log("up pressed");
            }
            else if (event.which === KEY.DOWN) {
                speedY = 0;
            console.log("down pressed");
            
            } 
        }

            // ball collides board
        function doCollideBoard(){
            if(ball.x > 440){
                endGame();
            }
            else if(ball.x < 0){
               endGame();
            }
            else if(ball.y > 440){
                endGame();
            }
                else if(ball.y < 0){
                endGame();
            }
        }

        // paddles collide board
        function doCollidePaddles(){

        if(rightPaddle.positionY > 440){
         rightPaddle.positionY = 440;
    }
     else if(rightPaddle.positionY < 0){
        rightPaddle.positionY = 0
    }
}

        
            
           // ball collides paddles
        function doCollideTwo(){
            if(positionX === ball.x && positionY === ball.y){
                console.log(ball.y, positionY)
                
                // **make it return
            }  
        }

   
   function factoryFunction(id) {
        var obj = {};
        obj.id = id
        obj.width = $(id).width();;
        obj.height = $(id).height();
        obj.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
        obj.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
        obj.speedX = 0;
        obj.speedY = 0;
        return obj;
   }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    function repositionGameItem() {
      positionX += speedX
      positionY += speedY
      rightPositionY += rightSpeedX
      rightPositionX += rightSpeedY
      ball.x += ball.speedX
      ball.y += ball.speedY
    //   console.log(ball.x)
  }

    function moveBall(){
        if(handleKeyDown){
        
            ball.speedX = Math.random() * 10 - 5;
            ball.speedY = Math.random() * 10 - 5;
        }
        else if(handleKeyDownTwo){ 
            ball.speedX = Math.random() * 10 - 5;
            ball.speedY = Math.random() * 10 - 5;
        }
    }

    function redrawGameItem() {
        $("#rightPaddle").css("left", rightPositionX);
        $("#rightPaddle").css("top", rightPositionY);
        $("#leftPaddle").css("left", positionX);
        $("#leftPaddle").css("top", positionY);
        $("#ball").css("left",ball.x);
        $("#ball").css("top", ball.y);
        console.log(rightPositionY, rightPaddle.speedY)
    }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function doCollide(ball, leftPaddle) {
    // ball
        ball.leftX = ball.x;
        ball.topY = ball.y;
        ball.rightX = ball.x + $(ball.id).width();
        ball.bottomY = ball.y + $(ball.id).height();
        
        // board
        leftPaddle.leftX = leftPaddle.x;
        leftPaddle.topY = leftPaddle.y;
        leftPaddle.rightX = leftPaddle.x + $(leftPaddle.id).width();
        leftPaddle.bottomY = leftPaddle.y + $(leftPaddle.id).height();


        if ((ball.rightX > leftPaddle.leftX) && 
            (ball.leftX < leftPaddle.rightX) &&
            (ball.bottomY > leftPaddle.topY) &&
            (ball.topY < leftPaddle.bottomY)) {
            return true;
        }
        else {
            return false;
        }
    }

    function factoryFunction(id) {
        var ball = {};
        ball.id = id
        ball.width = $(id).width();;
        ball.height = $(id).height();
        ball.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
        ball.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
        ball.speedX = 1
        ball.speedY = 0
        return ball;
    }
  
}


