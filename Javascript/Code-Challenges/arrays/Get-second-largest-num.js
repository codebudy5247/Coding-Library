/**
 * [2 4 4 6 5]  ==> 5
 * [10,5,10] ==> 5
 */

/**
 * Returns the second largest number in an array.
 * @param {number[]} arr - The input array.
 * @returns {number} The second largest number in the array, or -1 if there is no second largest number.
 */
function secondLargestNumber(arr){
  const uniqueElement = Array.from(new Set(arr))
  
  if(arr.length > 2){
    uniqueElement.sort((a,b) => b-a)
  } else {
    return -1
  }
  return uniqueElement[1]
}

console.log(secondLargestNumber([2,6,5,9,3,9]))
console.log(secondLargestNumber([10,5,10]))
