//Pseudo Code
// Refresh page
// Initializations
//      getHiddenWord(); random pick from global array of words
//      displayBlanks(hiddenWord.length)
//      set global Wins to 0
//      set maxGuesses to 15
//      set numGuesses to 0
//      set numLetters to 0 -- number of letters user has correctly guessed
//      init guessedWord array to hiddenWord.length
//      init lettersAlreadyGuessed array to blanks
//      Display initial messages "Press any key to get started"
//  document.onkeyup logic
//      var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
//      




var isAlpha = /^[A-Z]+$/i; //use this RegEx to make sure user pressed only an alpha character*/
var matches = {
                currentMatches:[],
                currentMatchCount: 0
               }

var guesses = {
        currentGuess:"",
        pastGuesses:[],
        guessLimit: 15,
        matchGuess: function(userGuess) {
                var matchArray     = [];
                var matchString    = "";

                
                // Convert userGuess into a Regular Expression. Use the "global" parm so that
                // matches will return every instance of userGuess in the string.
                var patt = new RegExp(userGuess,"gi"); 

                matches.currentMatchCount = 0;
                while (match = patt.exec(secrets.targetWord)) {
                        matchString = "Found "+match+" at location "+ match.index;
                        console.log(matchString);
                        // Store the locations where the matching letter occurs
                        matches.currentMatches.push(match.index);
                        // Increment the count of the matches
                        matches.currentMatchCount++;
                }

                if (matches.currentMatchCount > 0) {
                        return true;
                } else {
                        return false;
                }

        }
}

var secrets     = {
        quizWordList: ["Four Seasons", "Marcels", "Cleftones", "Fleetwoods", "Penguins"],  
        targetWord:"", 
        randomWord: function() {
              
                var randIndex = Math.floor(Math.random()*this.quizWordList.length);
                console.log("This is the random index"+randIndex);
                return this.quizWordList[randIndex];

        }
        
}

window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        // Grab one of the hiddenWords from the hiddenWords object

        secrets.targetWord = secrets.randomWord();
        console.log("This is what I saw "+secrets.targetWord);

        localStorage.setItem("hasCodeRunBefore", true);
    }
}

document.onkeyup = function() {

        window.onload();
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