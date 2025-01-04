/*
Program to find longest word in a string.
"i love comp programming" ==> programming
*/

function longestWord(str) {
  let sortedArray = str
    .split(" ")
    .sort((wordA, wordB) => wordB.length - wordA.length);
  return sortedArray[0];
}
console.log(longestWord("i love comp programming"));
