let correctAnswers = 0;
let wrongAnswers = 0;
let unanswered = 0;

let currentQuestion = 0;

let timer;
let secondsLeft;

let playerAnswer = "";
let correctAnswer = "";

const questions = [
  {
    question:
      "Essential oils are complex concentrated chemicals distilled from plants. What is another name for essential oils?",
    answers: {
      A: "Volatile Oils",
      B: "Plant Triglycerides",
      C: "Hydrosols",
      D: "Oil of Herbs"
    },
    answer: "A",
    explanation:
      "They are called volatile oils because they evaporate easily. Hydrosols are a direct product of the essential oil distillation process, an aromatic water."
  },
  {
    question:
      "Although there are documented records of 'Fine Oils and Choice Perfumes' in ancient cultures thousands of years B.C., the term 'Aromatherapy' was coined in 1928. By whom?",
    answers: {
      A: "Gattefosse",
      B: "Dr. Jean Valnet",
      C: "Cuthbert Hall",
      D: "Madame Marguerite Maury"
    },
    answer: "A",
    explanation:
      "Gattefosse was a French chemist who worked in his family's perfume business. In 1904 Cuthbert Hall was isolating active constituents of eucalyptus. Dr. Valnet published 'Aromatherapie' in 1964. Madame Maury studied the work of Valnet and applied it to her beauty therapy."
  },
  {
    question: "Essential oils are best taken internally.",
    answers: {
      A: "True",
      B: "False"
    },
    answer: "B",
    explanation:
      "Because they are so concentrated, they are likely to irritate mucous membranes and the stomach lining."
  },
  {
    question:
      "An incident which helped spark the rediscovery of essential oils involved an accident in which chemically burned hands were plunged into a bucket of liquid. The liquid was not water, but an essential oil that is extremely popular for treating burns. What oil is this?",
    answers: {
      A: "Peppermint",
      B: "Oregano",
      C: "Lemon",
      D: "Lavender"
    },
    answer: "D",
    explanation:
      'These burned hands belonged to the "Father of Aromatherapy", Rene-Maurice Gattefosse. Gattefosse sustained severe burns in a chemical fire and decided to test out the reputed pain-relieving properties of lavender oil on his burns. To his surprise and delight, Gattefosse found that the lavender oil not only relieved the pain but also aided the scarless and infectionless healing of his wounds!'
  },
  {
    question:
      "What do you call a device that breaks essential oils into micro particles, and disperses them in the air?",
    answers: {
      A: "Oil Extractor",
      B: "Humidifier",
      C: "Diffuser",
      D: "Emulsifier"
    },
    answer: "C",
    explanation:
      "A humidifier puts moisture in the air, an emulsifier breaks down fats, and an oil extractor is something I made up."
  },
  {
    question:
      "Aromatic molecules that interact with the top of the nasal cavity emit signals that are modified by various biological processes before traveling to the _________, the emotional switchboard of the brain.",
    answers: {
      A: "Limbic system",
      B: "Brain stem",
      C: "Cerebrum",
      D: "Reticular formation"
    },
    answer: "A",
    explanation:
      'According to G.H. Dodd. "Receptor Events in Perfumery." In: S.van Toller and G.H. Dodd, eds. Perfumery: The Psychology and Biology of Fragrance (London: Chapman and Hall, 1988)'
  },
  {
    question:
      "Unlike pharmaceuticals, which are usually targeted to affect one specific symptom, essential oils are said by some to be ________. This means that some consider them to have a normalizing effect by correcting whatever is wrong within the body. For examplesome say that essential oils can normalize both high and low blood pressure.",
    answers: {
      A: "adaptogenic",
      B: "carminative",
      C: "analgesic",
      D: "hemostatic"
    },
    answer: "A",
    explanation:
      "Adaptogenic property of essential cited on page one of following article: Chemical Composition of the Essential Oils of Two Rhodiola Species from Tibet - Y Lei, P Nan, T Tsering, Z Bai, C Tian, Y Zhong - Z Naturforsch 58c, 2003 - znaturforsch.com Page 1. Chemical Composition of the Essential Oils. Analgesic means pain reliever. Carminative stimulates the expulsion of gas from the gastrointestinal tract. Hemostatic stops bleeding."
  },
  {
    question:
      "One drop of essential oil often requires 1 ounce of plant to produce it. In fact, it takes more than 60,000 rose petals to produce 1 ounce of rose oil.",
    answers: {
      A: "True",
      B: "False"
    },
    answer: "A",
    explanation:
      "Quote from The One Earth Herbal Sourcebook by Alan Keith Tillotson, Ph.D., A.H.G., D.Ay."
  },
  {
    question:
      "Due to their strong antiviral properties, many essential oils are highly effective against which of the following?",
    answers: {
      A: "AIDS",
      B: "Dry skin",
      C: "Ingrown toenails",
      D: "The Herpes Simplex Virus"
    },
    answer: "D",
    explanation:
      'Lemon, geranium, eucalyptus, bergamot and rose oils have been reported to successfully dry lesions in a day or two and be in complete remission within 3 - 5 days if applied at first sign of outbreak. Scientific studies of essential oils on the Herpes Simplex Virus are cited by R.H. Wolbling and R. Milbradt. "Klinik und Therapie des Herpes Simplex." Therapiewoche 34 (1984), 1193-1200'
  },
  {
    question:
      "According to Dr. Kurt Schnaubelt, PH.D., much of the future of aromatherapy will be determined by which processes?",
    answers: {
      A: "Scientific",
      B: "Random",
      C: "Religious",
      D: "Political"
    },
    answer: "D",
    explanation:
      'The full quote is, "If aromatherapy was allowed to compete only on its merits, it would be a great competitor for a variety of aspects of conventional medicine. Much of the future of aromatherapy will be determined through political processes. The powers in place in the medical market will try to keep aromatherapy out, because it threatens profits to the conventional medical establishment. However, the demand of the consumer for more and better access to alternative methods will continue to offset such vested interests and should do much to make aromatherapy more popular as a healing modality."'
  }
];

function countdown() {
  secondsLeft = 15;

  const interval = setInterval(() => {
    $("#timeLeft").html(--secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(interval);
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

  $.each(questions[currentQuestion].answers, (key, value) => {
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
    nextQuestion();
    displayQuestion();
  }
}

function checkAnswer() {
  correctAnswer = questions[currentQuestion].answer;

  //   submitClicked = false;
  //   answerPicked = false;

  $("input").click(() => {
    playerAnswer = $("input[name=radios]:checked").val();
    console.log(`Player has answered ${playerAnswer}`);
    // answerPicked = true;
  });

  $("#submit").click(() => {
    console.log(`Player has clicked 'submit'.`);
    // submitClicked = true;
    isAnswerCorrect();
  });

  //   if (submitClicked && answerPicked && secondsLeft > 0) {
  //     isAnswerCorrect();
  //   } else if (secondsLeft === 0) {
  //     console.log("Player ran out of time!");
  //     unanswered++;
  //     nextQuestion();
  //   }
}

function nextQuestion() {
  currentQuestion++;
  setTimeout(displayQuestion, 15000);

  if (currentQuestion === questions.length) {
    endGame();
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
  clearInterval(showQuestion);
}

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
