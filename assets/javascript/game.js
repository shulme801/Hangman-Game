//Pseudo Code
// Refresh page
// Initializations onLoad of game window
//      set global Wins to 0
//      set maxGuesses to 15
//      set numGuesses to 0
//      set numLetters to 0 -- number of letters user has correctly guessed
//      init guessedWord array to hiddenWord.length
//      init lettersAlreadyGuessed array to blanks
//      store RandomWord in targetWord
//      store hint in targetHint
//      Display initial messages:
//          "Press any key to get started"
//          winCount
//          blanks equal to length of targetWord
//          pastGuesses
//          
//
//  document.onkeyup logic {
//      currentGuess = String.fromCharCode(event.keyCode).toLowerCase();
//      thrillOfVictoryMessage = "";
//      if (userGuess is not alphabetic key) {
//          display message "You must press an alphabetic key to play"
//          
//      } else {
//          guessesCount++; //if user pressed an alphabetic key it counts as a guess
//          
//          if guessesCount > guessLimit {
//             localStorage.setItem("hasCodeRunBefore", true); //force page reload next time user presses a key
//             if currentMatchCount == length of targetWord {
//                 thrillOfVictoryMsg = "Congratulations, You Won!"
//                 winCount++
//                 play song 
//             } else {
//                 thrillOfVictoryMsg = "Sorry, You Lost!"
//             }
//          } else {
//              for each letter in userGuess {
//                  add the userGuess letter to the end of the pastGuesses array
//              }
//              test to see whether userGuess is found in targetWord.
//              if (userGuess does not match targetWord) {
//                display "Letter not found message"
//              } else {
//                for each letter in userGuess that matches the targetWord {
//                    store it in the matching position in currentMatchedLetters
//                }
//              }
//          }
//          update browser window with guessesCount, pastGuesses, currentMatchedLetters
//          if thrillOfVictory message is not the empty string {
//              Update browser window with thrillOfVictory message
//          }
//      } //end the "else alphabetic key was pressed" logic
//   } // end the onkeyup logic  

var winsDiv         = $("<div>");
var wordDiv         = $("<div>");
var pastGuessesDiv  = $("<div>");
var loserDiv        = $("<div>");
var winnerDiv       = $("<div>");
var isAlpha = /^[A-Z\s]+$/i; //use this RegEx to make sure user pressed only an alpha character or a space
var lastGuess = 0;

var hangmanGame = {
    winCount: 0,
    currentMatchedLetters: [],
    totalMatchesCount: 0,
    currentGuess:"",
    pastGuesses:"",
    guessesCount: 0,
    guessLimit: 15,
    thrillOfVictoryMsg: "",
    targetWord: "",
    targetHint: "",
    quizWordList: ["Four Seasons", "Marcels", "Cleftones", "Fleetwoods", "Penguins"],  
    hints:        ["Sherry Baby", "Blue Moon", "You Baby You", "Come Softly To Me", "Earth Angel"],
    randomWord: function() {
                var randIndex = Math.floor(Math.random()*this.quizWordList.length);
                console.log("This is the random index "+randIndex);
                this.targetWord =  this.quizWordList[randIndex];
                this.targetHint =  this.hints[randIndex];

    },
    matchGuess: function(userGuess) {
                var matchArray     = [];
                var matchString    = "";
                var currentMatchesCount = 0;

                // Convert userGuess into a Regular Expression. Use the "global" parm so that
                // matches will return every instance of userGuess in the string.
                var patt = new RegExp(userGuess,"gi"); 

                while (match = patt.exec(hangmanGame.targetWord)) {
                        matchString = "Found "+userGuess+" at location "+ match.index;
                        console.log(matchString);
                        // Store the locations where the matching letter occurs
                        this.currentMatchedLetters[match.index] = userGuess;
                        // Increment the count of the matches
                        currentMatchesCount++;
                }

                if (currentMatchesCount > 0) {
                        this.totalMatchesCount += currentMatchesCount;
                        return true;
                } else {
                        return false;
                }

        },
    nextGame: function() {
       this.currentMatchedLetters =[];
       this.totalMatchesCount = 0;
       this.currentGuess = "";
       this.pastGuesses = "";
       this.guessesCount= 0;
       this.guessLimit = 15;
       this.thrillOfVictoryMsg = "";
       this.targetWord = "";
       this.targetHint = "";
       this.getTargetWord();
    },
    getTargetWord: function() {
        // Grab one of the hiddenWords from the hiddenWords object
        hangmanGame.randomWord(); //get the word user is trying to guess as well as the hint and stuff them into the hangmanGame object
        console.log("This is what I saw "+hangmanGame.targetWord);
        //      init currentMatchedLetters array to "_"; one "_" for each letter in targetWord
        for (i=0; i<hangmanGame.targetWord.length;i++) {
          hangmanGame.currentMatchedLetters[i] = "_";
         }

        //      init pastGuesses to default
        hangmanGame.pastGuesses = "[ ]"; //length of pastGuesses is 3
    }

}



