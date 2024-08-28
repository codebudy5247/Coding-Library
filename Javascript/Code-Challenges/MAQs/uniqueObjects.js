/*
Get unique objects in array.
[{name:"sai"},{name:"Nang"},{name:"sai"},{name:"Nang"},{name:"111111"}]
*/

function uniqueObjects(arr) {
  const uniqueObjects = [];
  const seenNames = [];

  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (!seenNames.includes(obj.name)) {
      seenNames.push(obj.name);
      uniqueObjects.push({ name: obj.name });
    }
  }

  return uniqueObjects;
}

console.log(
  uniqueObjects([
    { name: "sai" },
    { name: "Nang" },
    { name: "sai" },
    { name: "Nang" },
    { name: "111111" },
  ])
);
