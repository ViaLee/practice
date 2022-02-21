// const getAsyncData = () =>
//   new Promise((resolve, reject) => {
//     if ("ok") {
//       resolve();
//     } else return reject("error");
//   });

// getAsyncData().then((res) => {
//   console.log(res);
// });

//  传入一个函数，函数有两个回调函数作为参数
//  实例上有then 方法，执行then里的回调
//  有三种状态 pending，fulfilled，rejected
// then（resolve，reject）
// resolve 返回的值作为下一个then回调的参数
// resolve，reject 的调用时机

// 1.then 链式调用

// function fn(res, rej) {
//   try {
//     fn();
//     setTimeout(() => {
//       res();
//     }, 1);
//   } catch (err) {
//     rej(err);
//   }
// }

// 先执行init
// resolve 的时候执行 then

class Promise1 {
  constructor(fn) {
    // fn 的第一个参数 resolve，第二个参数 reject
    // resolve 的时候 调用then
    if (typeof fn !== "function") {
      throw new Error(`Promise resolver ${fn} is not a function`);
    }
    this.fn = fn;
    this.result = undefined;
    this.#init();
    this.thenfn = () => {};
  }

  #init() {
    // 初始化执行fn
    let _this = this;
    this.fn(
      function (x) {
        // 成功回调 then
        _this.result = x;
        _this.resolver();
      },
      function (x) {
        Promise1.Reject(x);
      }
    );
    // 先执行fn
    return this;
  }

  resolver(res) {
    this.result = this.thenfn(this.result);
    res(this.result);
  }

  then(k) {
    // 第一次调 把函数放到预备函数里
    if (typeof k === "function") {
      this.thenfn = k;
    }
    let _this = this;

    return new Promise1((res, rej) => {
      _this.resolver(res);
    });
  }
}

const test = new Promise1((res, rej) => {
  console.log("init");
  setTimeout(() => {
    res("11");
    console.log("resolve后");
  }, 1000);
});

test.then((res) => {
  console.log("1then");
  console.log(res);
  setTimeout(() => {
    console.log("1then2s后");
  }, 2000);
});
// .then((k) => {
//   console.log("2then");
//   console.log(k);
// });
