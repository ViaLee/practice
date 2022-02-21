// 必须符合Promise/A+规范
// 1、必须处于3种状态 pending fulfilled rejected
// 2、提供then方法，接收两个参数，返回一个promise对象
//  Implementations may allow promise2 === promise1, provided the implementation meets all requirements. Each implementation should document whether it can produce promise2 === promise1 and under what conditions.

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    // 默认状态为 PENDING
    this.status = PENDING;
    // 存放成功状态的值
    this.value = undefined;
    // 存放失败状态的值
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];
    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        console.log(this.onResolvedCallbacks);
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // executor可能报错，需要 try catch 如果报错直接reject
    try {
      // 立即执行
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }
  resolvePromise = (x, resolve, reject) => {
    // 如果返回值还是Promise
    if (x instanceof MyPromise) {
      try {
        // 就把这次的值传递给下个Promise
        x.then(
          (y) => {
            resolve(y);
          },
          (r) => {
            reject(r);
          }
        );
      } catch (e) {
        reject(e);
      }
    } else {
      resolve(x);
    }
  };

  // // 简化版，不能链式调用
  // // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  // then(onFulfilled, onRejected) {
  //   // 如果promise已经完成，直接执行成功的回调
  //   if (this.status === FULFILLED) {
  //     onFulfilled(this.value)
  //   }

  //   if (this.status === REJECTED) {
  //     onRejected(this.reason)
  //   }

  //   if (this.status === PENDING) {
  //     // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
  //     this.onResolvedCallbacks.push(() => {
  //       onFulfilled(this.value)
  //     })

  //     // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
  //     this.onRejectedCallbacks.push(() => {
  //       onRejected(this.reason)
  //     })
  //   }
  // }

  then(onFulfilled, onRejected) {
    // 每次调用 then 都返回一个新的 promise  Promise/A+ 2.2.7
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            // x可能是一个proimise
            this.resolvePromise(x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            this.resolvePromise(x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 这里拿到回调的返回值
              let x = onFulfilled(this.value);  // ?
              this.resolvePromise(x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              this.resolvePromise(x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

new MyPromise((res, rej) => {
  console.log("------");
  setTimeout(() => {
    console.log("开始回调了");
    res(333);
  }, 3000);
})
  .then((res) => {
    console.log('拿到了回调的值', res)
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(111111)
      }, 3000)
    })
  })
  .then((res) => {
    console.log("拿到了第二次回调", res);
    return 99999;
  })
  .then((res) => {
    console.log("同步的值", res);
  });
