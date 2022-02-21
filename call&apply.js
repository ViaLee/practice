// https://github.com/mqyqingfeng/Blog/issues/11

// 给指定为this的对象新增一个function，即为被call的函数，如果有参数也传给它，并执行它，然后删除

let fooo = {
  value: "fooo",
};

function bar() {
  console.log(this.value);
}

bar.call(fooo);

// ---------模拟call的效果---------

let foo1 = {
  value: 1,
  bar: function () {
    console.log(this.value);
  },
};

foo1.bar();

delete foo1.bar;

// ----------------------------

let foo2 = {
  value: 2,
};
foo2.fn = function () {
  console.log(this.value);
};

foo2.fn();

delete foo2.fn;

// ----------single------------------

Function.prototype.myCallSingle = function (k) {
  console.log(k); //传入的对象
  k.fn = this;
  k.fn();
  delete k.fn;
};

let callTestFoo1 = {
  value: 1,
};

function bar1() {
  console.log(this.value);
}

bar1.myCallSingle(callTestFoo1);

// -----------multy--------------

Function.prototype.myCall = function () {
  console.log(...arguments); //传入的对象
  let args = [...arguments];
  let k = args[0] || window; // this 设为null 时 为window
  args.shift();
  k.fn = this;
  k.fn(...args);
  delete k.fn;
};

let callTestFoo = {
  value: 1,
};

function bar2(t, s) {
  console.log(this.value, t, s);
}

bar2.myCall(callTestFoo, "kkk", 12);

// -------------apply----------------
Function.prototype.myApply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}