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

// separate timer into startTime, endTime to clear timer, runningTime to increment

function startTime() {
  timerIsOn = true;
}

function stopTime() {
  timerIsOn = false;
  clearTimeout(timer);
  clearInterval(timer);
}

function countdown() {
  // clearTimeout(timer);
  secondsLeft = 15;

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

  $("#timeLeft").html(15);
}

function updateScorecard() {
  $("#currentQuestion").html(currentQuestion + 1);
  $("#correctCount").html(correctAnswers);
  $("#incorrectCount").html(wrongAnswers);
  $("#missedCount").html(unanswered);
}

function displayQuestion() {
  countdown();
  updateScorecard();

  $("#question").empty();
  $("#answers").empty();
  $("#question").html(questions[currentQuestion].question);
  console.log(
    `Question #${currentQuestion + 1}: ${questions[currentQuestion].question}`
  );
  console.log(`The correct answer is ${questions[currentQuestion].answer}`);

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

  checkAnswer();
}

function isAnswerCorrect() {
  if (playerAnswer === correctAnswer) {
    console.log("Player has submitted the correct answer!");
    correctAnswers++;
    nextQuestion();
    displayQuestion();
  } else {
    console.log("Player has submitted the wrong answer!");
    wrongAnswers++;
    stopTime();
    showCorrect();
  }
}

function checkAnswer() {
  correctAnswer = questions[currentQuestion].answer;

  $("input").click(function() {
    playerAnswer = $("input[name=radios]:checked").val();
    console.log(`Player has answered ${playerAnswer}`);
  });

  $("#submit").click(function() {
    console.log(`Player has clicked 'submit'.`);
    isAnswerCorrect();
  });
}

function showCorrect() {
  setTimeout(function() {
    stopTime();
    $("#answerArea").html(`Answer: ${questions[currentQuestion].explanation}`);
  }, 10000);

  nextQuestion();
  displayQuestion();
}

function nextQuestion() {
  if (currentQuestion === questions.length) {
    stopTime();
    endGame();
  } else {
    currentQuestion++;
    displayQuestion();
    // setTimeout(displayQuestion, 15000);
  }
}

function startGame() {
  $("#game").css("visibility", "visible");
  $("#instruction").css("display", "none");
  $("#nowPlaying").css("display", "block");
  //   showQuestion = setInterval(nextQuestion, 10000);
  displayQuestion();
}

function endGame() {
  console.log("Game is over");
}

//////////////////////
//// MAIN PROCESS ////
//////////////////////

$("#start").click(startGame);

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
