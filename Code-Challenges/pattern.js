/*

Pattern 1
*****
*****
*****
*****
*****

*/

const pattern1 = (n) => {
  let string = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      string += "*";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern1(5));

/*

Pattern 2
*
**
***
****
*****

*/

const pattern2 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      string += "*";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern2(5));

/*

Pattern 3
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5

*/

const pattern3 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      string += j + " ";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern3(5));

/*

Pattern 4
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5

*/

const pattern4 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      string += i + " ";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern4(5));

/*

Pattern 5
* * * * * *
* * * * *
* * * *
* * *
* *
*

*/

const pattern5 = (n) => {
  let string = "";
  for (let i = n; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      string += "* ";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern5(6));

/*

Pattern 6
1 2 3 4 5 6
1 2 3 4 5
1 2 3 4
1 2 3
1 2
1

*/

const pattern6 = (n) => {
  let string = "";
  for (let i = n; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      string += j + " ";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern6(6));

/*

Pattern 7
     *     
    ***    
   *****   
  *******  
 ********* 
***********

*/

const pattern7 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    let spaces = " ".repeat(n - i);
    let stars = "*".repeat(2 * i - 1);
    string += spaces + stars + "\n";
  }
  return string;
};

console.log(pattern7(6));

/*

Pattern 8
***********
 *********
  *******
   *****
    ***    
     *
     
*/

const pattern8 = (n) => {
  let string = "";
  for (let i = n; i > 0; i--) {
    let spaces = " ".repeat(n - i);
    let stars = "*".repeat(2 * i - 1);
    string += spaces + stars + "\n";
  }
  return string;
};

console.log(pattern8(6));

/*

Pattern 9
  *  
 ***
*****
*****  
 ***
  *   

*/

const pattern9 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    let spaces = " ".repeat(n - i);
    let stars = "*".repeat(2 * i - 1);
    string += spaces + stars + "\n";
  }
  for (let i = n - 1; i > 0; i--) {
    let spaces = " ".repeat(n - i);
    let stars = "*".repeat(2 * i - 1);
    string += spaces + stars + "\n";
  }
  return string;
};

console.log(pattern9(5));

/*

Pattern 10
  *  
  **
  ***  
  **
  *   

*/

const pattern10 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    let spaces = " ".repeat(n - i);
    let stars = "*".repeat(i);
    string += spaces + stars + "\n";
  }
  for (let i = n - 1; i > 0; i--) {
    let spaces = " ".repeat(n - i);
    let stars = "*".repeat(i);
    string += spaces + stars + "\n";
  }
  return string;
};

console.log(pattern10(5));

/*

Pattern 11
1
01
101
0101
10101
010101

*/

const pattern11 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      string += (i + j) % 2;
    }
    string += "\n";
  }
  return string;
};

console.log(pattern11(6));

/*

Pattern 12
1          1
12        21
12       321
1234    4321
12345  54321
123456654321

*/

const pattern12 = (n) => {
  let string = "";
  for (let i = 1; i <= n; i++) {
    let left = "";
    let right = "";
    for (let j = 1; j <= i; j++) {
      left += j;
    }
    for (let j = i; j > 0; j--) {
      right += j;
    }
    let spaces = " ".repeat(2 * (n - i));
    string += left + spaces + right + "\n";
  }
  return string;
};

console.log(pattern12(6));

/*

Pattern 13
1
2  3
4  5  6
7  8  9  10
11  12  13  14  15
16  17  18  19  20  21

*/

const pattern13 = (n) => {
  let string = "";
  let count = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      string += count + " ";
      count++;
    }
    string += "\n";
  }
  return string;
};

console.log(pattern13(6));

/*

Pattern 14
A
A B
A B C
A B C D
A B C D E
A B C D E F

*/

const pattern14 = (n) => {
  let string = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      string += String.fromCharCode(65 + j) + " ";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern14(6));

/*

Pattern 15
A B C D E F
A B C D E 
A B C D
A B C
A B
A

*/

const pattern15 = (n) => {
  let string = "";
  for (let i = n; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      string += String.fromCharCode(65 + j) + " ";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern15(6));

/*

Pattern 16
A 
B B
C C C
D D D D
E E E E E
F F F F F F

*/

const pattern16 = (n) => {
  let string = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      string += String.fromCharCode(65 + i) + " ";
    }
    string += "\n";
  }
  return string;
};

console.log(pattern16(6));

/*

Pattern 17
     A     
    ABA    
   ABCBA   
  ABCDCBA  
 ABCDEDCBA 
ABCDEFEDCBA

*/

const pattern17 = (n) => {
  let string = "";
  for (let i = 0; i < n; i++) {
    let spaces = " ".repeat(n - i - 1);
    let left = "";
    for (let j = 0; j <= i; j++) {
      left += String.fromCharCode(65 + j);
    }
    let right = left.slice(0, -1).split