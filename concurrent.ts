// 并发问题 滑动窗口  队列
// 遍历所有请求，存入list
// 取前4个请求，执行
// 每执行一个将下一个请求存入队列
// const requestQueue = [];
// const maxQureue = 4;

// export function handleRequest(request) {
//   // 处理执行函数
// }

// export function handleRequestQueue() {
//   // 存入未执行的请求
// }

class RequestQueue {
  constructor(maxConcurrent: number) {
    this.maxConcurrent = maxConcurrent;
    this.currentConcurrent = 0; //当前并发数
    this.queue = []; //请求队列
  }

  add(request) {
    // 添加请求
    // 放promise中 是为什么
    return new Promise((resolve, reject) => {
      // promise 链式调用 记录请求状态
      this.queue.push({
        request,
        resolve,
        reject,
      });
      this.processQueue();
    });
  }
  // 循环处理队列
  processQueue() {
    // 获取未执行的请求
    if (this.queue.length > 0 && this.queue.length < this.maxConcurrent) {
      const { request, resolve, reject } = this.queue.shift();
      this.currentConcurrent++;
      request()
        .then(resolve, reject)
        .catch(reject)
        .finally(() => {
          this.currentConcurrent--;
          this.processQueue();
        });
    }
  }
}

// 示例请求
function fetchData(url) {
  return fetch(url).then((res) => res.json());
}

// 请求队列
const requestQueue = new RequestQueue(5);

const urls = [
  "https://api.example.com/data1",
  "https://api.example.com/data2",
  "https://api.example.com/data3",
  "https://api.example.com/data4",
  "https://api.example.com/data5",
  "https://api.example.com/data6",
  "https://api.example.com/data7",
  "https://api.example.com/data8",
];

const requests = urls.map((url) => fetchData(url));

Promise.all(requests.map((reqest) => requestQueue.add(reqest)))
  .then((results) => {
    console.log("所有请求完成", results);
  })
  .catch((error) => {
    console.error("请求失败:", error);
  });

// 节流防抖
// 防抖 debounce
function debounce(fn, delay) {
  let timer: number;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
