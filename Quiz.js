window.addEventListener("load", start, false);

var questionText = "Question {counter}: What is this planet?";
var scoreText = "Correct Answers: {correctAnswers} / 20";
var questionCounter = 1;
var correctAnswer = "";
var chosen;
var score = 0;
// Question bank
var quiz = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    correct: "Mercury",
  },
  {
    image:
      "https://mars.nasa.gov/system/content_pages/main_images/418_marsglobe.jpg",
    correct: "Mars",
  },
  {
    image: "https://i.ytimg.com/vi/PtkqwslbLY8/maxresdefault.jpg",
    correct: "Jupiter",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/14-Mysterious-Planets-Outside-Our-Solar-System-That-Boggle-The-Minds-Of-Scientists-5bbdcaf64b5bd__700.jpg",
    correct: "Wasp-17b",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/14-Mysterious-Planets-Outside-Our-Solar-System-That-Scientists-Are-Yet-To-Fully-Discover-5bbdb90019926__700.jpg",
    correct: "Tres-4b",
  },
  {
    image:
      "https://www.sciencealert.com/images/2020-09/processed/venus_topic_1024.jpg",
    correct: "Venus",
  },
  {
    image:
      "https://i.gadgets360cdn.com/large/earth_large_1598600383967.jpg?downsize=950:*",
    correct: "Earth",
  },
  {
    image:
      "https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/7cag82wak6jufxhv_1600498997.jpeg",
    correct: "Saturn",
  },
  {
    image: "https://happymag.tv/wp-content/uploads/2020/03/uranus.jpg",
    correct: "Uranus",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
    correct: "Neptune",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/1280px-Pluto_in_True_Color_-_High-Res.jpg",
    correct: "Pluto",
  },
  {
    image:
      "https://static.wikia.nocookie.net/space/images/c/cd/Gliese_581_c.png/revision/latest/scale-to-width-down/653?cb=20160614220324",
    correct: "Gliese 581c",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/Strangest-Exoplanets-Out-There-5bbca28a94343__700.jpg",
    correct: "Gj 1214b",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/Strangest-Exoplanets-Out-There-5bbc9ee5b5dfc__700.jpg",
    correct: "Gliese 436b",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/Strangest-Exoplanets-Out-There-5bbca1f44f817__700.jpg",
    correct: "5 55 Cancri E",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/Strangest-Exoplanets-Out-There-5bbcb1c226f3f__700.jpg",
    correct: "Hd 189733b",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/Strangest-Exoplanets-Out-There-5bbcb007a330b__700.jpg",
    correct: "Gj-504b",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/14-Mysterious-Planets-Outside-Our-Solar-System-That-Scientists-Are-Yet-To-Fully-Discover-5bbdbcd00af15__700.jpg",
    correct: "11 Kepler-10c",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/Strangest-Exoplanets-Out-There-5bbcab2faa08a__700.jpg",
    correct: "Ogle-2005-Blg-390lb",
  },
  {
    image:
      "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/Strangest-Exoplanets-Out-There-5bbca6e16bbf4__700.jpg",
    correct: "Kepler-438b",
  },
];

// register button event handler
function start() {
  document.getElementById("completed").style.display = "none";

  document
    .getElementById("choice1")
    .addEventListener("click", choiceSelected, false);
  document
    .getElementById("choice2")
    .addEventListener("click", choiceSelected, false);
  document
    .getElementById("choice3")
    .addEventListener("click", choiceSelected, false);
  document
    .getElementById("choice4")
    .addEventListener("click", choiceSelected, false);

  document
    .getElementById("checkAnswer")
    .addEventListener("click", checkAnswer, false);
  document
    .getElementById("next")
    .addEventListener("click", nextQuestion, false);

  quiz = shuffleArray(quiz);
  getQuestion();
} // end function start

function getRandomNumber(topValue) {
  return Math.floor(Math.random() * topValue);
}

function shuffleArray(array) {
  // While there is remain elements to shuffle...
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    // Pick a remaining element...
    let randomIndex = getRandomNumber(currentIndex + 1);
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function getQuestion() {
  document.getElementById("question").innerHTML = questionText.replace(
    "{counter}",
    questionCounter
  );
  document.getElementById("score").innerHTML = scoreText
    .replace("{correctAnswers}", score)
    .replace("20", quiz.length);
  var choices = [];
  clearChoicesHighlights();
  var question = quiz[questionCounter - 1];
  correctAnswer = question.correct;
  chosen = "";
  choices.push(correctAnswer);
  document.getElementById("picture").src = question.image;
  //Get choices from the reminder list.
  choices = getChoices(choices);
  //Shuffle
  choices = shuffleArray(choices);
  //Display choices.
  displayChoices(choices);
}

function getChoices(array) {
  for (var i = 1; i < 4; ++i) {
    var randomIndex = getRandomNumber(quiz.length);
    while (array.includes(quiz[randomIndex].correct)) {
      randomIndex = getRandomNumber(quiz.length);
    }
    array.push(quiz[randomIndex].correct);
  }
  return array;
}

function displayChoices(array) {
  for (let index = 0; index < array.length; index++) {
    document.getElementById("choice" + (index + 1).toString()).innerHTML =
      array[index];
  }
}

//Click choices button.
function choiceSelected(evt) {
  chosen = evt.target.innerText;
  highlightSelected(chosen);
}

//Click Check Answer button.
function checkAnswer(evt) {
  if (chosen === correctAnswer) {
    document.getElementById("score").innerHTML = scoreText.replace(
      "{correctAnswers}",
      ++score
    );
  }
  highlightAnswer(chosen);
}

//Click Next button.
function nextQuestion(evt) {
  if (questionCounter < quiz.length) {
    questionCounter++;
    console.log(questionCounter);

    getQuestion();
  }

  if (questionCounter === quiz.length) {
    document.getElementById("completed").style.display = "flex";
  }

  document.getElementById("next").disabled = questionCounter >= quiz.length;
}

function highlightSelected(chosen) {
  for (let index = 0; index < 4; index++) {
    const choice = document.getElementById("choice" + (index + 1).toString());
    choice.className = choice.innerText === chosen ? "selected" : "";
  }
}

function highlightAnswer(chosen) {
  for (let index = 0; index < 4; index++) {
    const choice = document.getElementById("choice" + (index + 1).toString());
    choice.className =
      choice.innerText === correctAnswer
        ? "correct"
        : choice.innerText === chosen
        ? "incorrect"
        : "";
  }
}

function clearChoicesHighlights() {
  for (let index = 0; index < 4; index++) {
    document.getElementById("choice" + (index + 1).toString()).className = "";
  }
}
