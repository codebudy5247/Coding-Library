const fruitList = document.getElementById("fruitList");

// Add a single event listener to the parent element
fruitList.addEventListener("click", function (event) {
  // Check if the clicked target is a list item (li)
  if (event.target.tagName === "LI") {
    alert("You clicked on: " + event.target.textContent);
  }
});

/**
 Instead of attaching individual click event listeners to each li item, we attach a single click listener
 to the parent <ul> element.
 When any of the li items is clicked, the event bubbles up to the parent element (ul), which is where we 
 handle the event.
 event.target refers to the specific element that was clicked, allowing us to check if it's an li and 
 perform the appropriate action.
 */