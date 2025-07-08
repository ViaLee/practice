// 一 。 先思考下列代码的执行顺序
const fs = require("fs");
// const start = Date.now();

// setTimeout(() => {
//   console.log("setTimeout exec", Date.now() - start);
// }, 0);

// setImmediate(() => {
//   console.log("setImmediate");
// });
// // setTimeout远比setImmediate耗时多得多，但是最终执行顺序 不确定 与运行速度有关

// fs.readFile("./index.js", "utf-8", (err, data) => {
//   console.log("file read");
//   const start = Date.now();
//   while (Date.now() - start < 300) {}
// });

// 回调先执行

// 二。说说下边代码的执行顺序，先打印哪个？
// fs.readFile("./poll.js", () => {
//   setTimeout(() => console.log("setTimeout"), 0);
//   setImmediate(() => console.log("setImmediate"));
// });
// 先执行setImmediate

// 三。 先思考下列代码的执行顺序 微任务
// nextTick与Promise比较，nextTick的级别更高
// setImmediate(() => {
//   console.log("setImmediate");
// });

// process.nextTick(() => {
//   console.log("nextTick 1");
//   process.nextTick(() => {
//     console.log("nextTick 2");
//   });
// });

// console.log("global");

// Promise.resolve().then(() => {
//   console.log("promise 1");
//   process.nextTick(() => {
//     console.log("nextTick in promise");
//   });
// });

// global
//nextTick 1
// promise 1
// nextTick in promise
// nextTick 2
// setImmediate

// 四。poll nextTick

console.log("四");
setImmediate(() => {
  console.log("setImmediate");
});

fs.readFile("./index.js", "utf-8", (err, data) => {
  console.log("file read1");
});

process.nextTick(() => {
  console.log("nextTick 1");
});

fs.readFile("./index.js", "utf-8", (err, data) => {
  console.log("file read2");
});

process.nextTick(() => {
  console.log("nextTick 2");
});
// nextTick 1
// nextTick 2
// file read2
// setImmediate

// 五。
async function async1() {
  console.log("async start");
  await async2();
  console.log("async end");
}

async function async2() {
  console.log("async2");
}
console.log("script start");

setTimeout(() => {
  console.log("setTimeout 0");
}, 0);

setTimeout(() => {
  console.log("setTimeout 3");
}, 3);

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

async1();

new Promise((res) => {
  console.log("promise1");
  res();
  console.log("promise2");
}).then(() => {
  console.log("promise 3");
});

console.log("script end");

// script start
// async start
// async2
// promise1;
// promise2
// script end
// nextTick
// async end
// promise3
// setImmediate
// setTimeout0
// setTimeout3
