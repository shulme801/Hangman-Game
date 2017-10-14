// Pseudo code
//   On initial load of page:
//      get a random 1950s group name from the quizWordList and store it in the targetWord variable
//      initialize the screen with the title of the game, 0 wins, guesses remaining and blank past guesses.
//      set the resetGame flag in localStorage to "no" so we don't reset screen again until we've played a game.
//
//  On key up event
//      if the resetGame flag is set, reset the screen to initial displayed values but with current winCount
//      grab the current guess key from the event and stuff into currentGuess
//
//      if currentGuess is {space char or whitespace} AND guessesCount == 0
//        IGNORE IT and begin game. We will let user hit spacebar or <CR> to initiate the game
//        -- but we will correctly utilize spaces in singing group names
//        -- like "Franki Valli and the Four Seasons"
//
//      if currentGuess is an alphabetic char OR a space
//          -- it counts as a guess (we ignore numbers, punctuation, carriage return, etc)
//          increment guessesCount
//          diplay guessesRemaining
//          if guessesCount > guessLimit
//              -- user has lost the game
//              display the loser message and tell user to press any key to continue
//              set the resetGame flag in localStorage to "yes" so that we will reset the screen on the next key up event
//              -- one could update a lossesCount variable here
//          else
//              -- at this point we have an alphabet char to compare and we know that we are within the guessLimit
//              -- so let's figure out if the guess matches one or more letters in targetWord
//              call the matchGuess function in the game object. This function will compare the userGuess to targetWord. It will
//               store the index for each of the matched latters in
//               currentMatchedLetters and will return the number of matched letters.
//              if the userGuess matched one or more letters in the targetWord
//                clear out any invalid keypress message
//                check to see whether currentMatchedLetters completely matches targetWord
//                if complete match 
//                  increment winCount
//                  display victory message, play the song that matches the doowop group,  and "press any key to continue"
//                  set the resetGame flag in localStorage to "yes" so that we will reset the screen on the next key up event
//              else
//                -- this is the "else" that processes case where userGuess was not a match for any of the chars in targetWord
//                display the "did not match -- press any key to continue" message
//                -- but leave the resetGame flag unset so we don't start a new game the next time user presses a key
//      else
//        -- this is the "else" that processes the case where userGuess is not an alphabetic char and not a space
//        display the "please press an alphabetic key or the spacebar to make a guess" message
//        -- but leave the resetGame flag unset so we don't start a new game the next time user presses a key
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var winsDiv         = $("<div>");
var wordDiv         = $("<div>");
var pastGuessesDiv  = $("<div>");
var loserDiv        = $("<div>");
var winnerDiv       = $("<div>");

var isAlpha = /^[A-Z]+$/i; //use this RegEx to make sure user pressed only an alpha character 
var isSpace = /^[\s]+/; // This RegEx looks for a space or other non-printable characters

var lastGuess = 0; //used to track position of the last guessed letter in pastGuesses
var guessesRemaining; // total number of remaining guesses

