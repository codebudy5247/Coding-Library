/**
 * You are given a string of varying word counts. The goal of the function is to reverse every
 * word in the string and return it.
 * input:  'The quick brown fox.'
 * output: 'ehT kciuq nworb .xof'
 */

function reverseWords(input) {
  let reversedString = "";
  let wordStart = 0;

  for (let i = 0; i <= input.length; i++) {
    if (i === input.length || input[i] === " ") {
      for (let j = i - 1; j >= wordStart; j--) {
        reversedString += input[j];
      }
      if (i < input.length) {
        reversedString += " ";
      }
      wordStart = i + 1;
    }
  }

  return reversedString;
}

// USing js function
function reverseWords2(str) {
  return str
    .split(" ")
    .map((val) => val.split("").reverse().join(""))
    .join(" ");
}

const output = reverseWords2("The quick brown fox.");
console.log(output);
