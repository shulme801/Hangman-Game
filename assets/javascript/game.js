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
//          guessesCount++;
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



var hangmanGame = {
    winCount: 0,
    currentMatchedLetters: [],
    currentMatchCount: 0,
    currentGuess:"",
    pastGuesses:[],
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

                // Convert userGuess into a Regular Expression. Use the "global" parm so that
                // matches will return every instance of userGuess in the string.
                var patt = new RegExp(userGuess,"gi"); 

                this.currentMatchCount = 0;
                while (match = patt.exec(secrets.targetWord)) {
                        matchString = "Found "+match+" at location "+ match.index;
                        console.log(matchString);
                        // Store the locations where the matching letter occurs
                        this.currentMatchedLetters.push(match.index);
                        // Increment the count of the matches
                        this.currentMatchCount++;
                }

                if (this.currentMatchCount > 0) {
                        return true;
                } else {
                        return false;
                }

        }

}



window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        // Grab one of the hiddenWords from the hiddenWords object

        secrets.initRandomWord(); //get the word user is trying to guess as well as the hint and stuff them into the hangmanGame object
        console.log("This is what I saw "+hangmanGame.targetWord);

        localStorage.setItem("hasCodeRunBefore", true);
    }
}

document.onkeyup = function() {
        var isAlpha = /^[A-Z]+$/i; //use this RegEx to make sure user pressed only an alpha character*/

        // window.onload(); //see whether we need to initialize the gam and the screen
        console.log("The secret is "+secrets.targetWord);
        guesses.currentGuess = String.fromCharCode(event.keyCode).toLowerCase();


        if (isAlpha.test(guesses.currentGuess)) {

          console.log("Entered a "+guesses.currentGuess);
          if (guesses.matchGuess(guesses.currentGuess)) {
                console.log(matches.currentMatches);
                console.log(matches.currentMatchCount);
          } else {
                console.log("Skunked on "+guesses.currentGuess);
          }
        } else {
          console.log("Got to enter an alphabetic key, try again");
        }

}