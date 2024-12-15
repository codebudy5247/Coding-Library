// Bubbling
let div1 = document.querySelector("#div1");
let div2 = document.querySelector("#div2");
let div3 = document.querySelector("#div3");

div1.addEventListener("click", function (event) {
  alert("Component 1 event clicked");
});

div2.addEventListener("click", function (event) {
  alert("Component 2 event clicked");
});

div3.addEventListener("click", function (event) {
  alert("Component 3 event clicked");
});

//Capturing
let div4 = document.querySelector("#div4");
let div5 = document.querySelector("#div5");
let div6 = document.querySelector("#div6");

div4.addEventListener(
  "click",
  function (event) {
    alert("Component 1 event clicked");
  },
  true
);

div5.addEventListener(
  "click",
  function (event) {
    alert("Component 2 event clicked");
  },
  true
);

div6.addEventListener(
  "click",
  function (event) {
    alert("Component 3 event clicked");
  },
  true
);
