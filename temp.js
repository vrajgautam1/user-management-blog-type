// console.log("hello world");

// setTimeout(async () => {
//   await Promise.resolve(); // forces this log into microtask queue
//   console.log("hello from setTimeOut");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("hello from promise. i bet it'll execute before setTimeOut");
// });


const fs = require("fs")

// console.log("first")

// process.nextTick(()=>{
//     console.log("second")
// })

// fs.readFile("temp.txt", "utf-8", (err, data)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(data)
// })

// setTimeout(()=>{
//     console.log("third")
// }, 0)

// setImmediate(()=>{
//     console.log("fourth")
// })

// Promise.resolve().then(()=>{
//     console.log("fifth")
// })

// console.log("last")



// fs.writeFile("temp.txt", "hello world", (err)=>{
//     if(err){
//         console.log("operation failed");
//     }else{
//         console.log("file created successfully")
//     }
// })



// console.log("first");

// fs.readFile("temp.txt", "utf8", (err, data) => {
//   if (err) return console.log(err);
//   console.log("file content:", data);
// });

// setTimeout(() => {
//   console.log("third (from setTimeout)");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("fifth (from promise)");
// });

// console.log("starting heavy task");

// // 🔴 Heavy, blocking loop
// for (let i = 0; i < 1e20; i++) {} // Adjust the number if it's too fast or slow

// console.log("finished heavy task");
// console.log("last");

let count = 0;

const interval = setInterval(() => {
  const now = new Date();
  console.log(`⏰ Tick ${++count} at ${now.toLocaleTimeString()}.${now.getMilliseconds()}`);

  if (count === 3) {
    console.log("🚨 Simulating heavy task...");
    const start = Date.now();
    while (Date.now() - start < 3000) {
      // Simulate 3 seconds of CPU-blocking work
    }
    console.log("🧠 Heavy task done");
  }

  if (count >= 6) clearInterval(interval);
}, 1000);

