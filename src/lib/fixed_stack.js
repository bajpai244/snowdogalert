// a fixed stack of 5 length to store the last 5 prices

class Stack {
  stack = [];
  constructor() {
    this.stack = [
      "undefined",
      "undefined",
      "undefined",
      "undefined",
      "undefined",
    ];
  }

  add_data(price) {
    this.stack.unshift(price);
    this.stack.pop();
  }

  print_current_price() {
    console.log("the current price is", this.stack[0]);
  }

  print_last_5_price() {
    console.log("the last 5 prices were");

    this.stack.forEach((price) => {
      console.log(price);
    });
  }
}

module.exports = Stack;
