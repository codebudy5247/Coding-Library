//Encapsulation

/** Encapsulation in JavaScript is a concept that involves bundling data (attributes) and the
    methods (functions) that operate on that data into a single unit, known as an object. 
    This bundling restricts direct access to some of the object's components, preventing 
    unintended interference and misuse. 
    Encapsulation helps in organizing and managing the complexity of code and promotes the 
    principle of data hiding, where the internal details of an object are hidden from 
    external code. */
const Book = function (t, a) {
  let title = t;
  let author = a;

  return {
    Summary: function () {
      console.log(`${title} written by ${author}`);
    },
  };
};
const book1 = new Book("hippie", "Paul");
book1.Summary();

/**
 * title and the author are only visible inside the scope of the function Book and the method
 * summary is visible to the caller of Book.
 * So the title and the author are encapsulated inside Book.
 */
