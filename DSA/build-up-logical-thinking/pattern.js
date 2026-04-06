class PrintPatterns {
  pattern1(N) {
    // Outer loop to handle rows
    for (let i = 0; i < N; i++) {
      let row = ""; // Initialize an empty string for the row
      // Inner loop to handle columns for each row
      for (let j = 0; j < N; j++) {
        // Add a star followed by a space to the row string
        row += "* ";
      }
      // Print the complete row
      console.log(row);
    }
  }
  pattern2(N) {
    
  }
}

// Driver code
const sol = new PrintPatterns();
const N = 5;
sol.pattern1(N);
