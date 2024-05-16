/**
 * You are given a string of varying word counts. The goal of the function is to reverse every
 * word in the string and return it.
 * input:  'The quick brown fox jumps over the lazy dog.'
 * output: 'ehT kciuq nworb xof spmuj revo eht yzal .god'
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
  
  const output = reverseWords("The quick brown fox jumps over the lazy dog.");
  
  console.log(output);
  