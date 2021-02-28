// create variables here
var startBtn = document.getElementById("startBtn");
var highScoresBtn = document.getElementById("highScore");
var restartBtn = document.getElementById("restartGame");
var submitBtn = document.getElementById("submitBtn")
var backMainBtn = document.getElementById("backMain");
var welcomeText = document.getElementById("welcome-block");
var timerDisplay = document.getElementById("timer");
var formInput = document.getElementById("initials");
var highScoreLeaders = document.getElementById("highScoreTable");
var welcomeSection = document.getElementById("welcome");
var quizSection = document.getElementById("quiz");
var gameOverSection = document.getElementById("gameOver");
var leaderboardSection = document.getElementById("leaderboard");
var questionHead = document.getElementById("question");
var timerElement = document.getElementById("countdown");
var resultGame = document.getElementById("result");
var answerChoice = document.getElementById("answer");
var optionOne = document.getElementById("choice0")
var optionTwo = document.getElementById("choice1")
var optionThree = document.getElementById("choice2")
var optionFour = document.getElementById("choice3")
var answerBtn0 = document.querySelector("#btn0")
var answerBtn1 = document.querySelector("#btn1")
var answerBtn2 = document.querySelector("#btn2")
var answerBtn3 = document.querySelector("#btn3")
var quizScore = [];
var userNameInput;
var highScoresArray;
var score = 0;
var highScore = 0;
var secondsLeft;
var questionNumber = -1;
var secondsLeft = 0;

var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["React", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which of the following is a Database?", ["SQL", "HTML", "JS", "All"], "SQL"),
    new Question("Which event occurs when the user clicks on an HTML element?", ["onclick", "onmouseclick", "onchange", "onmouseover"], "onclick")
];

//loads in new quiz questions and creates a new quiz
var quiz = new Quiz(questions);

//calls the timer and makes time start coundown and showscores once quiz is finished or time runs out
function setTimer() {
        secondsLeft = 60;
    var countdown = setInterval(function () {
        timerElement.textContent = " " + secondsLeft;
        if (questionNumber < 4){
          secondsLeft--;
        }
        if (secondsLeft <=0 || questionNumber === quiz.questions.length) {
          clearInterval(countdown);
          setTimeout(showScores, 500);
        }
    }, 1000);
}

// quiz functionality begins and sets the score, loads questions and resets question index
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
};

//pulls in the question index
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
};

// checks the answer and displays answer is right or wrong and subtracts the time
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        showAnswerRight();
    }
    else {
      showAnswerWrong();
      secondsLeft -= 5;
    }
    questionNumber++;
    this.questionIndex++;
};

//ends the game
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
};

//pulls in parameters
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
};

//keeps track ofthe correct answer
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
};

//start the quiz
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

// on click event for buttons and shows next question
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

//function when answer is right
function showAnswerRight(){
  answer.textContent = "You got the right answer!"
};

//function when answer is wrong
function showAnswerWrong(){
  answer.textContent = "Sorry that's the wrong answer!"
}

//function that displays current area of question
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

//function to show the scores and end screen
function showScores() {
    gameOverSection.style.display ="block";
    quizSection.style.display ="none";
    countdown.style.display ="none";
    result.textContent = " " + quiz.score + " out of 5 correct";
};


function addScore() {
  // //gets the json file
  var quizScore = localStorage.getItem("quizScore");

    if (initials.value === ""){
    var anonymousAnimals = ["Aardvark", "Beaver", "Bunny", "Chinchilla", "Cat", "Giraffe", "Lion", "Moose", "Otter", "Porcupine", "Raccoon", "Squirrel", "Sheep", "Woodchuck", "Zebra"]
    userNameInput = "Happy " + anonymousAnimals[Math.floor(Math.random()*anonymousAnimals.length)];
  }
    else {
        userNameInput = document.getElementById("initials").value
    }

    console.log(userNameInput + " has been entered as users name");
    // create a new object with name and score keys
    var newScore = {
        name: userNameInput,
        score: quiz.score
    };
    console.log(newScore.name + " is the users name " + newScore.score + " is the new users score" )

    // quizScore.push(newScore);

    // //gets the json file
    var quizScore = localStorage.getItem("quizScore")


    // updates the file
    localStorage.setItem("quizScore", JSON.stringify(newScore));
    //pulls the new object
    var quizScore = JSON.parse(localStorage.getItem("quizScore"));

    console.log(quizScore);

    // calls the leaderboard functionality
    viewLeaderboard();
    //
};

// var liMaker = function(text) {
//     var quizScore= JSON.parse(localStorage.getItem("quizScore"));
//     var li = document.createElement("li");
//     li.textContent = quizScore.name + " : " + quizScore.score;
//     highScoreLeaders.appendChild(li);
//     console.log(quizScore.name + " is the users name " + quizScore.score + " is the score in the leaderboard view");
//     console.log("test");
// };

// function buildLeaderBoard(){
//   console.log("this is a test of build leaderboard functionality")
//   var data= JSON.parse(localStorage.getItem("quizScore"));
//
//   data.forEach(function(quizScore) {
//     liMaker(quizScore);
//   });
// }

// for (var i = 0; (i < 1); i++) {
//        highScoreTable.textContent = quizScore[i].name + " : " + quizScore[i].score;
//    }

//removes other sections from showing on init
function init(){
  welcomeSection.style.display ="block";
  welcomeText.style.display="block";
  quizSection.style.display ="none";
  gameOverSection.style.display ="none";
  leaderboard.style.display="none";
};

//function to start quiz and start timer
function startGame(){
  welcomeSection.style.display ="none";
  quizSection.style.display="block";
  populate();
  setTimer();
};

//function to viewleaderboard and hide everything else
function viewLeaderboard(){
  welcomeSection.style.display ="none";
  quizSection.style.display ="none";
  gameOverSection.style.display ="none";
  leaderboard.style.display="block";
  timerElement.style.display="none";
  welcomeText.style.display="block";
  highScoresBtn.style.display="none";
  timerDisplay.style.display="none";
  var leaders = JSON.parse(localStorage.getItem("quizScore"));
  if(leaders === null){
    highScoreTable.textContent = "There are no leaders yet, play some games! ";
    return;
  }
  else if (true) {
    highScoreTable.textContent = leaders.name + " : " + leaders.score;
  }

  console.log(leaders.name + " is the LEADERS name " + leaders.score + " is the score in the leaderboard view");

};

//reloads the webpage on save
function reload(){
  location.reload();
};

//resets the form and makes it empty
function resetForm() {
  document.getElementById("userForm").reset();
}

//add event listeners here
startBtn.addEventListener("click", startGame);
highScoresBtn.addEventListener("click", viewLeaderboard);
restartBtn.addEventListener("click", reload);
backMainBtn.addEventListener("click",reload);
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addScore();
    resetForm();
});

//load first page and hide other sections
init();
