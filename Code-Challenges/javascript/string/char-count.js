const count = (s) => {
  const obj = {};
  for (const char of s) {
    // obj[char] = (obj[char] || 0) + 1;
    if (obj[char]) {
      obj[char]++;
    } else {
      obj[char] = 1;
    }
  }
  return obj;
};

console.log(count("hello world"));
