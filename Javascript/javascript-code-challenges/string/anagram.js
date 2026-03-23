/*
Given two strings str1 and str2, determine if str2 is an anagram of str1 and return true if it is, and 
false otherwise.

An anagram is a word or phrase formed by rearranging the letters of another word or phrase, using all the 
original letters exactly once. For example, the words listen and silent are anagrams because they use the 
same letters with the same frequency, but in a different order.

Input: str1 = "abcd", str2 = "dcba"
Output: true

Input: str1 = "hello", str2 = "bello"
Output: false

*/

function isStringAnagram(a, b) {
  if (a.length != b.length) {
    return false;
  }
  a = a.split("").sort().join("");
  b = b.split("").sort().join("");

  return a === b;
}

function isStringAnagram1(a, b) {
  if (a.length != b.length) {
    return false;
  }

  let map = new Map();
  for (let i = 0; i < a.length; i++) {
    if (map.has(a[i])) {
      map.set(a[i], map.get(a[i]) + 1);
    } else {
      map.set(a[i], 1);
    }
  }
  for (let i = 0; i < b.length; i++) {
    if (map.has(b[i])) {
      map.set(b[i], map.get(b[i]) - 1);
    }
  }
  let keys = map.keys();
  for (let key of keys) {
    if (map.get(key) != 0) {
      return false;
    }
  }
  return true;
}

console.log(isStringAnagram("abcd", "dcba")); // true
console.log(isStringAnagram("hello", "bello")); // false

console.log(isStringAnagram1("abcd", "dcba")); // true
console.log(isStringAnagram1("hello", "bello")); // false