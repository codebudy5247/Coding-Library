/*
You are given an integer N. You need to convert all zeroes of N to 5.
I/P 1004
O/P 1554

I/P 121
O/P 121
*/

const convertFive = (n) => {
  var Result = [];
  var num1 = n.toString();
  var output = [];
  for (let i = 0; i < num1.length; i++) {
    output.push(num1.charAt(i));
  }
  for (let i = 0; i < output.length; i++) {
    if (output[i] === "0") {
      output[i] = "5";
      Result.push(Math.floor(output[i]));
    } else {
      Result.push(Math.floor(output[i]));
    }
  }
  return Result;
};

console.log("1004:",convertFive(1004));
