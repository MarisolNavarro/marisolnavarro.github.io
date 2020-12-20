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
   var ball = factoryFunction("#ball");
   var leftPaddle = factoryFunction("#leftPaddle");
   var rightPaddle = factoryFunction("#rightPaddle");
   var boardWidth = $('div').width();
   var boardHeight = $('div').height();
   ball.speedX = Math.random() * 10 - 5;
   ball.speedY = Math.random() * 10 - 5;
   var score1 =  0;
   var score2 = 0;


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
    doCollideBoard();
    doCollidePaddles();
    doCollideTwo();
    doCollide3();
     scores();
    
  }
  
  /* 
  Called in response to events.
  */
    function handleKeyDown(event) {
        console.log("handleKeyDown")  
        if (event.which === KEY.UP) {   
            rightPaddle.speedY -= 5;
            console.log("up pressed");
        }
        else if (event.which === KEY.DOWN) {
            rightPaddle.speedY += 5;
            console.log("down pressed");

        }
    }
        function handleKeyDownTwo(event) {
      
            if (event.which === KEY.W) {
                leftPaddle.speedY -= 5;
                console.log("up pressed");
            }
            else if (event.which === KEY.S) {
                leftPaddle.speedY += 5;
                console.log("down pressed");

            }
        }

         function handleKeyUp(event) {
            if (event.which === KEY.W) {
                leftPaddle.speedY = 0;
                console.log("up pressed");
            }

            else if (event.which === KEY.S) {
                leftPaddle.speedY = 0;
            console.log("down pressed");
            }
            else if (event.which === KEY.UP) {
                rightPaddle.speedY = 0;
            console.log("up pressed");
            }
            else if (event.which === KEY.DOWN) {
                 rightPaddle.speedY = 0;
            console.log("down pressed");
            
            } 
        }

            // ball collides board
        function doCollideBoard(){
           if (ball.x > boardWidth){
               ball.speedX *= -1;
                console.log(score1 += 1);
               $('#score1').text(score1);
           }
           if(ball.x < 0){
              ball.speedX *= -1;
               console.log(score2 += 1);
               $('#score2').text(score2);
           }
           
           if (ball.y > boardHeight || ball.y < 0){
               ball.speedY *= -1;
           }

        }

        // paddles collide board
        function doCollidePaddles(){

            if(rightPaddle.y > boardHeight){
                rightPaddle.y = boardHeight;
            }
            else if(rightPaddle.y < 0){
                rightPaddle.y = 0
            }
            else if(leftPaddle.y > boardHeight){
                leftPaddle.y = boardHeight;
            }
            else if(leftPaddle.y < 0){
                leftPaddle.y = 0
            }
        }

        
            
           // ball collides paddles
        function doCollideTwo(){
            if(leftPaddle.y  < ball.y && leftPaddle.x  < ball.x ){
                ball.speedX *= -1;
                ball.speedY *= -1;
            }  
        }


        function doCollide3(){
          if(rightPaddle.y < ball.y && rightPaddle.x  < ball.x){
                ball.speedX *= -1;
                ball.speedY *= -1;
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
      leftPaddle.x += leftPaddle.speedX
      leftPaddle.y += leftPaddle.speedY
      rightPaddle.x += rightPaddle.speedX
      rightPaddle.y += rightPaddle.speedY
      ball.x += ball.speedX
      ball.y += ball.speedY
    //   console.log(ball.x)
  }

    function moveBall(){
        
            ball.speedX = Math.random() * 10 - 5;
            ball.speedY = Math.random() * 10 - 5;
        
    }


  function scores(){
      if( score1 === 10){
         endGame();
            }
     if(score2 === 10){
        endGame(); 
            }
        }


    function redrawGameItem() {
        $("#rightPaddle").css("left", rightPaddle.x);
        $("#rightPaddle").css("top", rightPaddle.y);
        $("#leftPaddle").css("left", leftPaddle.x);
        $("#leftPaddle").css("top", leftPaddle.y);
        $("#ball").css("left",ball.x);
        $("#ball").css("top", ball.y);
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
        ball.speedX = 0
        ball.speedY = 0
        return ball;
    }
  
}


