var questionNumber = 1;
var answerNumber = 1;
var score = 0; 
var BestScore = 50;
var TimeRemaining = 60;
var finalCheck = 0;
var checkTimes = 1;

var MultipleChoice1BtnEl = document.getElementById('MultipleChoice1'); 
var MultipleChoice2BtnEl = document.getElementById('MultipleChoice2');
var MultipleChoice3BtnEl = document.getElementById('MultipleChoice3'); 
var MultipleChoice4BtnEl = document.getElementById('MultipleChoice4'); 

var SubmitEl = document.getElementById('Submit');
var mainEl = document.getElementById('main');
var TimeLeft = document.getElementById('TimeLeft');
var booleanvalue = document.getElementById('booleanvalue'); // Correct/Wrong for the answer
var Introduction = document.getElementById("Introduction"); // Display opening line from HTML
var Finalscore = document.getElementById("Finalscore"); // Display score from HTML
var Initial = document.getElementById("Initial"); // Enter initials from HTML
var Initialtext = document.getElementById("Initialtext"); // TextArea from HTML

var HallofFameBtnEl = document.getElementById('Hall-of-Fame'); // Hall of Fame Btn El
var BeginQuizBtnEl = document.getElementById('BeginQuiz'); // Begin the Quiz Btn El

// Default
MultipleChoice1BtnEl.style.display = 'none';
MultipleChoice2BtnEl.style.display = 'none';
MultipleChoice3BtnEl.style.display = 'none';
MultipleChoice4BtnEl.style.display = 'none';
SubmitEl.style.display = 'none';
booleanvalue.style.display='none';
Initialtext.style.display='none';

// Question objects
var questionsContents = { 
    questions: { 
        1 : "What does APIs stands for, when it comes to coding?",
        2 : "In APIs, what allow us to use JavaScript to interact with HTML?",
        3 : "We can handle click events by using the following keyword:",
        4 : "We can store data in the user's browser by using the following keyword:", 
        5 : "JavaScript Strings must be enclosed with:"
    }
};

// multiple choice by each Button
var answersContents = { 
    answers: { 
        1 : {
            1: "Atmospheric Pressure Ionization",
            2: "Academic Performance Index",
            3: "Application Programming Interface",
            4: "Advanced Primer Ignition"},
        2 : {
            1: "Cascading Style Sheets",
            2: "Document Object Model",
            3: "Python",
            4: "Bootstrap"},
        3 : {
            1: "addEventListener",
            2: "event.preventDefault",
            3: "event.stopPropagation", 
            4: "Console.log"},
        4 : {
            1: "Booleans",
            2: "querySelector",
            3: "getElement", 
            4: "localStorage"},      
        5 : {
            1: "Parentheses",
            2: "Quotes",
            3: "Curly brackets",
            4: "Exclamation mark"},  
    }
};

var correctanswer = {
    1: "Application Programming Interface",
    2: "Document Object Model",
    3: "addEventListener",
    4: "localStorage",
    5: "Parentheses",
}

// timer at default value
TimeLeft.textContent = TimeRemaining;

HallofFameBtnEl.addEventListener("click", function() { // see the best scores

    var Players = "";
    var substring ="";
    var HallofFame = "";

    for (var i=0; i < localStorage.length; i++) {
        var TotalScore = [];
        
        Players = localStorage.getItem(localStorage.key(i));
        substring = Players.substring(0,4) 
        if (substring == "quiz") {
            TotalScore = Players.split(",");
            var userName = TotalScore[0]
            HallofFame += "User " + userName.substring(4) + " high score is: " + TotalScore[1] + "\n";
       }
    }
    window.alert(HallofFame);

});

