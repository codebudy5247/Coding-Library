/*

Pattern 1
*****
*****
*****
*****
*****

Pattern 2
*
**
***
****
*****

Pattern 3
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5

Pattern 4
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5

Pattern 5
* * * * * *
* * * * * 
* * * * 
* * * 
* * 
* 

Pattern 6
1 2 3 4 5 6
1 2 3 4 5
1 2 3 4
1 2 3
1 2 
1


Pattern 7
     *     
    ***    
   *****   
  *******  
 ********* 
***********

Pattern 8
***********
 *********
  *******
   ***** 
    ***    
     *
     
Pattern 9
  *  
 ***
***** 
*****  
 ***
  *   

 Pattern 10
  *  
  **
  ***  
  **
  *   
  
Pattern 11
1
01
101
0101
10101
010101


Pattern 12
1          1
12        21
12       321
1234    4321
12345  54321
123456654321

Pattern 13
1
2  3
4  5  6
7  8  9  10
11  12  13  14  15
16  17  18  19  20  21

Pattern 14
A
A B
A B C
A B C D
A B C D E
A B C D E F

Pattern 15
A B C D E F
A B C D E 
A B C D
A B C
A B
A

Pattern 16
A 
B B
C C C
D D D D
E E E E E
F F F F F F

Pattern 17
     A     
    ABA    
   ABCBA   
  ABCDCBA  
 ABCDEDCBA 
ABCDEFEDCBA

Pattern 18
F
E F
D E F
C D E F
B C D E F
A B C D E F

Pattern 19
******
**  **
*    *
*    *
**  **
******

Pattern 20
*    *
**  **
******
**  **
*    *

Pattern 21
******
*    *
*    *
*    *
*    *
******

Pattern 22
3 3 3 3 3 
3 2 2 2 3 
3 2 1 2 3 
3 2 2 2 3 
3 3 3 3 3

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
  