/*
Check whether a string is palindrome or not.
"aditya" ==> false
"madam" ==> true
*/

function isPalindrome(str) {
  let string = str.split("").reverse().join("");
  if (str === string) return true;
  else return false;
}

// without built in function.
function reverse(str) {
  let rev_str = "";
  for (let i = str.length - 1; i >= 0; i--) {
    rev_str += str[i];
  }
  return rev_str;
}

function is_palindrome(str) {
  reverse_str = reverse(str);
  if (reverse_str === str) {
    return true;
  } else {
    return false;
  }
}

console.log(is_palindrome("madam"));
console.log(is_palindrome("aditya"));
console.log(is_palindrome("Madam In Eden, Im Adam"));
