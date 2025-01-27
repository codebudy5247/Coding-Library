// function statement aka function declaration
function greet() {
    console.log('hi');
}

// function expression
var greetMe = function() {
    console.log('Hi Tony');
}

// anonymous function  - used as a value
// function(){

// }  Gives Syntax error:function statements require a function name

// named function expression
var greetYou = function greetYou() {
    console.log('Hello Tony');
}

// parameters vs arguments
function greet(param1, param2) {
    console.log(param1 + ' ' + param2);
}


// first class functions
function logGreeting(fn) {
    fn();
}

// arrow function
var greetMe = () => {
    console.log('Hi Tony');
}