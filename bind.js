// bind() 方法会创建一个新函数。
// 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this
// 之后的一序列参数将会在传递的实参前传入作为它的参数。
function bar() {
  console.log(this.value);
}

let foo = {
  value: 1,
};

let barbind = bar.bind(foo);
barbind();

// --------------------------

// Function.prototype.myBind = function (k) {
//   let self = this;
//   return self.apply(k);
// };

// --------------------------
Function.prototype.myBind = function (k) {
  let args = arguments;
  console.log(args);
  let self = this;
  return self.apply(...args);
};

let barbind1 = bar.myBind(foo);
barbind1();
