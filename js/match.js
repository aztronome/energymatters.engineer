

function appendNewCard(parentElement) {
  // Step 1: Make a variable for the card element. Assign it to a new div element.
  let cardEl = document.createElement("div");

  // Step 2: Add the "card" class to the card element.
  cardEl.classList.add("card");
  // cardEl.className = "card";

  // Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of the card element.
  cardEl.innerHTML = `
      <div class="card-down"></div>
      <div class="card-up"></div>
  `;

  // Step 4: Append the card element to the parentElement, making the card element a "child".
  //let cardContainer = document.getElementById(parentElement);
  parentElement.appendChild(cardEl);

  // Step 5: Return the card element.
  return cardEl;
}



function shuffleCardImageClasses() {
  
  // Step 1: Initialize an array of 2 of each image class strings in-order (e.g. "image-1", "image-1", "image-2"...)
  let cardClassesArray = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];

  /* Step 2: We're going to use a library to randomly "shuffle" the array we created. The library is called "underscore.js" because it uses an "_" charector as an object to contain helper methods.  Load underscore.js in your HTML via the CDN and then look at the "shuffle" method.  Note to ignore the "require" syntax as this is for non-browser environments (i.e. the var "_" will already be available to you from loading the CDN).
   
  CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
   
  Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm
   */
  // shuffledClassesArray = _.shuffle(cardClassesArray);
  // Step 3: Return the shuffled array of class names.
  return _.shuffle(cardClassesArray);;
}
//shuffleCardImageClassesTest();
//console.log(shuffleCardImageClasses());



function createCards(parentElement, shuffledImageClasses) {
  // Step 1: Make an empty array to hold our card objects.
  let objectArray = [];
  //console.log(cardClassesArray.length);
  // Step 2: Loop 12 times to create the 12 cards we need.
  for (let i = 0; i < 12; i++) {
    // Step 2(a): Use appendNewCard to create/append a new card and store the result in a variable.
    let newCardElement = appendNewCard(parentElement);
    //console.log(newCardElement);
    // Step 2(b): Add an image class to the new card element, using shuffledImageClasses[i].
    newCardElement.classList.add(shuffledImageClasses[i]);
    /* Step 2(c): Create a new object representing this card. This should have properties for:
       "index" -- what iteration of the loop is this.
       "element" -- the dom element for the card
       "imageClass" -- the string of the image class on the card.
    */
    objectArray.push({
      index: i,
      element: newCardElement,
      imageClass: shuffledImageClasses[i]
    });

    // Step 2(d): Append the new card object to the array of card objects.
    //cardObjectArray.push(newCardElement);
  }
  // Step 3: Return the array of 12 card objects.
  return objectArray;
}
// createCardsTest();



function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}
//doCardsMatchTest();


/* An object used below as a dictionary to store counter names and their respective values.  Do you remember using objects as dictionaries? If not, go back to that lecture to review. */
let counters = {
};


function incrementCounter(counterName, parentElement) {
  // Step 1: If the 'counterName' property is not defined in the 'counters' object, add it with a value of 0.
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  // Step 2: Increment the counter for 'counterName'.
  counters[counterName]++;
  //console.log("Count:" + counters.counterName);
  // Step 3: Change the DOM within 'parentElement' to display the new counter value.
  parentElement.innerHTML = counters[counterName];
  //console.log(counters[counterName]);
}
 //incrementCounterTest();


/* Variables storing an audio objects to make the various sounds.  See how it's used for the 'click' sound in the provided function below.  */
let clickAudio = new Audio('audio/match/click.wav');
let matchAudio = new Audio('audio/match/match.mp3');
let winAudio = new Audio('audio/match/win.mp3')



function flipCardWhenClicked(cardObject) {
  // Adds an "onclick" attribute/listener to the element that will call the function below.
  cardObject.element.onclick = function() {
    // THE CODE BELOW RUNS IN RESPONSE TO A CLICK.

    // Card is already flipped, return.
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
  
    // Play the "click" sound.
    clickAudio.play();

    // Add the flipped class immediately after a card is clicked.
    cardObject.element.classList.add("flipped");

    // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
    setTimeout(function() {
      // THE CODE BELOW RUNS AFTER a 500ms delay.
      //console.log("cardObject:" + cardObject);
      onCardFlipped(cardObject);

    }, 500);
  };
}


/* The 'onCardFlipped' function below will be called each time the user flips a card.  This variable is used to remember the first card flipped while we wait for the user to flip another card. It should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;



function onCardFlipped(newlyFlippedCard) {
  // Step 1: Add one to the flip counter UI.  
  incrementCounter("flips", document.getElementById("flip-count"));
  //console.log("newlyFlippedCard:" + newlyFlippedCard);
  //console.log("lastCardFlipped:" + lastCardFlipped);

  // Step 2: If this is the first card flipped, then remember that card using the 'lastCardFlipped' variable and return (nothing else to do).
  //
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return
  }
  // Otherwise, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard'.

  // Step 3: If the cards don't match, then remove the "flipped" class from each, reset 'lastCardFlipped', and return.
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }
  
  // Otherwise, we have two matching cards.

  // Step 4: Increment the match counter and optionally add a "glow" effect to the matching cards.
  else {
    incrementCounter("matches", document.getElementById("match-count"));
  }
  // Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win.
  if (counters.matches >= 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }
  // Step 6: Reset 'lastCardFlipped'.
  lastCardFlipped = null;
}



// Set up the game.
let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}

