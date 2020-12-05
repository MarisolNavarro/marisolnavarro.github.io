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

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second) 
  $(document).on('keydown', handleKeyDown);    

  // change 'eventType' to the type of event you want to handle


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    handleKeyDown(event);
    repositionGameItem();
    endGame();
    doCollide(ball, leftPaddle);
    factoryFunction(id);
    handleKeyDownTwo(event);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
        console.log("handleKeyDown")  
        if (event.which === KEY.UP) {   
            rightPaddle.Y = -5;
            console.log("up pressed");
        }
        else if (event.which === KEY.DOWN) {
            rightPaddle.speedY = 5;
            console.log("down pressed");

        }

        function handleKeyDownTwo(event) {
      
        if (event.which === KEY.W) {
            leftPaddle.y = -5;
            console.log("up pressed");
        }
        else if (event.which === KEY.S) {
            leftPaddle.y = 5;
            console.log("down pressed");

        }
        

    }   


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    function repositionGameItem() {
      positionX += speedX
      positionY += speedY
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
    leftPaddle.leftX = square2.x;
    leftPaddle.topY = square2.y;
    leftPaddle.rightX = square2.x + $(leftPaddle.id).width();
	leftPaddle.bottomY = square2.y + $(leftPaddle.id).height();


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
        ball.speedX = 0
        ball.speedY = 0
        return ball;
    }
  
}
