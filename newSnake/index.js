/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 100;

  var BOARD_SIZE = $("#board").width();   // the height and width are equal
  var SQUARE_SIZE = $("#apple").width();  // the size of the apple is the same size as all squares
   var score1 =  0;
  

  var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
    }
    
  
  // Game Item Objects
   var positionX = 200; // the x-coordinate location for the box
   var speedX = 0;
   var positionY = 200; // the y-coordinate location for the box
   var speedY = 0; 

     var apple = {}
     apple.x = 100;
     apple.y = 100; 
     apple.$element = $("#apple");

     
var snake = [];
addNewSnakeToBoard();
// snake.push(makeSnake("#snake0"));

snake[0].x = 20;
snake[0].y = 20;

console.log(snake);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
   $(document).on('keydown', handleKeyDown);                         // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    doCollide();
    redrawGameItem();
    doCollideTwo();
    snakeCollide();
    // moveApple();
    
  }
  
  /* 
  Called in response to events.
  */
 function handleKeyDown(event) {
      if (event.which === KEY.LEFT) {
          speedX = -20;
          speedY = 0;
    console.log("left pressed");
    }

    else if (event.which === KEY.RIGHT) {
        speedX = 20;
        speedY = 0;
    console.log("right pressed");
  }
    else if (event.which === KEY.UP) {
        speedY = -20;
        speedX = 0;
    console.log("up pressed");
    }
    else if (event.which === KEY.DOWN) {
        speedY = 20;
        speedX = 0;
    console.log("down pressed");
    
    }


}
//board collisions
function doCollide(){
    if(positionX > 420){
        positionX = 420;
    }
    else if(positionX < 0){
        positionX = 0;
    }
    else if(positionY > 420){
         positionY = 420;
    }
     else if(positionY < 0){
        positionY = 0
    }
}
// apple collision
function doCollideTwo(){
    // moveApple();
    if(positionX === apple.x && positionY === apple.y){
        console.log(apple.y, positionY)
        addNewSnakeToBoard();
        return moveApple();
        console.log(score1 += 1);
       $('#score1').text(score1);
    }
}
//makeSnake
function addNewSnakeToBoard() {  
    // As the length of the balls array grows,
	// each newID will be unique.
	var newID = "snake" + snake.length;  // ==> "snake1", "snake2", "snake3"  
	
	// create a new HTML element and assign
	// the newID as an 'id' attribute
	$("<div>")
		.addClass("snake")
		.attr('id', newID)
        .appendTo("#board");
        
    
    // Create a new ball object using the Ball factory
	// function, using the newID. We need to 
	// prepend the "#" so that we can use it 
	// with jQuery like so: $(ball.id)
    var newSnake = makeSnake("#" + newID);
    snake.push(newSnake);
}
function makeSnake(id){
  var newPiece = {};
  newPiece.id = id;
  newPiece.width = $(".snake").width();        // sets width to 200
  newPiece.height = $(".snake").height();
  newPiece.x = snake.length-1;
  newPiece.y = snake.length-1;
  return newPiece;
}
//moveApple

function moveApple() {
  apple.x = randomInteger( BOARD_SIZE/SQUARE_SIZE ) * SQUARE_SIZE;
apple.y = randomInteger( BOARD_SIZE/SQUARE_SIZE ) * SQUARE_SIZE;
apple.$element.css("top", apple.y);
apple.$element.css("left", apple.x);
  for (var i = 0; i < snake.length; i++) {
		if ( doCollide(apple, snake[i]) ) {
			moveApple();
          break;
		}
    }

    function snakeCollide(){
        if(snake.y === newPiece.y || snake.x === newPiece.x ){
        endGame();
        if(doCollide){
        endGame();
        }
    }
    }
    
}



        

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function repositionGameItem() {
      for( var i = snake.length-1; i >= 1; i--){
          snake[i].x = snake[i-1].x;
          snake[i].y = snake[i-1].y;
         
      }

      positionX += speedX
      positionY += speedY
  }
  function redrawGameItem() {
      for( var i = snake.length-1; i >= 1; i--){
            $(snake[i].id).css("left", snake[i].x);
           $(snake[i].id).css("top", snake[i].y);
      }
    $("#snake").css("left", positionX);
    $("#snake").css("top", positionY);
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function randomInteger(max) {
    var randomInt = Math.floor(Math.random() * max);
    return randomInt;
}
  
  function factoryFunction(id) {
        var snake = {};
        snake.id = id
        snake.width = $(id).width();;
        snake.height = $(id).height();
        snake.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
        snake.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
        snake.speedX = 0
        snake.speedY = 0
        return snake;
    }
  
}
