console.log("1️⃣ Hello 👋");  

setTimeout(() => {  
  console.log("2️⃣ Timeout ⏳");  
}, 5000);  

Promise.resolve().then(() => {  
  console.log("3️⃣ Promise ✅");  
});  

console.log("4️⃣ Goodbye 👋");  

/*
1️⃣ Hello 👋
4️⃣ Goodbye 👋
3️⃣ Promise ✅
2️⃣ Timeout ⏳
*/