/*
Given two strings.Find if one string can be formed by rearranging the letters of other 
strings.
str1 = "geeksforgeeks"  str2 = "geegeeksksfor" ==> true
str1 = "geeksfor"  str2 = "geeekfor" ==> false
*/

function rearrangeStr(str1, str2) {
  let l1 = str1.length;
  let l2 = str2.length;

  if (l1 != l2) return false;

  
}

console.log(rearrangeStr("geeksforgeeks", "geegeeksksfor"));