var hangmanGame = {
    winCount: 0,
    currentMatchedLetters: [],
    totalMatchesCount: 0,
    currentGuess:"",
    pastGuesses:"",
    guessesCount: 0,
    guessLimit: 20,
    thrillOfVictoryMsg: "",
    targetWord: "",
    targetHint: "",
    quizWordList: ["The Four Seasons", "Marcels", "Frankie Valli and The Four Seasons","The Cleftones", "Fleetwoods", "Penguins"],  
    hints:        ["Sherry Baby", "Blue Moon", "Sherry Baby","You Baby You", "Come Softly To Me", "Earth Angel"],
    randomWord: function() {
                var randIndex = Math.floor(Math.random()*this.quizWordList.length);
                
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
       this.guessLimit = 20;
       this.thrillOfVictoryMsg = "";
       this.targetWord = "";
       this.targetHint = "";
       this.getTargetWord();
    },
    getTargetWord: function() {
        // Grab one of the hiddenWords from the hiddenWords object
        hangmanGame.randomWord(); //get the word user is trying to guess as well as the hint and stuff them into the hangmanGame object
        
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
    guessesRemaining = hangmanGame.guessLimit;
    // And now display the initial values
    $("#hangmanGame").html("<h2>1950's Doowop Hangman!</h2>");
    
    $("#winsDiv").text("Wins So Far: "+hangmanGame.winCount);
    $("#wordDiv").text("Current Word: "+hangmanGame.currentMatchedLetters);
    $("#guessesCountDiv").text("Remaining Guesses: "+guessesRemaining);
    $("#pastGuessesDiv").text("Letters Already Guessed: "+hangmanGame.pastGuesses);
    $("#loserDiv").text("  ");
    $("#winnerDiv").text("  ");
    localStorage.setItem("resetGame","no");

}

document.onkeyup = function() {
      
        
        if (localStorage.getItem("resetGame") == "yes") {
  
            hangmanGame.nextGame();
            guessesRemaining = hangmanGame.guessLimit;
            $("#winsDiv").text("Wins So Far: "+hangmanGame.winCount);
            $("#wordDiv").text("Current Word: "+hangmanGame.currentMatchedLetters);
            $("#guessesCountDiv").text("Remaining Guesses: "+guessesRemaining);
            $("#pastGuessesDiv").text("Letters Already Guessed: "+hangmanGame.pastGuesses);
            $("#loserDiv").text("  ");
            $("#winnerDiv").text("  ");
            $("#nextPrompt").text("  ")
            localStorage.setItem("resetGame", "no");
        }

       

        hangmanGame.currentGuess = String.fromCharCode(event.keyCode).toLowerCase();

        if ((isSpace.test(hangmanGame.currentGuess)) && (hangmanGame.guessesCount == 0)) {
            // Don't do anything -- we ignore initial whitespace characters
        } else {
            // see whether our triggering event is a key press of an alpha character or white space
            if ((isAlpha.test(hangmanGame.currentGuess)) || (isSpace.test(hangmanGame.currentGuess))) {
             
              
              hangmanGame.guessesCount++;
              if (hangmanGame.guessesCount >= hangmanGame.guessLimit) {
                // this is the "loser logic"
                guessesRemaining = 0;
                $("#guessesCountDiv").text("Remaining Guesses: "+guessesRemaining);
                hangmanGame.thrillOfVictoryMsg = "Sorry, You Lost!" //irony noted -- this is not thrillofVictory but "Agony of defeat"
                //display the loser message
                $("#loserDiv").text(hangmanGame.thrillOfVictoryMsg);
                $("#nextPrompt").text("Press any key to continue");
                localStorage.setItem("resetGame","yes");
              } else {
                //User has guesses remaining so let's play the game and check out the guess!
               
                guessesRemaining = hangmanGame.guessLimit-hangmanGame.guessesCount;
                $("#guessesCountDiv").text("Remaining Guesses: "+guessesRemaining);

                // we're going to put the currentGuess into the pastGuesses string.
                // the final char in this string is "]".
                var lastGuess = hangmanGame.pastGuesses.length-1; //position LastGuess on the final guessed char in pastGuesses string. 
          
                hangmanGame.pastGuesses = hangmanGame.pastGuesses.substring(0,lastGuess); //Grab just the guessed chars so far
         
                hangmanGame.pastGuesses = hangmanGame.pastGuesses+" "+hangmanGame.currentGuess+"]"; //add a space, followed by the user's current guess, followed by "]" to the end of pastGuesses
            
                $("#pastGuessesDiv").text("Letters Already Guessed: "+hangmanGame.pastGuesses);

                //Now that the current userGuess is has been recorded, let's see if it's a match for any chars in targetWord
                if (hangmanGame.matchGuess(hangmanGame.currentGuess)) {
                    //The key that user guessed does match one or more letters in the targetWord
                    //The matchGuess method will have updated the currentMatchedLetters and totalMatchesCount

                    //we know user did input a matching letter
                    //so clear out any error message
                    $("#loserDiv").text(" ");
                    // Display the updated currentMatchedLetters
                    $("#wordDiv").text("Current Word: "+hangmanGame.currentMatchedLetters);

                    var matched = true;

                    // A regular expression test will replace this for loop in Rel 2 of this game
                    for (i=0; i<hangmanGame.targetWord.length; i++) {
                        var testChar = hangmanGame.targetWord[i].toLowerCase();
                        
                        if (hangmanGame.currentMatchedLetters[i] != testChar) {
                            matched = false;
                            break;
                        }
                    }

                    

                    // Now, see if user has matched all the letters in targetWord
                    if (matched == true) {
                       // Victory!!
                       hangmanGame.thrillOfVictoryMsg="Congratulations, you won!!";
                       hangmanGame.winCount++;
                    
                       $("#winnerDiv").text(hangmanGame.thrillOfVictoryMsg);
                       $("#nextPrompt").text("Press any key to continue");
                      localStorage.setItem("resetGame","yes");
                    }
                } else { 
                    // logic to handle non-match
                    
                    if (hangmanGame.totalMatchesCount > 0) {
                     $("#loserDiv").text("The key "+hangmanGame.currentGuess+" did not match -- try again");
                    }
                }
          } //end of logic to handle remaining guess processing
        } else {
          $("#loserDiv").text("Try again by entering an alphabetic key or a space");
        }

    }

        
}