window.onload = function () {
    var i = 0;

    
    hangmanGame.getTargetWord();

    // And now display the initial values
    $("#hangmanGame").html("<h2>1950's Doowop Hangman!</h2>");
    // $("hangmanGame").text("<h3>Press Any Key To Get Started!</h3><br><br>");
    $("#winsDiv").text("Wins So Far: "+hangmanGame.winCount);
    $("#wordDiv").text("Current Word: "+hangmanGame.currentMatchedLetters);
    $("#pastGuessesDiv").text("Letters Already Guessed: "+hangmanGame.pastGuesses);
    $("#loserDiv").text("  ");
    $("#winnerDiv").text("  ");
    localStorage.setItem("resetGame","no");

}

document.onkeyup = function() {
      

        console.log("resetGame FLAG "+localStorage.getItem("resetGame"));
        
        if (localStorage.getItem("resetGame") == "yes") {
            console.log("Resetting game");
            hangmanGame.nextGame();
            $("#winsDiv").text("Wins So Far: "+hangmanGame.winCount);
            $("#wordDiv").text("Current Word: "+hangmanGame.currentMatchedLetters);
            $("#pastGuessesDiv").text("Letters Already Guessed: "+hangmanGame.pastGuesses);
            $("#loserDiv").text("  ");
            $("#winnerDiv").text("  ");
            $("#nextPrompt").text("  ")
            localStorage.setItem("resetGame", "no");
        }

        console.log("The secret is "+hangmanGame.targetWord);

        hangmanGame.currentGuess = String.fromCharCode(event.keyCode).toLowerCase();

        if (isAlpha.test(hangmanGame.currentGuess)) {
          hangmanGame.guessesCount++;
          if (hangmanGame.guessesCount > hangmanGame.guessLimit) {
            hangmanGame.thrillOfVictoryMsg = "Sorry, You Lost!" //irony noted -- this is not thrillofVictory but "Agony of defeat"
            //display the loser message
            $("#loserDiv").text(hangmanGame.thrillOfVictoryMsg);
            $("#nextPrompt").text("Press any key to continue");
            localStorage.setItem("resetGame","yes");
          } else {//User has guesses remaining so let's play the guess!
            console.log("Entered a "+hangmanGame.currentGuess);

            // we're going to put the currentGuess into the pastGuesses string.
            // the final char in this string is "]".
            var lastGuess = hangmanGame.pastGuesses.length-1; //position LastGuess on the final guessed char in pastGuesses string. 
            console.log("lastGuess pos is "+lastGuess);
            hangmanGame.pastGuesses = hangmanGame.pastGuesses.substring(0,lastGuess); //Grab just the guessed chars so far
            console.log("now pastGuesses is "+hangmanGame.pastGuesses);
            hangmanGame.pastGuesses = hangmanGame.pastGuesses+" "+hangmanGame.currentGuess+"]"; //add a space, followed by the user's current guess, followed by "]" to the end of pastGuesses
            console.log("Past Guesses are "+hangmanGame.pastGuesses);
            $("#pastGuessesDiv").text("Letters Already Guessed: "+hangmanGame.pastGuesses);

            //Now that the current userGuess is has been recorded, let's see if it's a match for any chars in targetWord
            if (hangmanGame.matchGuess(hangmanGame.currentGuess)) {
                //The key that user guessed does match one or more letters in the targetWord
                //The matchGuess method will have updated the currentMatchedLetters and totalMatchesCount
                console.log(hangmanGame.currentMatchedLetters);
                console.log(hangmanGame.totalMatchesCount);

                //we know user did input a matching letter
                //so clear out any error message
                $("#loserDiv").text(" ");
                // Display the updated currentMatchedLetters
                $("#wordDiv").text("Current Word: "+hangmanGame.currentMatchedLetters);

                var matched = true;

                for (i=0; i<hangmanGame.targetWord.length; i++) {
                    var testChar = hangmanGame.targetWord[i].toLowerCase();
                    console.log("comparing "+hangmanGame.currentMatchedLetters[i]+" "+testChar);
                    if (hangmanGame.currentMatchedLetters[i] != testChar) {
                        matched = false;
                        break;
                    }
                }

                console.log("matched is "+matched);

                // Now, see if user has matched all the letters in targetWord
                if (matched == true) {
                    // Victory!!
                    hangmanGame.thrillOfVictoryMsg="Congratulations, you won!!";
                    hangmanGame.winCount++;
                    console.log("hangmanGame.winCount "+hangmanGame.winCount);
                    $("#winnerDiv").text(hangmanGame.thrillOfVictoryMsg);
                    $("#nextPrompt").text("Press any key to continue");
                    localStorage.setItem("resetGame","yes");
                }
            } else { //else the key the user entered was not found in targetMessage
                console.log("Skunked on "+hangmanGame.currentGuess);
                $("#loserDiv").text("The key "+hangmanGame.currentGuess+" did not match -- try again");
            }
          }
        } else {
          console.log("Got to enter an alphabetic key, try again");
          $("#loserDiv").text("Try again by entering an alphabetic key or a space");
        }

}