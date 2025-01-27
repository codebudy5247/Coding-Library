// "use strict"
/*
crush -> window
bewafa gf -> function
bf1 -> obj1
bf2 -> obj2
*/
// "this" is point to object or undefined

/*
Non strict mode:
--> in global scope it points to crush(window)
--> if bf is present then point to bf(ob1,obj2) else point to crush(window)
--> change bf using call/apply
--> bind get the gf married to bf
--> async callback get executed wrt to global object
*/

/*
Strict mode:
--> in global scope it points to crush(window)
--> if bf is present then point to bf(ob1,obj2) else point to undefined
--> change bf using call/apply
--> bind get the gf married to bf
--> async callback get executed wrt to global object
*/

// global
// console.log(this); //window

// called wrt to gf
function gfFunction() {
  console.log(this);
}
// gfFunction();
// window.gfFunction();

// caled wrt to bf
let bfObj = {
  name: "john",
  age: 21,
  gfFunction: function () {
    console.log(this); // { name: 'john', age: 21, gfFunction: [Function: gfFunction] }
  },
};

bfObj.gfFunction();

// Called wrt to window by passing reference

const getRefFun = bfObj.gfFunction;
// getRefFun() // window

// Call,apply and bind
const bf1Obj = {
  name: "Mark",
  age: 30,
  car: "Ola auto",
  gfFunction: function (a, b) {
    console.log(a, b, this);
  },
};

const bf2Obj = {
  name: "Amit",
  age: 24,
  car: "Mercedes",
  gfFunction: function (a, b) {
    console.log(a, b, this);
  },
};

bf1Obj.gfFunction(1, 2); // bf1Obj

bf1Obj.gfFunction.call(bf2Obj, 1, 2); // bf2Obj change the obj reference

bf1Obj.gfFunction.apply(bf2Obj, [1, 2]); // bf2Obj

const wifeFunction = bf1Obj.gfFunction.bind(bf1Obj);
wifeFunction(); // undefined undefined { name: 'mark', age: 30, car:"Ola auto", gfFunction: [Function: gfFunction] }

// When this is present inside async function/callback
const obj = {
  value: 42,
  regularMethod: function () {
    console.log(this) // this -> obj
    setTimeout(function () {
      console.log("Regular method this:", this.value);
    }, 1000);
  },
};
obj.regularMethod();
