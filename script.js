/* ---------
	DECLARE SHUFFLE FUNCTION
	-----------*/
//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* ----------------
	DECLARE VARIABLES
------------------*/

var questionList = shuffle(data);
var leo = shuffle(leoGifs);

var total = 0;
var timer = 20;


$(document).ready(function() {
	var currentQuestion = 0;
	var newQuestionList;

	/* ---------
	DECLARE DISPLAY FUNCTION
	-----------*/

	function displayQuestion(questionArray, currentQuestion) {
		$('input').val('');
		$('#question').text(questionArray[currentQuestion].question);	
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
		displayQuestion(questionList, currentQuestion);
		$('#question-row').show();
		$('#answer-row').show();
		$('img').attr('src', leo[0]);
		$('.img-wrapper').show(); //not working

		/* ---------
		START TIMER
		-----------*/

		setInterval(function() {
			timer--;
			
			if(timer >= 0) { 
				$('#timer').text('Time remaining: ' + timer); 
			}

			if (timer == 0) {
				//Clear stuff from screen to show scores
				$('#question').hide();
				$('#timer').hide();
				$('input').hide();
				
				//Show final score
				$('#over').text('Game over! You scored ' + total + ' points').show();
				$('img').attr('src', last);
				
				//If user wants to play again
				$('#again').show().on('click', function(){
					currentQuestion = 0;
					timer = 20;
					newQuestionList = shuffle(data);

					//Hide game over message
					$('#over').hide();

					//Hide wrong answer message
					$('#message').hide();

					//Hide 'Play again' button
					$('#again').hide();

					displayQuestion(newQuestionList, currentQuestion);
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
					$('img').attr('src', leo[Math.floor(Math.random()*items.length)]);

					//if more questions remain, display the next question
					if (currentQuestion < questionList.length) {
						displayQuestion(questionList, currentQuestion);
					} else {
						//Display score
						// $('#share-row').show();
						//$('.img-wrapper').show();
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