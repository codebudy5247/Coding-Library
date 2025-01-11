// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout); // Clear the previous timeout
    timeout = setTimeout(() => func.apply(this, args), delay); // Set a new timeout
  };
}

// Function to handle search
function handleSearch(event) {
  const query = event.target.value;
  document.getElementById("result").innerText = `Searching for: ${query}`;
}

// Attach the debounced function to the input event
const searchInput = document.getElementById("searchInput");
const debouncedSearch = debounce(handleSearch, 500); // 500ms delay
searchInput.addEventListener("input", debouncedSearch);
