// 柯里化作用是 拆分参数
// 实现的核心思想是 收集参数
// 递归中去判断当前收集的参数和函数的所有入参 是否相等，长度一致即可执行函数运算
// 需要支持结果缓存， add(1)(2)执行之后再add(3)(4)，需要用前一个函数的结果

// 闭包   fn(a,b,c,d) => fn(a)(b)(c)(d);
// const curryFn = (arg) => {
//   let args = [];
//   args.push(arg);

//   const fn = () => {};

//   if (arg) return fn;
// };

const curry = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
    // 参数数量满足函数的参数数量，执行函数
  } else {
    // 参数数量不满足
    return (...args2) => {
      return curry(fn, ...args, ...args2);
    };
  }
};

const add = (a, b, c, d) => {
  return a + b + c + d;
};

const addCurry = curry(add);
const sum1 = addCurry(1)(2)(3)(4);
console.log(sum1, "sum1");
const sum2 = addCurry(1, 2)(3)(4);
console.log(sum2, "sum2");
