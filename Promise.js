/*
       init
             then（fn）                            then（fn）
                  new promise2 list1里存thenfn1         new promise3 list2里存fn
                               setTimeout(()=>{
                                 fn()
                                 promise2的resolve()
                               },0)                      setTimeout(fn,0)
   异步完成,执行promise1的resolve: 遍历执行list1，thenfn1
                                            执行fn()
                                            执行resolve2：遍历执行list2，thenfn2

*/


const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise1 {
  constructor(fn) {
    // fn 的第一个参数 resolve，第二个参数 reject
    // resolve 的时候 调用then
    if (typeof fn !== "function") {
      throw new Error(`Promise resolver ${fn} is not a function`);
    }
    this.status = PENDING;
    this.result = undefined;
    this.thenList = []; //[setTimeout(()=>{than1},0),setTimeout(()=>{than2},0)]

    fn(
      function (x) {
        this.thenList[0]();
      },
      function (e) {}
    );
  }

  resolver(result, res, rej) {
    res(result);
  }
  // 1. 把成功回调 存入队列中等待执行
  then(fn) {
    let _this = this;

    return new Promise1((res, rej) => {

      if (this.status === PENDING) {
        _this.thenList.push(() => {
          setTimeout(() => {
            let result = fn(_this.result);
            // _this.resolver(result, res, rej);
            res(result);
          }, 0);
        });
      }

    });
  }
}
// 执行顺序：先把所有then 都存一遍
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
