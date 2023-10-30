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

// Do not display anything that is not ready to be displayed
MultipleChoice1BtnEl.style.display = 'none';
MultipleChoice2BtnEl.style.display = 'none';
MultipleChoice3BtnEl.style.display = 'none';
MultipleChoice4BtnEl.style.display = 'none';
SubmitEl.style.display = 'none';
booleanvalue.style.display='none';
Initialtext.style.display='none';

// Question objects
var questionsContents = { 
    correct: { 
        1 : "What does APIs stands for, when it comes to coding?",
        2 : "In APIs, what allow us to use JavaScript to interact with HTML?",
        3 : "We can store data in the user's browser by using the following keyword:", 
        4 : "JavaScript Strings must be enclosed with:"
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
            1: "Booleans",
            2: "querySelector",
            3: "getElement", 
            4: "localStorage"},      
        4 : {
            1: "Parentheses",
            2: "Quotes",
            3: "Curly brackets",
            4: "Exclamation mark"},  
    }
};

var correctanswer = {
    1: "Application Programming Interface",
    2: "Document Object Model",
    3: "localStorage",
    4: "Parentheses",
}

//Initialize the display timer at default value
TimeLeft.textContent = TimeRemaining;

HallofFameBtnEl.addEventListener("click", function() { // View high scores

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

SubmitEl.addEventListener("click", function() { // Submit high scores
    

    var LocalStorage = "quiz";
    var PlayersDetails = "";
    var value = [];
    
    //For loops to save in local storage for high scores
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
            window.alert("Your score of " + BestScore + " has been submitted!")
            break;
        } else if (checkPlayers != null){
            TotalScore = checkPlayers.split(","); // Split since the object exist in local storage
        }  
              
        if (PlayersDetails == TotalScore[0] && BestScore == TotalScore[1]) {

        // Only insert if the current highScore is higher, 
        // otherwise let the user know they had a higher score already
            localStorage.setItem(PlayersDetails, value);
            window.alert(BestScore + " "+ "is the latest entry for user initial" + Initialtext.value + ".Entry will not be added.")
            break; 
        } else if (Initialtext.value == "") {
            window.alert("Please enter an initial");
            break;
        } else if (PlayersDetails == TotalScore[0] && BestScore > TotalScore[1] ) { 
            // New high score submitted!
            localStorage.setItem(PlayersDetails, value);
            window.alert("New high score of" + BestScore + "has been submitted!.\n Your previous score was" + TotalScore[1])
            break; 
        } else if (PlayersDetails == TotalScore[0] && BestScore < TotalScore[1] ) { 
            // Your previous code was higher!
            localStorage.setItem(PlayersDetails, value);
            window.alert("Your previous code of " + TotalScore[1] + " was higher. Entry will not be added.");
            break; 

        } else { // New entry all together
            localStorage.setItem(PlayersDetails, value);
            window.alert("Your score of " + BestScore + " has been submitted!")
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
    finalCheck = 0; // Check if last question and wrong.
    checkTimes = 1; // Check timer for function patch.
    
    
    var timeInterval = setInterval(function() {

        if (score === 1){ 
            BestScore -= 10;
        }

        score = 0;         

        if(TimeRemaining >= 1 && finalCheck !== 1) {
            Introduction.textContent = questionsContents.correct[questionNumber];

            Introduction.style.display= ""; // Allow questions button to appear
            MultipleChoice1BtnEl.style.display = ""; // Allow answer buttons to appear
            MultipleChoice2BtnEl.style.display = "";
            MultipleChoice3BtnEl.style.display = "";
            MultipleChoice4BtnEl.style.display = "";
            
        if (answerNumber === 6) { 
            // code for game over
            MultipleChoice1BtnEl.style.display = 'none';
            MultipleChoice2BtnEl.style.display = 'none';
            MultipleChoice3BtnEl.style.display = 'none';
            MultipleChoice4BtnEl.style.display = 'none';
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

            MultipleChoice1BtnEl.addEventListener("click", function(event) {
                if (event.target.textContent === correctanswer[questionNumber]) {
                    // code for correct answer
                    console.log("Correct");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);
                } 
                else {
                    // code for wrong answer
                    console.log("Inside the case now");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Wrong!";
                    booleanvalue.style.borderTop = "solid #663399";
                    score = 1;
                }
                questionNumber ++
                answerNumber ++
             })

             MultipleChoice2BtnEl.addEventListener("click", function(event) {
                if (event.target.textContent === correctanswer[questionNumber]) {
                    // code for correct answer
                    console.log("Correct");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);
                } 
                else {
                    // code for wrong answer
                    console.log("Inside the case now");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Wrong!";
                    booleanvalue.style.borderTop = "solid #663399";
                    score = 1;
                }
                questionNumber ++
                answerNumber ++
             })

             MultipleChoice3BtnEl.addEventListener("click", function(event) {
                if (event.target.textContent === correctanswer[questionNumber]) {
                    // code for correct answer
                    console.log("Correct");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);
                } 
                else {
                    // code for wrong answer
                    console.log("Wrong");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Wrong!";
                    booleanvalue.style.borderTop = "solid #663399";
                    score = 1;
                }
                questionNumber ++
                answerNumber ++
             })

             MultipleChoice4BtnEl.addEventListener("click", function(event) {
                if (event.target.textContent === correctanswer[questionNumber]) {
                    // code for correct answer
                    console.log("Correct");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Correct!";
                    booleanvalue.style.borderTop = "solid #663399";
                    booleantemplate.appendChild(booleanvalue);
                } 
                else {
                    // code for wrong answer
                    console.log("Inside the case now");
                    booleanvalue.style.display="";
                    booleanvalue.textContent = "Wrong!";
                    booleanvalue.style.borderTop = "solid #663399";
                    score = 1;
                }
                questionNumber ++
                answerNumber ++
             })

            // MultipleChoice1BtnEl.addEventListener("click", function() {

            //     if (questionNumber ==4 && MultipleChoice1BtnEl.textContent === "Parentheses") {
            //         booleanvalue.style.display=""; // Enables text content on correct and wrong answers
            //         booleanvalue.textContent = "Correct!"
            //         booleanvalue.style.borderTop = "solid #663399";
            //         booleantemplate.appendChild(booleanvalue);
            //         MultipleChoice1BtnEl.style.display = 'none';
            //         MultipleChoice2BtnEl.style.display = 'none';
            //         MultipleChoice3BtnEl.style.display = 'none';
            //         MultipleChoice4BtnEl.style.display = 'none';
            //         booleanvalue.style.display='none';
            //         BeginQuizBtnEl.style.display = 'none';
            //         Introduction.textContent = "You have finished the quiz!";
            //         Finalscore.style.display = ""; // Allow display for final score
            //         Initial.style.display = ""; // Display Message Enter initials
            //         Initialtext.style.display="";  // Capture user score once submitted is clicked.
            //         finalCheck = 1;
                  
            //         lastQuestionWrong();
            //         Finalscore.textContent = "Your final score is: " + BestScore; // Assign the latest high score.
            //         Initial.textContent = "Enter initials:"
            //         SubmitEl.style.display = "";
            //         SubmitEl.textContent = "Submit";      
            //         clearInterval(timeInterval);  
            //     }
                     
            //     else {
            //         //Assign wrong values based incorrect answers.
            //         switch(MultipleChoice1BtnEl.textContent) {
            //             case "Atmospheric Pressure Ionization":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1;
            //                 // questionNumber = 1;
            //                 // answerNumber = 1;
            //                 break;
            //             case "Cascading Style Sheets":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1;
            //                 // questionNumber = 2; 
            //                 // answerNumber = 1;
            //                 break;
            //             case "Booleans":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1; 
            //                 // questionNumber = 3; 
            //                 // answerNumber = 1;
            //                 clearInterval(timeInterval);
            //                 break;
            //             default: console.log ("notfound");
            //         }
            //     }
            //     questionNumber ++
            //     answerNumber ++
            // });

            // MultipleChoice2BtnEl.addEventListener("click", function() {

            //     if (questionNumber ==2 && MultipleChoice2BtnEl.textContent === "Document Object Model") {
            //         // questionNumber = 2;
            //         // answerNumber = 2;
            //         booleanvalue.style.display="";
            //         booleanvalue.textContent = "Correct!";
            //         booleanvalue.style.borderTop = "solid #663399";
            //         booleantemplate.appendChild(booleanvalue);      
            //     } 
                
            //     else {
            //         switch(MultipleChoice2BtnEl.textContent) {
            //             case "Academic Performance Index":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1;
            //                 // questionNumber = 1;
            //                 // answerNumber = 2;
            //                 break;
            //             case "querySelector":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1; 
            //                 // questionNumber = 3; 
            //                 // answerNumber = 2;
            //                 break;
            //             case "Quotes":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1; 
            //                 // questionNumber = 4;
            //                 // answerNumber = 2;
            //                 MultipleChoice1BtnEl.style.display = 'none';
            //                 MultipleChoice2BtnEl.style.display = 'none';
            //                 MultipleChoice3BtnEl.style.display = 'none';
            //                 MultipleChoice4BtnEl.style.display = 'none';
            //                 booleanvalue.style.display='none';
            //                 BeginQuizBtnEl.style.display = 'none';
            //                 Introduction.textContent = "You have finished the quiz!";
            //                 Finalscore.style.display = ""; // Allow display for final score
            //                 Initial.style.display = ""; // Display Message Enter initials
            //                 Initialtext.style.display="";  // Capture user score once submitted is clicked.
            //                 finalCheck = 1;
            //                 lastQuestionWrong();
            //                 Finalscore.textContent = "Your final score is: " + BestScore; // Assign the latest high score.
            //                 Initial.textContent = "Enter initials:"
            //                 SubmitEl.style.display = "";
            //                 SubmitEl.textContent = "Submit";      
            //                 clearInterval(timeInterval);     
            //                 break;      
            //             default: console.log ("notfound");     
            //         }
            //      }
            //      questionNumber ++
            //      answerNumber ++

            // });

            // MultipleChoice3BtnEl.addEventListener("click", function() {

            //     if (questionNumber ==1 && MultipleChoice3BtnEl.textContent === "Application Programming Interface") {
            //         // questionNumber = 1;
            //         // answerNumber = 3;
            //         booleanvalue.style.display="";
            //         booleanvalue.textContent = "Correct!";
            //         booleanvalue.style.borderTop = "solid #663399";
            //         booleantemplate.appendChild(booleanvalue);                    
            //     }
                
            //     else {

            //         switch(MultipleChoice3BtnEl.textContent) {
            //             case "Python":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1;
            //                 // questionNumber = 2;
            //                 // answerNumber = 3;
            //                 break;
            //             case "getElement":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1;
            //                 // questionNumber = 3;
            //                 // answerNumber = 3;
            //                 break;                            
            //             case "Curly brackets":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1;
            //                 //questionNumber = 4; 
            //                 //answerNumber = 3;
            //                 MultipleChoice1BtnEl.style.display = 'none';
            //                 MultipleChoice2BtnEl.style.display = 'none';
            //                 MultipleChoice3BtnEl.style.display = 'none';
            //                 MultipleChoice4BtnEl.style.display = 'none';
            //                 booleanvalue.style.display='none';
            //                 BeginQuizBtnEl.style.display = 'none';
            //                 Introduction.textContent = "You have finished the quiz!";
            //                 Finalscore.style.display = ""; // Allow display for final score
            //                 Initial.style.display = ""; // Display Message Enter initials
            //                 Initialtext.style.display="";  // Capture user score once submitted is clicked.
            //                 finalCheck = 1;
            //                 lastQuestionWrong();
            //                 Finalscore.textContent = "Your final score is: " + BestScore; // Assign the latest high score.
            //                 Initial.textContent = "Enter initials:"
            //                 SubmitEl.style.display = "";
            //                 SubmitEl.textContent = "Submit";      
            //                 clearInterval(timeInterval);
            //                 break;      
            //             default: console.log ("notfound");                   
            //         }

            //     }
            //     questionNumber ++
            //     answerNumber ++
            // });

            // MultipleChoice4BtnEl.addEventListener("click", function() {

            //     if (questionNumber ==3 && MultipleChoice4BtnEl.textContent === "localStorage") {
            //         // questionNumber = 3;
            //         // answerNumber = 4;
            //         booleanvalue.style.display="";
            //         booleanvalue.textContent = "Correct!";
            //         booleanvalue.style.borderTop = "solid #663399";
            //         booleantemplate.appendChild(booleanvalue);
            //     } 

            //     else {

            //         switch(MultipleChoice4BtnEl.textContent) {
            //             case "Advanced Primer Ignition":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1; 
            //                 // questionNumber = 1; 
            //                 // answerNumber = 4;
            //                 break;
            //             case "Bootstrap":
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1; 
            //                 // questionNumber = 2; 
            //                 // answerNumber = 4;
            //                 break;
            //             case "Exclamation mark":
            //                 console.log("Inside the case now");
            //                 booleanvalue.style.display="";
            //                 booleanvalue.textContent = "Wrong!";
            //                 booleanvalue.style.borderTop = "solid #663399";
            //                 score = 1; 
            //                 // questionNumber = 4; // Game is over, no more questions to show.
            //                 // answerNumber = 4; // Game is over, no more answers to show.
            //                 console.log("I'm here" + timeInterval);
            //                 MultipleChoice1BtnEl.style.display = 'none';
            //                 MultipleChoice2BtnEl.style.display = 'none';
            //                 MultipleChoice3BtnEl.style.display = 'none';
            //                 MultipleChoice4BtnEl.style.display = 'none';
            //                 booleanvalue.style.display='none';
            //                 BeginQuizBtnEl.style.display = 'none';
            //                 Introduction.textContent = "You have finished the quiz!";
            //                 Finalscore.style.display = ""; // Allow display for final score
            //                 Initial.style.display = ""; // Display Message Enter initials
            //                 Initialtext.style.display="";  // Capture user score once submitted is clicked.
            //                 finalCheck = 1;
            //                 lastQuestionWrong();
            //                 Finalscore.textContent = "Your final score is: " + BestScore; // Assign the latest high score.
            //                 Initial.textContent = "Enter initials:"
            //                 SubmitEl.style.display = "";
            //                 SubmitEl.textContent = "Submit";      
            //                 clearInterval(timeInterval);  
            //                 break;
            //             default: console.log ("notfound");
            //     }
                 
            //     }
            //     questionNumber ++
            //     answerNumber ++ 
            // });

        }
        else if(TimeRemaining === 0){

          console.log("I'm here" + timeInterval);
          MultipleChoice1BtnEl.style.display = 'none';
          MultipleChoice2BtnEl.style.display = 'none';
          MultipleChoice3BtnEl.style.display = 'none';
          MultipleChoice4BtnEl.style.display = 'none';
          booleanvalue.style.display='none';
          Introduction.textContent = "Game Over!. Try again by clicking on \"Begin the Quiz\"";
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