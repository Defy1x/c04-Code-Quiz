// create variables here
var startBtn = document.getElementById("startBtn");
var highScoresBtn = document.getElementById("highScore");
var restartBtn = document.getElementById("restartGame");
var submitBtn = document.getElementById("submitBtn")
var backMainBtn = document.getElementById("backMain");
var welcomeText = document.getElementById("welcome-block");
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
var userNameInput;
var score = 0
var secondsLeft;
var questionNumber = -1;

// var submitScoreElement = document.querySelector("#submit-score");
// var userScoreElement = document.getElementById("user-score");
// var userNameInput;

var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["React", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which of the following is a Database?", ["SQL", "HTML", "JS", "All"], "SQL"),
    new Question("Which event occurs when the user clicks on an HTML element?", ["onclick", "onmouseclick", "onchange", "onmouseover"], "onclick")
];

//loads in new quiz questions and creates a new quiz
var quiz = new Quiz(questions);

// sets the timer
function startTimer() {
    setTimer();

}

//calls the timer and makes time start coundown and showscores once quiz is finished or time runs out
function setTimer() {
        secondsLeft = 60;
    var countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = " " + secondsLeft;
        if (secondsLeft <= 0 || questionNumber === questions.length) {
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

function showScores() {
    gameOverSection.style.display ="block";
    quizSection.style.display ="none";
    countdown.style.display ="none";
    result.textContent = " " + quiz.score + " out of 5 answers correct";
};

function addScore() {
    userNameInput = document.getElementById("initials").value
    leaderboard.style.display="block";
    gameOverSection.style.display ="none";

    // create a new object with name and score keys
    var newScore = {
        name: userNameInput,
        score: quiz.score
    };
    console.log(userNameInput);
    console.log(quiz.score);
    // check if there are scores in local storage first and take value
    //if not, make a blank array
    var quizScore = localStorage.getItem("quizScore")

    //New score bigger than previous
    if (quizScore) {
        var highScore = JSON.parse(quizScore).score;
        if (score < highScore) {
            return
        }
    }
    localStorage.setItem("quizScore", JSON.stringify(newScore));
}

//removes other sections from showing
function init(){
  welcomeSection.style.display ="block";
  welcomeText.style.display="block";
  quizSection.style.display ="none";
  gameOverSection.style.display ="none";
  leaderboard.style.display="none";
}

//function to start quiz and start timer
function startGame(){
  welcomeSection.style.display ="none";
  quizSection.style.display="block";
  populate();
  startTimer();
};

//function to viewleaderboard and hide everything else
function viewLeaderboard(){
  welcomeSection.style.display ="none";
  quizSection.style.display ="none";
  gameOverSection.style.display ="none";
  leaderboard.style.display="block";
  timerElement.style.display="none";
  welcomeText.style.display="none";
};

function reload(){
  location.reload();
}

//
startBtn.addEventListener("click", startGame);
highScoresBtn.addEventListener("click", viewLeaderboard);
restartBtn.addEventListener("click", reload);
backMainBtn.addEventListener("click",reload);
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addScore();
    var quizScore = JSON.parse(localStorage.getItem("quizScore"))
    highScoreTable.textContent = quizScore.name + " : " + quiz.score;
});

//load first page and hide other sections
init();

// //displays welcome text - add for leaderboard
// function welcomeText() {
//     var welcomeHTML = "<h2>Test your coding knowledge!</h2>";
//     welcomeHTML += "<p id='bodytext'> </p>";
//     welcomeHTML += "<button id='startBtn'>Start Game</button>";
//     var element = document.getElementById("quiz");
//     element.innerHTML = welcomeHTML;
//     test();
//     // populate();
// gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
// var element = document.getElementById("quiz");
// element.innerHTML = gameOverHTML;
// };
