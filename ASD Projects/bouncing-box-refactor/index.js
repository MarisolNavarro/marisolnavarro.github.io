
		/* global $ */
		'use strict'
		$(document).ready(function(){
			//////////////////////////////////////////////////////////////////
			/////////////////// SETUP ///////////////////////////////
			//////////////////////////////////////////////////////////////////
            var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen

			// Every 50 milliseconds, call the update Function (see below)
			setInterval(update, 50);

			// Every time the box is clicked, call the handleBoxClick Function (see below)
			$('#box').on('click', handleBoxClick);

			var positionX = 0;
			var speedX = 10;
			var points = 0;
            
            //////////////////////////////////////////////////////////////////
			/////////////////// CORE LOGIC ///////////////////////////////
			//////////////////////////////////////////////////////////////////
            /* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
			function update() {
                speedUpdate()
                positionUpdate()

			}

			/* 
			This Function will be called each time the box is clicked. Each time it is called,
			it should increase the points total, increase the speed, and move the box to
			the left side of the screen.
			*/
			function handleBoxClick() {
                scorEs()
                speEds()
                resetBox()
			}
            //////////////////////////////////////////////////////////////////
			/////////////////// HELPER FUNCTIONS ///////////////////////////////
			//////////////////////////////////////////////////////////////////
            
			function scorEs(){
                points += 1;
				$('#box').text(points);
            }
            function speEds(){
                if (speedX >= 0) {
					speedX += 3;
				} 
				else if (speedX < 0) {
                    speedX -= 3;
                }
            }
            function resetBox(){
                positionX = 0;
            }

            function speedUpdate(){
                positionX += speedX;
				$('#box').css("left", positionX);

            }
            function positionUpdate(){
                if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
				}
            }


			


		}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE