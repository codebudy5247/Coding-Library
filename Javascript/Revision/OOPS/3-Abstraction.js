//Abstraction

const Book = function(getTitle, getAuthor) { 
    // Private variables / properties  
    let title = getTitle; 
    let author = getAuthor;
 // Public method 
    this.giveTitle = function() {
       return title;
    }
    
    // Private method
    const summary = function() {
       return `${title} written by ${author}.`
    }
 // Public method that has access to private method.
    this.giveSummary = function() {
       return summary()
    } 
 }
 const book1 = new Book('Hippie', 'Paulo Coelho');
console.log(book1.giveTitle())
 
 //book1.summary()  is not a function

console.log(book1.giveSummary());
 