SubmitEl.addEventListener("click", function() { // Submit the best scores
    

    var LocalStorage = "quiz";
    var PlayersDetails = "";
    var value = [];
    
    //For loops to save in local storage for the best scores
    PlayersDetails = LocalStorage + Initialtext.value
    value = [PlayersDetails,BestScore]

    if (!localStorage.length) {
        localStorage.setItem("test","test");
    }
       
    for (var i=0; i < localStorage.length; i++){
        
        var checkPlayers = "";
        var TotalScore = [];

        // Assign value again
        PlayersDetails = LocalStorage + Initialtext.value;

        // Check if assigned value exist in the local storage
        checkPlayers = localStorage.getItem(PlayersDetails);
   
        if (checkPlayers == null) { // new user
            localStorage.setItem(PlayersDetails, value);
            window.alert(" Your score " + BestScore + " has been submitted! ")
            break;
        } else if (checkPlayers != null){
            TotalScore = checkPlayers.split(","); // Split since the object exist in local storage
        }  
              
        if (PlayersDetails == TotalScore[0] && BestScore == TotalScore[1]) {

        // add to the storage if the current BestScore is higher, 
        // else let the user know they already have the BestScore
            localStorage.setItem(PlayersDetails, value);
            window.alert(BestScore + " "+ " is the latest score by " + Initialtext.value + ". BestScore does not change. ")
            break; 
        } else if (Initialtext.value == "") {
            window.alert(" Please enter the initial ");
            break;
        } else if (PlayersDetails == TotalScore[0] && BestScore > TotalScore[1] ) { 
            // Current > Previous BestScore
            localStorage.setItem(PlayersDetails, value);
            window.alert(" The New BestScore of " + BestScore + " has been submitted!.\n Your previous score was " + TotalScore[1])
            break; 
        } else if (PlayersDetails == TotalScore[0] && BestScore < TotalScore[1] ) { 
            // Current < Previous BestScore
            localStorage.setItem(PlayersDetails, value);
            window.alert(" Your previous BestScore of " + TotalScore[1] + " was higher. BestScore does not change.");
            break; 

        } else { // New entry all together
            localStorage.setItem(PlayersDetails, value);
            window.alert(" Your score of " + BestScore + " has been submitted! ")
            break;
        }
                
    }
    
} );


MultipleChoice1BtnEl.addEventListener("click", function() {
    booleanvalue.style.display='none';
});
MultipleChoice2BtnEl.addEventListener("click", function() {
    booleanvalue.style.display='none';
});
MultipleChoice3BtnEl.addEventListener("click", function() {
    booleanvalue.style.display='none';
});
MultipleChoice4BtnEl.addEventListener("click", function() {
    booleanvalue.style.display='none';
});

SubmitEl.addEventListener("click", function() {
    booleanvalue.style.display='none';
});

