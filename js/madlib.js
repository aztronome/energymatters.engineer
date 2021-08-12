/* Given the 'id' attribute of a form element, this
   will return the value entered by the user into
   that form element. */
function formValue(id) {
  // Get the form element.
  let formElement = document.getElementById(id);
  console.log(formElement);
  // When the form element isn't found, return
  // a string that signifies that.
  if (formElement === null) {
    return `[${id} NOT FOUND]`;
  }

  let value = formElement.value;

  // When the value is empty, return a string
  // with the placeholder text.
  if (formElement.value.trim() === "") {
    return `[${formElement.placeholder}]`;
  }

  return document.getElementById(id).value;
}

/* Given the 'id' of an HTML element and a 
   'className', this will add that class to
   the HTML element. */
function addClassToElement(id, className) {
  let element = document.getElementById(id);
  element.classList.add(className);
}

/* The code here will be executed each time
   that the form button is clicked. */
function generate() {
  // retrieve form values
  let relative = formValue("relative");
  let adjective1 = formValue("adjective-1");
  let adjective2 = formValue("adjective-2");
  let adjective3 = formValue("adjective-3");
  let famousPerson = formValue("famous-person");
  let noun = formValue("noun");
  let dessert = formValue("dessert");
  let petName = formValue("pet-name");

  // insert form values into madlib
  let madlib = `Dear ${relative},
  <br><br>
  I have been having a really ${adjective1} time 
  at camp. The counselour is ${adjective2} and 
  the food is ${adjective3}. I met ${famousPerson} 
  and we quickly became ${noun}. Talk soon!
  <br><br>
  Your ${dessert},
  <br>
  ${petName}`;

  document.getElementById("output").innerHTML = madlib;

  addClassToElement("container", "generated");
}


//   console.log(output.innerText);
//   // shove madlib into output(Element)
//   let old = output.value
//   console.log(old);

//   console.log(madlib);

  // output madlib to player

//   Dear [RELATIVE],
//   <br><br>
//   I have been having a really [ADJECTIVE] time 
//   at camp. The counselour is [ADJECTIVE] and 
//   the food is [ADJECTIVE]. I met [FAMOUS PERSON] 
//   and we quickly became [NOUN]. Talk soon!
//   <br><br>
//   Your [DESSERT],
//   <br>
//   [YOUR PETS NAME]

// formValue - explanation
// /* The formValue function creates a variable //"formElement" and then stores an HTML Element with the  //matching id property/type in the variable. If no such //Element exists the function returns a message (given id)// NOT FOUND. If the Element is located, a new variable //"value" is created and the readable content of the //element is stored in it, in this case the user's input //to the respective form field. The .trim function //removes white space from around the "value" string. The //"value" string is checked without white space for //string characters, if nothing other than white space is //found the original placeholder text is returned. If //valid characters are found the content of the //respective form field is returned to the user.*/