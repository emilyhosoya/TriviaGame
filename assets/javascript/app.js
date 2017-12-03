//////////////////////
// GLOBAL VARIABLES //
//////////////////////

var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

var currentQuestion = 0;

var timer;
var secondsLeft;
var timerIsOn = false;

var playerAnswer = "";
var correctAnswer = "";

//////////////////////
///// FUNCTIONS /////
//////////////////////

function startTime() {
  timerIsOn = true;
}

function stopTime() {
  timerIsOn = false;
  clearTimeout(timer);
  clearInterval(timer);
}

function countdown() {
  startTime();
  secondsLeft = 15;

  // increment down from 15 seconds every 1 second
  timer = setInterval(function() {
    $("#timeLeft").html(--secondsLeft);

    if (secondsLeft <= 0) {
      stopTime();
      console.log("Player ran out of time!");
      unanswered++;
      nextQuestion();
      displayQuestion();
    }
  }, 1000);

  // display in DOM
  $("#timeLeft").html(15);
}

function updateScorecard() {
  // display scorecounts
  $("#currentQuestion").html(currentQuestion + 1);
  $("#correctCount").html(correctAnswers);
  $("#incorrectCount").html(wrongAnswers);
  $("#missedCount").html(unanswered);
}

function displayQuestion() {
  countdown();
  updateScorecard();

  // clear out previous question and answers
  $("#question").empty();
  $("#answers").empty();

  // display current question
  $("#question").html(questions[currentQuestion].question);
  console.log(
    `Question #${currentQuestion + 1}: ${questions[currentQuestion].question}`
  );

  // display answer choices
  $.each(questions[currentQuestion].answers, function(key, value) {
    $("#answers").append(`
    <div class="form-check">
        <label class="form-check-label">
            <input class="form-check-input" type="radio" name="radios" value="${
              key
            }">
      ${questions[currentQuestion].answers[key]}
        </label>
    </div>`);
  });
  console.log(`The correct answer is ${questions[currentQuestion].answer}`);

  checkAnswer();
}

function checkAnswer() {
  correctAnswer = questions[currentQuestion].answer;

  // get player's choice
  $("input").click(function() {
    playerAnswer = $("input[name=radios]:checked").val();
    console.log(`Player has selected ${playerAnswer}`);
  });

  // submit player's choice
  $("#submit").click(function() {
    console.log(`Player has clicked 'submit'.`);
    isAnswerCorrect();
  });
}

function isAnswerCorrect() {
  // if player is correct
  if (playerAnswer === correctAnswer) {
    console.log("Player has submitted the correct answer!");
    correctAnswers++;
    stopTime();

    // congrats message, times out in 3 seconds
    setTimeout(function() {
      stopTime();
      $("#answerArea").html(`<span id="congrats">You are correct!</span>`);
    }, 3000);
  } else {
    // else if player is wrong
    console.log("Player has submitted the wrong answer!");
    wrongAnswers++;
    stopTime();

    // sorry message, times out in 10 seconds
    setTimeout(function() {
      stopTime();
      $("#answerArea").html(
        `<span id="sorry">Answer: ${
          questions[currentQuestion].explanation
        }</span>`
      );
    }, 10000);
  }

  nextQuestion();
  displayQuestion();
}

function nextQuestion() {
  // if last question -- doesn't seem to be working b/c of timing issues
  if (currentQuestion === questions.length) {
    stopTime();
    endGame();
  } else {
    // move on to next question
    currentQuestion++;
    displayQuestion();
    // setTimeout(displayQuestion, 15000);
  }
}

function startGame() {
  // one-time starts game
  correctAnswers = 0;
  wrongAnswers = 0;
  unanswered = 0;

  currentQuestion = 0;

  $("#game").css("visibility", "visible");
  $("#instruction").css("display", "none");
  $("#nowPlaying").css("display", "block");
  //   showQuestion = setInterval(nextQuestion, 10000);
}

function endGame() {
  // game ends, player can play again
  $("#nowPlaying").css("display", "none");
  $("#gamePlay").html(
    '<div class="text-center"><h6>Good job. Play again?</h6><button class="btn btn-primary btn-lg" id="start">Start!</button></div>'
  );
  console.log("Game is over");
}

//////////////////////
//// MAIN PROCESS ////
//////////////////////

$("#start").click(startGame);

// class notes -- you can ignore:

// times out once - takes 2 arguments
// var onceTimeout = setTimeout(function() {
//   console.log("Alert #1");
// }, 1000);

// clearTimeout(onceTimeout);

// // sets interval timeout
// var intervalTimer = setInterval(function() {
//   console.log("Alert #1");
// }, 1000);

// setTimeout() will make 'this' the Window, so bind it!
// setTimeout(person.sayHi.bind(person), 50);
