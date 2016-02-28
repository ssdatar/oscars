var questionList = data;

var total = 0;
var timer = 20;

$(document).ready(function() {
	var currentQuestion = 0;

	/* ---------
	DECLARE DISPLAY FUNCTION
	-----------*/

	function displayQuestion(currentQuestion) {
		$('input').val('');
		$('#question').text(questionList[currentQuestion].question);	
	}
	/*------------*/

	//Hide game over message
	$('#over').hide();

	//Hide wrong answer message
	$('#message').hide();

	//Hide 'Play again' button
	$('#again').hide();

	// $('#question-row').hide();
	$('#answer-row').hide();

	$('#share-row').hide(); //not working

	$('#play').on('click', function() {
		$('#landing').hide();
		
		//Display first question
		displayQuestion(currentQuestion);
		$('#question-row').show();
		$('#answer-row').show();
		$('.img-wrapper').hide(); //not working

		/* ---------
		START TIMER
		-----------*/

		setInterval(function() {
			timer--;
			
			if(timer >= 0) { 
				$('#timer').text(timer); 
			}

			if (timer == 0) {
				//Clear stuff from screen to show scores
				$('#question').hide();
				$('#timer').hide();
				$('input').hide();
				
				//Show final score
				$('#over').text('Game over! You scored ' + total + ' points').show();
				
				//If user wants to play again
				$('#again').show().on('click', function(){
					currentQuestion = 0;
					timer = 20;

					//Hide game over message
					$('#over').hide();

					//Hide wrong answer message
					$('#message').hide();

					//Hide 'Play again' button
					$('#again').hide();

					displayQuestion(currentQuestion);
					$('#question').show();
					$('#timer').show();
					$('input').show();
				});
			}
		}, 1000);


		/*-------------------
		HANDLER FOR USER INPUT
		-------------------*/		

		$('input').on('keydown', function(e) {
			var userAnswer;		

			//when user presses enter
			if(e.which == 13) {
				//capture user input
				userAnswer = this.value.toLowerCase();

				//check if answer matches
				if (userAnswer === questionList[currentQuestion].answer.toLowerCase()) {
					currentQuestion += 1;
					total += 1;			//increase score
					timer += 10;		//add time

					//if more questions remain, display the next question
					if (currentQuestion < questionList.length) {
						displayQuestion(currentQuestion);
					} else {
						//Display score
						// $('#share-row').show();
						$('.img-wrapper').show();
						$('#over').text('Game over! You scored ' + total + ' points').show();

						//$('.img-wrapper').show(); //not working
						$("#twitter-button").attr("href", "https://twitter.com/intent/tweet?text=I got " 
							+ correct + " on the Oscar movie quiz!"); //not working
						$('#share-row').show();
						//$('.answer-container').append('<a class="twitter-share-button" href="#" id="twitter-button" data-size="large">Tweet</a>');						
					}
				} else { 
				// show user they are wrong.
					$('input').val('');						
					$('#message').show().delay(1200).hide();
				}
			}

		});
	});
});