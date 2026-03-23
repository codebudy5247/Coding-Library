const characters = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    eye_color: "blue",
    gender: "male",
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    eye_color: "yellow",
    gender: "male",
  },
  {
    name: "Leia Organa",
    height: "150",
    mass: "49",
    eye_color: "brown",
    gender: "female",
  },
  {
    name: "Anakin Skywalker",
    height: "188",
    mass: "84",
    eye_color: "blue",
    gender: "male",
  },
];

/**
map
Get an array of all names
Get an array of all heights
Get an array of objects with just name and height properties
Get an array of all first names

reduce
Get the total mass of all characters
Get the total height of all characters
Get the total number of characters in all the character names
Get the total number of characters by eye color (hint. a map of eye color to count)

filter
Get characters with mass greater than 100
Get characters with height less than 200
Get all male characters
Get all female characters

sort
Sort by name
Sort by mass
Sort by height
Sort by gender

every
Does every character have blue eyes?
Does every character have mass more than 40?
Is every character shorter than 200?
Is every character male?

some
Is there at least one male character?
Is there at least one character with blue eyes?
Is there at least one character taller than 200?
Is there at least one character that has mass less than 50?
 */

// map
// Get an array of all names
const names = characters.map((character) => character.name);
console.log(names);

// Get an array of all heights
const heights = characters.map((character) => character.height);
console.log(heights);

// Get an array of objects with just name and height properties
const nameAndHeight = characters.map((character) => ({
  name: character.name,
  height: character.height,
}));
console.log(nameAndHeight);

// Get an array of all first names
const firstNames = characters.map((character) => character.name.split(" ")[0]);
console.log(firstNames);

// reduce
// Get the total mass of all characters
const totalMass = characters.reduce(
  (acc, character) => acc + parseInt(character.mass),
  0
);
console.log(totalMass);

// Get the total height of all characters
const totalHeight = characters.reduce(
  (acc, character) => acc + parseInt(character.height),
  0
);
console.log(totalHeight);

// Get the total number of characters in all the character names
const totalCharacters = characters.reduce(
  (acc, character) => acc + character.name.length,
  0
);
console.log(totalCharacters);

// Get the total number of characters by eye color (hint. a map of eye color to count)
const charactersByEyeColor = characters.reduce((acc, character) => {
  if (acc[character.eye_color]) {
    acc[character.eye_color]++;
  } else {
    acc[character.eye_color] = 1;
  }
  return acc;
}, {});
console.log(charactersByEyeColor);

// filter
// Get characters with mass greater than 100
const massGreaterThan100 = characters.filter(
  (character) => parseInt(character.mass) > 100
);
console.log(massGreaterThan100);

// Get characters with height less than 200
const heightLessThan200 = characters.filter(
  (character) => parseInt(character.height) < 200
);
console.log(heightLessThan200);

// Get all male characters




