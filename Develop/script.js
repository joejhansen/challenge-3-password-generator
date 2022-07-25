// Assignment code here

// setting up variables. I found an array on stackoverflow with all the letters so that made it a bit quicker.
var underAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var specialCharacters = [" ", "!", '"', "'", "#", "$", "%", "&", "(", ")", "*", "+", ",", "=", ".", "/", ":", ";", "<", ">", "?", "@", "[", "]", '\\', "^", "_", "`", "{", "}", "|", "~"];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// setting up an empty array for my characters
var patternPassword = []
// setting up everything im gonna use inside the local scope so I can fetch it later
var wantsUnder
var wantsUpper
var wantsSpecial
var wantsNumber
var passwordLength
var result
var allTheWants
var allFalse

// Asking and storing what the user wants in their password.
function whatchuWant() {
  wantsUnder = confirm("Do you want lowercase letters?");
  wantsUpper = confirm("Do you want uppercase letters?");
  wantsSpecial = confirm("Do you want special characters");
  wantsNumber = confirm("Do you want numbers?");
  // this is storing all the values of the confirms
  allTheWants = [wantsUnder, wantsUpper, wantsSpecial, wantsNumber]
  // console.log(allTheWants);
  // this is basically just to short-hand or break up the array.every function
  allFalse = (currentValue) => currentValue === false;
  // console.log(allTheWants.every(allFalse));
  // if everything in this array === false...
  if (allTheWants.every(allFalse)) {
    // then do you even want a password???
    alert("Please specify which type of characters you would like in your password");
    whatchuWant();
    return;
  } else {
    return
  }
}

// asking how long they want their password
function howLongTho() {
  passwordLength = prompt("How long would you like your password to be between 8 and 128 characters?");
  // console.log(passwordLength);
  // console.log(wantsUnder);
  if ((passwordLength > 7) && (passwordLength < 129)) {
    return
  } else {
    alert("Please choose a number between 8 and 128")
    howLongTho();
  }
  return
}
// generating an array for the password, but there's a problem.
// this method spits out an array with a patter that goes lowercase-uppercase-special-number and I don't like that
// so we're gonna shuffle it
function passGenerator() {
  patternPassword = [];
  while (patternPassword.length < passwordLength) {
    // for lowercase
    if (wantsUnder && (patternPassword.length < passwordLength)) {
      var randomUnder = underAlphabet[Math.floor(Math.random() * underAlphabet.length)];
      patternPassword.push(randomUnder);
    }
    // for uppercase
    if (wantsUpper && (patternPassword.length < passwordLength)) {
      var randomUpper = upperAlphabet[Math.floor(Math.random() * upperAlphabet.length)];
      patternPassword.push(randomUpper);
    }
    // for special characters
    if (wantsSpecial && (patternPassword.length < passwordLength)) {
      var randomSpecial = specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
      patternPassword.push(randomSpecial)
    }
    // for numbers
    if (wantsNumber && (patternPassword.length < passwordLength)) {
      var randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
      patternPassword.push(randomNumber)
    }
  }
  // console.log(patternPassword)
  return
}
// we're gonna do the --
function passShuffle() {
  // for as long as i is less than the final password length, we're gonna switch stuff around
  for (i = 0; i < patternPassword.length; i++) {
    // RNGenerator for the length of the array
    var randomNum = Math.floor(Math.random() * patternPassword.length);
    // i pick up the character
    var holdThis = patternPassword[i];
    // i place the random character where the picked up character went
    patternPassword[i] = patternPassword[randomNum];
    // i place the held character where the random character was, like playing with blocks. I did find this online but had to tailor it to my own code.
    patternPassword[randomNum] = holdThis;
    // then we repeat until i is no longer less than the length of the patternPassword, thus statistically swapping every letter AT LEAST once.
    // this could, theoretically, not shuffle the result at all, but that would be exponentially more improbable as the length of the password increases
    // i think at 8 characters it's like .000000059% chance. nothing to worry about, really.
  }
  return
}

var passwordText = document.querySelector("#password");

// all together now
function generatePassword() {
  whatchuWant();
  howLongTho();
  passGenerator();
  passShuffle();
  result = patternPassword.join('');
  // console.log(result);
  alert("Your password is " + result);
  passwordText.value = "Your password is: " + result;
  return
}

var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", generatePassword);
// I see how yall are doing it, but I wrote the majority of this code seperately before combining it with the starter.
// It makes more sense to me to have each individual step be a seperate function and then we wrap it all together rather than making this entire process a single function

// var h1El = document.createElement("h1")
// document.body.appendChild(h1El)
// h1El.setAttribute("style", "display:flex; justify-content:center;");
// h1El.textContent = 'Your password is ' + result;


// Get references to the #generate element
// var generateBtn = document.querySelector("#generate");

// // Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;

// }

// // Add event listener to generate button
// generateBtn.addEventListener("click", generatePassword);
//