BeginQuizBtnEl.addEventListener("click", function() {
    BeginQuizBtnEl.style.display = 'none';
    Introduction.style.display='none';
    Finalscore.style.display = 'none';
    Initial.style.display='none';
    score = 0;
    TimeRemaining = 60;
    TimeLeft.textContent = TimeRemaining;
    finalCheck = 0;
    checkTimes = 1; 
    
    
    var timeInterval = setInterval(function() {

        if (score === 1){ 
            BestScore -= 10;
        }

        score = 0;         

        if(TimeRemaining >= 1 && finalCheck !== 1) {
            Introduction.textContent = questionsContents.questions[questionNumber];

            Introduction.style.display= ""; // Allow questions button to appear
            MultipleChoice1BtnEl.style.display = ""; // Allow answer buttons to appear
            MultipleChoice2BtnEl.style.display = ""; // Allow answer buttons to appear
            MultipleChoice3BtnEl.style.display = ""; // Allow answer buttons to appear
            MultipleChoice4BtnEl.style.display = ""; // Allow answer buttons to appear
            
        if (answerNumber === 6) { 
            // code for game over
            MultipleChoice1BtnEl.style.display = 'none'; // Allow answer buttons to appear
            MultipleChoice2BtnEl.style.display = 'none'; // Allow answer buttons to appear
            MultipleChoice3BtnEl.style.display = 'none'; // Allow answer buttons to appear
            MultipleChoice4BtnEl.style.display = 'none'; // Allow answer buttons to appear
            booleanvalue.style.display='none';
            BeginQuizBtnEl.style.display = 'none';
            Introduction.textContent = "You have finished the quiz!";
            Finalscore.style.display = ""; // Allow display for final score
            Initial.style.display = ""; // Display Message Enter initials
            Initialtext.style.display="";  // Capture user score once submitted is clicked.
            finalCheck = 1;
            lastQuestionWrong();
            Finalscore.textContent = "Your final score is: " + BestScore; // Assign the latest high score.
            Initial.textContent = "Enter initials:"
            SubmitEl.style.display = "";
            SubmitEl.textContent = "Submit";      
            clearInterval(timeInterval);  
            return BestScore;
        }   
           
            MultipleChoice1BtnEl.textContent = answersContents.answers[answerNumber][1];
            MultipleChoice2BtnEl.textContent = answersContents.answers[answerNumber][2];
            MultipleChoice3BtnEl.textContent = answersContents.answers[answerNumber][3];
            MultipleChoice4BtnEl.textContent = answersContents.answers[answerNumber][4];
           
            maintemplate.appendChild(Introduction);
            maintemplate.appendChild(MultipleChoice1BtnEl);
            maintemplate.appendChild(Finalscore);
            TimeRemaining -= 1;
            TimeLeft.textContent = TimeRemaining;

            MultipleChoice1BtnEl.addEventListener("click", function() {

                if (questionNumber == 4 && MultipleChoice1BtnEl.textContent === "addEventListener") {
                    console.log("Correct");
                    //questionNumber = 4;
                    answerNumber = 3;
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);
                }

                else if (questionNumber == 3 && MultipleChoice1BtnEl.textContent === "Parentheses") {
                    console.log("Correct");
                    booleanvalue.style.display=""; // Enables text content on correct and wrong answers
                    booleanvalue.textContent = "Correct!"
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);
                    //questionNumber = 3; 
                    answerNumber = 2; 
                }

                else {
                    //Assign wrong values based incorrect answers.
                    switch(MultipleChoice1BtnEl.textContent) {
                        case "Atmospheric Pressure Ionization":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1;
                            questionNumber = 1;
                            answerNumber = 1;
                            break;
                        case "Cascading Style Sheets":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1;
                            questionNumber = 2; 
                            answerNumber = 4;
                            break;
                        case "Booleans":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 0; // indicating the last question
                            answerNumber = 0; // Last answer
                            console.log("I'm here" + timeInterval);
                            MultipleChoice1BtnEl.style.display = 'none';
                            MultipleChoice2BtnEl.style.display = 'none';
                            MultipleChoice3BtnEl.style.display = 'none';
                            MultipleChoice4BtnEl.style.display = 'none';
                            booleanvalue.style.display='none';
                            BeginQuizBtnEl.style.display = 'none';
                            Introduction.textContent = "You have finished the quiz!";
                            Finalscore.style.display = ""; // Display final score
                            Initial.style.display = ""; // Display text box for enter initials
                            Initialtext.style.display="";  // save score once "submit" is clicked.
                            finalCheck = 1;
                            lastQuestionWrong();
                            Finalscore.textContent = "Your final score is: " + BestScore; // showing the high score
                            Initial.textContent = "Enter initials:"
                            SubmitEl.style.display = "";
                            SubmitEl.textContent = "Submit";      
                            clearInterval(timeInterval);  
                            break;
                        default: console.log ("notfound");
                    }
                }
                questionNumber ++
                answerNumber ++
            });

            MultipleChoice2BtnEl.addEventListener("click", function() {

                if (questionNumber == 2 && MultipleChoice2BtnEl.textContent === "Document Object Model") {
                    console.log("Correct");
                    //questionNumber = 2; 
                    answerNumber = 4;
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);                
                } 

                else {
                    switch(MultipleChoice2BtnEl.textContent) {
                        case "Academic Performance Index":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1;
                            questionNumber = 1;
                            answerNumber = 1;
                            break;
                        case "event.preventDefault":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 4;
                            answerNumber = 3;
                            console.log(score);
                            break;
                        case "querySelector":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 0; // indicating the last question
                            answerNumber = 0; // Last answer
                            console.log("I'm here" + timeInterval);
                            MultipleChoice1BtnEl.style.display = 'none';
                            MultipleChoice2BtnEl.style.display = 'none';
                            MultipleChoice3BtnEl.style.display = 'none';
                            MultipleChoice4BtnEl.style.display = 'none';
                            booleanvalue.style.display='none';
                            BeginQuizBtnEl.style.display = 'none';
                            Introduction.textContent = "You have finished the quiz!";
                            Finalscore.style.display = ""; // Display final score
                            Initial.style.display = ""; // Display text box for enter initials
                            Initialtext.style.display="";  // save score once "submit" is clicked.
                            finalCheck = 1;
                            lastQuestionWrong();
                            Finalscore.textContent = "Your final score is: " + BestScore; // showing the high score
                            Initial.textContent = "Enter initials:"
                            SubmitEl.style.display = "";
                            SubmitEl.textContent = "Submit";      
                            clearInterval(timeInterval);    
                            break;
                        case "Quotes":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2; 
                            break;
                        default: console.log ("notfound");
           
                    }
                 }
                 questionNumber ++
                 answerNumber ++

            });

            MultipleChoice3BtnEl.addEventListener("click", function() {

                if (questionNumber == 1 && MultipleChoice3BtnEl.textContent === "Application Programming Interface") {
                    console.log("Correct");
                    //questionNumber = 1;
                    answerNumber = 1;
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);

                }

                else {

                    switch(MultipleChoice3BtnEl.textContent) {
                        case "Python":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1;
                            questionNumber = 2; 
                            answerNumber = 4;
                            break;
                        case "event.stopPropagation":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1;
                            questionNumber = 4;
                            answerNumber = 3;
                            break;
                        case "getElement":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1;
                            questionNumber = 0; // indicating the last question
                            answerNumber = 0; // Last answer
                            console.log("I'm here" + timeInterval);
                            MultipleChoice1BtnEl.style.display = 'none';
                            MultipleChoice2BtnEl.style.display = 'none';
                            MultipleChoice3BtnEl.style.display = 'none';
                            MultipleChoice4BtnEl.style.display = 'none';
                            booleanvalue.style.display='none';
                            BeginQuizBtnEl.style.display = 'none';
                            Introduction.textContent = "You have finished the quiz!";
                            Finalscore.style.display = ""; // Display final score
                            Initial.style.display = ""; // Display text box for enter initials
                            Initialtext.style.display="";  // save score once "submit" is clicked.
                            finalCheck = 1;
                            lastQuestionWrong();
                            Finalscore.textContent = "Your final score is: " + BestScore; // showing the high score
                            Initial.textContent = "Enter initials:"
                            SubmitEl.style.display = "";
                            SubmitEl.textContent = "Submit";      
                            clearInterval(timeInterval);     
                            break;                            
                        case "Curly brackets":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1;
                            questionNumber = 3; 
                            answerNumber = 2;          
                            break;       
                        default: console.log ("notfound");      
                    }

                }
                questionNumber ++
                answerNumber ++
            });

            MultipleChoice4BtnEl.addEventListener("click", function() {

                if (questionNumber == 0 && MultipleChoice4BtnEl.textContent === "localStorage") {
                    console.log("Correct");
                    //questionNumber = 0; indicating the last question
                    answerNumber = 0; // Last answer
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);
                    console.log("I'm here" + timeInterval);
                    MultipleChoice1BtnEl.style.display = 'none';
                    MultipleChoice2BtnEl.style.display = 'none';
                    MultipleChoice3BtnEl.style.display = 'none';
                    MultipleChoice4BtnEl.style.display = 'none';
                    booleanvalue.style.display='none';
                    BeginQuizBtnEl.style.display = 'none';
                    Introduction.textContent = "You have finished the quiz!";
                    Finalscore.style.display = ""; // Display final score
                    Initial.style.display = ""; // Display text box for enter initials
                    Initialtext.style.display="";  // save score once "submit" is clicked.
                    finalCheck = 1;
                    lastQuestionWrong();
                    Finalscore.textContent = "Your final score is: " + BestScore; // showing the high score
                    Initial.textContent = "Enter initials:"
                    SubmitEl.style.display = "";
                    SubmitEl.textContent = "Submit";      
                    clearInterval(timeInterval);

                } else {

                    switch(MultipleChoice4BtnEl.textContent) {
                        case "Advanced Primer Ignition":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 1;
                            answerNumber = 1;
                            break;
                        case "Bootstrap":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 2; 
                            answerNumber = 4;
                            break;
                        case "Console.log":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 4;
                            answerNumber = 3;
                            break;
                        case "Exclamation mark":
                            console.log("Inside the case now");
                            booleanvalue.style.display="";
                            booleanvalue.textContent = "Wrong!";
                            booleanvalue.style.borderTop = "solid #663399";
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2; 
                            break;       
                        default: console.log ("notfound");     
                    }

                }
                questionNumber ++
                answerNumber ++ 
            });

        }
        else if(TimeRemaining === 0){

            console.log("I'm here" + timeInterval);
            questionNumber = 0; // reset
            answerNumber = 0; // reset
            MultipleChoice1BtnEl.style.display = 'none';
            MultipleChoice2BtnEl.style.display = 'none';
            MultipleChoice3BtnEl.style.display = 'none';
            MultipleChoice4BtnEl.style.display = 'none';
            booleanvalue.style.display='none';
            Introduction.textContent = "Game Over! Challenge again by \"Begin the Quiz\"";
            BeginQuizBtnEl.style.display = "";
            clearInterval(timeInterval);
        }
      }, 1000)

});

function lastQuestionWrong () {
        if (finalCheck === 1 && checkTimes === 1) {
        BestScore -= 10;
        checkTimes = 2;
        return BestScore
    }

  }