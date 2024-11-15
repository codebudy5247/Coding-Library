//prototype based inheritance

let obj1 = {
  a: 10,
  b: 20,
  c: 30,
  d: function () {
    return this.c;
  },
};

//Object.create->object to object inheritance
let obj2 = Object.create(obj1);
//obj2._proto_ //for debugging purpose only
//Object{a:10 ,b:20 ,c:30}
console.log(obj2.d());
obj2.p = "adg";
obj2.q = "dgn";
obj2.r = "dfn";

let obj3 = Object.create(obj2);
console.log(obj3.p); // obj3.__proto__ == obj2
console.log(obj3.a); // obj3.__proto__.__proto__ == obj1

/* 
    obj2.a -> it will try to find a in obj2
        -> if not found, 
        -> it will try to find it in obj2.__proto__
        -> if not found,
        -> it will try to find it in obj2.__proto__.__proto__
        -> ... and so on... 
        -> till .__proto__ becomes null
*/
