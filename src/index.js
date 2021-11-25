const Fixed_Stack = require("./lib/fixed_stack");
const get_price = require("./lib/get_price");

// base price against which to compare, ex:-> 1200 means 1200 USD
const base_price = 1300;

const Stack = new Fixed_Stack();

const logic = async () => {
  const current_price = await get_price();
  Stack.add_data(current_price);

  if (current_price - base_price >= 100) {
    console.log(
      "the price increased by more than or equal to 100 in relation to base price"
    );

    // plays a console beep sound for 10 seconds
    for (i = 0; i < 10; i++) console.log("\u0007");

    Stack.print_current_price();
    Stack.print_last_5_price();
  }
};

(() => {
  console.log("started, prices fetched every 5 seconds 🚀");
  setInterval(logic, 5000);
})();
