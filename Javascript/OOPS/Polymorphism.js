/**
 * Polymorphism
 */

let book1 = function () {};
book1.prototype.summary = function () {
  return "summary of book1";
};
let book2 = function () {};
book2.prototype = Object.create(book1.prototype);
book2.prototype.summary = function () {
  return "summary of book2";
};
let book3 = function () {};
book3.prototype = Object.create(book1.prototype);
book3.prototype.summary = function () {
  return "summary of book3";
};

var books = [new book1(), new book2(), new book3()];
books.forEach(function (book) {
  console.log(book.summary());
});
