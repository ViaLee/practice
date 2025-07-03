// 请实现一个简单的发布订阅机制
const target = new EventDispatcher();

class EventDispatcher {
  constructor() {
    this.eventList = {}; // {a:[fn]}
  }

  on(name, fn) {
    //addEvent
    if (this.eventList[name]) {
      this.eventList[name].push(fn);
    } else {
      this.eventList[name] = [fn];
    }
  }

  emit(name) {
    //trigger
    if (this.eventList?.[name]) {
      this.eventList[name].forEach((f) => {
        f.call(this);
      });
    }
  }

  off(name, fn) {
    const index = this.eventList[name].indexof(fn);
    if (index !== -1) {
      this.eventList[name].splice(index, 1);
    }
  }

  once(name, fn) {
    const one = (...args) => {
      fn(...args);
      this.off(name, one);
    };
    this.on(name, one);
  }
}

target.on("a", function () {
  console.log("a", this);
});
target.emit("a");
