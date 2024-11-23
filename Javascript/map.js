// -> Maps are ordered list of key value pair where key as well as value can be of any type.
// -> let map = new Map([iterable]);

// If an Iterable object like Array(arrays with two elements, e.g. [[ 1, ‘one’ ],[ 2, ‘two’ ]]) whose 
// elements are key-value pairs is passed then all its items will be added to the Map.

// null values are treated as undefined.

let map = new Map();
map.set(5, 'aditya');
map.set('5', 'shekhar');
console.log(map.size);
console.log(map.get(5));
console.log(map.get('5'));

let map2 = new Map([["name", "aditya"], ["age", 23]]);
console.log(map2.size);
console.log(map2.get('name'));