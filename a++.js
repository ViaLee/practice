let a = 10;
function fn() {
  console.log(a);
}
function fn1() {
  console.log(++a);
}
function fn2() {
  console.log(a++);
}

function fn3() {
  setTimeout(fn2, 0);
}

fn(); //10
fn1(); //11
fn(); //11
fn2(); //11
fn(); //12
