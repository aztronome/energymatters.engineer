/* 
   Welcome to the Higher-Lower Game Project. 

   Try out the following functions that are 
   available to you (you can just call them
   in code or the console):
   
  // Returns the current value the user has 
  // entered into the guess input box.
  function getGuessInput()

  // Sets the current value  entered into the 
  // guess input box to 'value'.
  function setGuessInput(value)
 
  // Hides all messages shown to the user within
  // the "message-container" element.
  function hideAllMessages()

  // Hides all messages and then shows the one
  // with with the id attribute matching 'id' 
  // parameter.
  // Example: showMessage("higher-message")
  function showMessage(id)

  // Shows the remaining guess count.
  function showRemainingGuesses(value)
*/
// Initialize global variables needed by the program.
let magicNumber = -1; // -1 triggers new game
let remainingGuesses = -1;
let guess = 0;
let oldGuess = -1;
// let guessButton;
/* Returns a random integer in the range 'min' through 'max' inclusive. 

   This can be taken directly from MDN documentation: 
     https://tinyurl.com/3jkxa8h3
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // insert test loop
      // for (let i = min; i < max; i--) {
      //   console.log(i);
      // }
  // end test loop
  return Math.floor(Math.random() * (max - min) + min);
}

/* This function sets up a new game when called. 
   Here are the steps:

     (1) Generate a magic number stored in 'magicNumber'.
     (2) Reset the remaining guess count.
     (3) Show the new guess count.
     (4) Hide any messages.
*/
function setupNewGame() {
  magicNumber = getRandomIntInclusive(1, 101);
  remainingGuesses = 5;
  showRemainingGuesses(remainingGuesses);
  //setGuessInput(""); 
  hideAllMessages();
  // make guess button active
  document.getElementById("make-guess").disabled = false;
  console.log("SNG Magic#: " + magicNumber);
}
function handlePlayAgain() {
  magicNumber = getRandomIntInclusive(1, 101);
  remainingGuesses = 5;
  showRemainingGuesses(remainingGuesses);
  setGuessInput("");
  oldGuess = 0;
  hideAllMessages();
  document.getElementById("make-guess").disabled = false;
  console.log("HPA Magic#: " + magicNumber);
}

function handleGuess() { // This is a finite state machine my dude, in theory
oldGuess = guess; // store guess before updating it for comparison
guess = getGuessInput(); // update the guess variable
console.log(remainingGuesses);
if (remainingGuesses === -1) {
  console.log("Setup New Game");
  setupNewGame(); // the only call to setupNewGame() guesses = 5
}
if (remainingGuesses > 0) { // remainingGuesses > 0
  console.log("Remaining guesses: " + remainingGuesses);
  if (guess >= 1 && guess <= 100) { // if input is valid NESTED      
    if (oldGuess === guess && remainingGuesses < 5) { // if input hasn't changed insult them!
      showMessage("change-message");
      console.log("Change Your Guess Goofball!");
      return;
    } else if (guess === magicNumber) { // WIN
      showMessage("win-message");
      console.log("WIN");
      remainingGuesses--;
      showRemainingGuesses(remainingGuesses);
      // disable the make guess button
      document.getElementById("make-guess").disabled = true;
      return; // or return or jump back to top
    } else if (guess > magicNumber) {   // LOWER
      showMessage("lower-message");
      console.log("Lower");
      remainingGuesses--;
      showRemainingGuesses(remainingGuesses);
      console.log("Remaining guesses: " + remainingGuesses);
      if (remainingGuesses === 0) { // You Lose
        showMessage("lose-message");
        // the play again button should appear
        document.getElementById("make-guess").disabled = true;
        console.log("LOSE");
        return; 
      } 
    } else if (guess < magicNumber) {
      showMessage("higher-message");    // HIGHER
      console.log("Higher");
      remainingGuesses--;
      showRemainingGuesses(remainingGuesses);
      console.log("Remaining guesses: " + remainingGuesses);
      if (remainingGuesses === 0) { // You Lose
        showMessage("lose-message");
        // the play again button should appear
        document.getElementById("make-guess").disabled = true;
        console.log("LOSE");
        return; 
      } 
    } else {
      // enter a number
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
  // Check if the user has any remaining guesses and return if not.

  // Retreive the user's newest guess.

  // Check if the user has won. We should show a message, set remaining guesses to 0, and return from this function.
  
  // Check if the guess is higher or lower and show appropriate message.

  // The user has used a guess, decrement remainin guesses and show the new value.

  // If the remaining guesses is 0, then the user has lost and that message should be shown.

/* Function to be called when the user wants to play again.
   Here are the steps:
      (1) Setup a new game.
      (2) Set the guess input to "".
*/

