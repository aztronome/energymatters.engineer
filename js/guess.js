/***** SOME FUNCTIONS ******/
   
// Returns the current value the user has 
// entered into the guess input box.
function getGuessInput() {
  // This will get the value of an input element with the id "guess-input".
  let guessString = document.getElementById("guess-input").value;
  //console.log("--- gGI string--- " + guessString);
  // if (guessString == "" || null || undefined) {
  //   console.log("No input given to gGI: " + guessString);
  //   return null;
  // }
  // Converts the string to a number.
  let guessNumber = Number(guessString);
  // Returns the number. 
  // console.log("--- gGI --- number:" + guessNumber);
  return guessNumber;
}
// Sets the current value  entered into the 
// guess input box to 'value'.
function setGuessInput(value) {
  document.getElementById("guess-input").value = value;
}
// Hides all messages shown to the user within
// the "message-container" element.
function hideAllMessages() {
  // Find all message elements.
  let messages = document.querySelectorAll("#message-container > *");
  // Add the "hidden" class to each of the message elements.
  for (let i = 0; i < messages.length; i++) {
    messages[i].classList.add("hidden");
  }
}
// Hides all messages and then shows the one
// with with the id attribute matching 'id' 
// parameter.
// Example: showMessage("higher-message")
function showMessage(id) {
  // Hide all the messages.
  hideAllMessages();
  // Find the message with 'id'.
  let message = document.getElementById(id);
  if (message != null) {
    // Show the message.
    message.classList.remove("hidden");
  } else {
    console.log(`${id} does not exist.`);
  }
}
// Shows the remaining guess count.
function showRemainingGuesses(value) {
  document.getElementById("remaining-guesses").innerHTML = value;
}
/***** END ******/
 

// I made several changes to the game behavior. My game checks for 
// valid input and displays a message if the input is out of bounds and it wont // accept invalid input. My game will not accept the same guess twice and it 
// displays a message if the input is not changed. This prevents accidental 
// double taps of the make guess button. Once a game has ended the make guess 
// button is disabled until play again is clcked.

// After implimenting these changes there were several bugs that I had observed // with some testing. I think I got them all fixed but who knows... Hopefully
// these changes are seen as better than the original. I tried to make sure the 
// items on the rubric were all addressed. 

let magicNumber = -1; // -1 triggers new game
let remainingGuesses = -1;
let guess = 0;
let oldGuess = -1;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // insert test loop
      // for (let i = max; i < min; i--) {
      //   console.log(i);
      // }
  // end test loop
  return Math.floor(Math.random() * (max - min) + min);
}

function setupNewGame() { // runs on page load
  magicNumber = getRandomIntInclusive(1, 101);
  remainingGuesses = 5;
  showRemainingGuesses(remainingGuesses);
  //setGuessInput(""); 
  hideAllMessages();
  // make guess button active
  document.getElementById("make-guess").disabled = false;
  document.getElementById("body-div").style.background = "rgba(0, 0, 0, 0.3)";
  console.log("SNG Magic#: " + magicNumber);
}

function handlePlayAgain() { // runs when play again button clicked
  magicNumber = getRandomIntInclusive(1, 101);
  remainingGuesses = 5;
  showRemainingGuesses(remainingGuesses);
  setGuessInput("");
  oldGuess = 0;
  hideAllMessages();
  document.getElementById("make-guess").disabled = false;
  document.getElementById("body-div").style.background = "rgba(0, 0, 0, 0.3)";
  console.log("HPA Magic#: " + magicNumber);
}

function handleGuess() { // This is a finite state machine my dude, in theory
oldGuess = guess; // store guess before updating it for comparison
guess = getGuessInput(); // update the guess variable
if (remainingGuesses === -1) {
  //console.log("Setup New Game");
  setupNewGame(); // the only call to setupNewGame() guesses = 5
}
if (remainingGuesses > 0) { // remainingGuesses > 0
  //console.log("Remaining guesses: " + remainingGuesses);
  if (guess >= 1 && guess <= 100) { // if input is valid NESTED      
    if (oldGuess === guess && remainingGuesses < 5) { // if input hasn't changed insult them!
      showMessage("change-message");
      console.log("Change Your Guess Goofball!");
      return;
    } else if (guess === magicNumber) { // WIN
      showMessage("higher-message");
      showMessage("win-message");
      //console.log("WIN");
      remainingGuesses--;
      showRemainingGuesses(remainingGuesses);
      // disable the make guess button
      document.getElementById("make-guess").disabled = true;
      document.getElementById("body-div").style.background = "rgba(0,0,0,0.03)";
      return; // or return or jump back to top
    } else if (guess > magicNumber) {   // LOWER
      showMessage("lower-message");
      //console.log("Lower");
      remainingGuesses--;
      showRemainingGuesses(remainingGuesses);
      //console.log("Remaining guesses: " + remainingGuesses);
      if (remainingGuesses === 0) { //  LOSE
        document.getElementById("make-guess").disabled = true;
        document.getElementById("body-div").style.background = "rgba(0,0,0,1)";
        showMessage("lower-message");
        showMessage("lose-message");
        //console.log("LOSE");
        return; 
      } 
    } else if (guess < magicNumber) {
      showMessage("higher-message");    // HIGHER
      //console.log("Higher");
      remainingGuesses--;
      showRemainingGuesses(remainingGuesses);
      //console.log("Remaining guesses: " + remainingGuesses);
      if (remainingGuesses === 0) { // You Lose
        showMessage("lose-message");
        // the play again button should appear
        document.getElementById("make-guess").disabled = true;
        //console.log("LOSE");
        return; 
      } 
    } else {
      // enter a number!
      showMessage("change-message");
      console.log("Enter A Number");
    }
  }
  else {// invalid input
    if (guess > 100) {
      console.log("out of bounds HIGH");
      showMessage("out-of-bounds-message");
      return;    
    } else { // if guess < 1
      console.log("out of bounds LOW");
      showMessage("out-of-bounds-message"); 
      return;
    }
  }
} 
}
 

