/*You are given an integer N. You need to convert all zeroes of N to 5.
   I/P 1004
   O/P 1554

   I/P 121
   O/P 121
*/

/*
Algo:
1.Create a variable sum = 0 to store the sum, place = 1 to store the place value of current 
  digit and create a copy of input variable.
2.If the number is zero return 5
3.Iterate the next step while the input variable is greater than 0
4.Extract the last digit (n%10) and if the digit is zero, then update sum = sum + place*5, 
  remove the last digit from the numbern = n/10 and update place = place * 10
5.Return the sum.
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
