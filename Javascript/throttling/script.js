// Throttling function implementation
function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function () {
    const context = this;
    const args = arguments;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Usage example: Throttle the scroll event
const status = document.getElementById("status");

function updateScrollPosition() {
  status.textContent = `Scroll Position: ${window.scrollY}`;
}

const throttledScroll = throttle(updateScrollPosition, 200);

window.addEventListener("scroll", throttledScroll);
