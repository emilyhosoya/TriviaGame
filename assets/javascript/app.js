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
  clearInterval(timer);
}

function countdown() {
  stopTime();
  startTime();
  secondsLeft = 20;

  if (timerIsOn) {
    // if timer is on, increment down from 15 seconds every 1 second
    timer = setInterval(function() {
      $("#timeLeft").html(--secondsLeft);

      if (secondsLeft <= 0) {
        unanswered++;
        stopTime();
        console.log("Player ran out of time!");
        $("#answerArea").html(
          `<span id="sorry">Answer: ${
            questions[currentQuestion].explanation
          }</span>`
        );
        // display next question after 10 seconds
        setTimeout(function() {
          $("#answerArea").empty();
          nextQuestion();
        }, 15000);
      }
    }, 1000);
  } else {
    stopTime();
  }

  // display in DOM
  $("#timeLeft").html(20);
}

function updateScorecard() {
  // display scorecounts
  $("#currentQuestion").html(currentQuestion + 1);
  $("#correctCount").html(correctAnswers);
  $("#incorrectCount").html(wrongAnswers);
  $("#missedCount").html(unanswered);
}

function displayQuestion() {
  updateScorecard();
  countdown();

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
}

function isAnswerCorrect() {
  // if player is correct
  if (playerAnswer === correctAnswer) {
    console.log("Player has submitted the correct answer!");
    correctAnswers++;
    stopTime();
    $("#answerArea").html(`<span id="congrats">You are correct!</span>`);
    // display next question after 3 seconds
    setTimeout(function() {
      $("#answerArea").empty();
      nextQuestion();
    }, 3000);
  } else {
    // else if player is wrong
    console.log("Player has submitted the wrong answer!");
    wrongAnswers++;
    stopTime();
    $("#answerArea").html(
      `<span id="sorry">Answer: ${
        questions[currentQuestion].explanation
      }</span>`
    );
    // display next question after 10 seconds
    setTimeout(function() {
      $("#answerArea").empty();
      nextQuestion();
    }, 15000);
  }
}

function nextQuestion() {
  currentQuestion++;
  console.log(currentQuestion);

  if (currentQuestion === questions.length) {
    stopTime();
    endGame();
  } else {
    // move on to next question
    displayQuestion();
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
  displayQuestion();
}

function endGame() {
  // game ends, player can play again
  $("#nowPlaying").css("display", "none");
  $("#gamePlay").css("display", "none");
  $("#gameOver").html(
    '<div class="text-center"><h6>Good job. Play again?</h6><button class="btn btn-primary btn-lg" id="startAgain">Start!</button></div>'
  );
  console.log("Game is over");

  $("#startAgain").click(function() {
    startGame();
    $("#gameOver").empty();
    $("#gamePlay").css("display", "block");
  });
}

//////////////////////
//// MAIN PROCESS ////
//////////////////////

$(document).ready(function() {
  $("#start").click(startGame);

  // submit player's choice
  $("#submit").click(function() {
    console.log(`Player has clicked 'submit'.`);
    isAnswerCorrect();
  });
});

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
