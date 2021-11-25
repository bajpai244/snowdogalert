/** @format */

// change the delta from here
const delta = 1;

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

// ---------------- slack code ------------------

const _ = require("ramda");
const { App } = require("@slack/bolt");

const dotenv = require("dotenv");
dotenv.config();

const { WebClient, LogLevel } = require("@slack/web-api");

const oauth_token = process.env.OAUTH_TOKEN;
const app_token = process.env.APP_TOKEN;

const client = new WebClient(oauth_token, {
  logLevel: LogLevel.DEBUG,
});

const app = new App({
  token: oauth_token,
  appToken: app_token,
  socketMode: true,
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app started");
})();

const send_message = (previous_price, current_price) => {
  client.chat.postMessage({
    channel: "U02MPAWDAG4",
    text: `price alert 🚨, previous_price = ${previous_price}, current_price = ${current_price}} `,
  });
};

// ------------- end of slack code -----------------

const Fixed_Stack = require("./lib/fixed_stack");
const get_price = require("./lib/get_price");

// base price against which to compare, ex:-> 1200 means 1200 USD
const base_price = 1300;

const Stack = new Fixed_Stack();

const logic = async (page) => {
  const current_price = await get_price(page);
  Stack.add_data(current_price);
  const previous_price = Stack.stack[1];

  if (
    current_price - previous_price >= delta &&
    previous_price != "undefined"
  ) {
    console.log(
      "the price increased/decreased by more than or equal to 100 in relation to previous_price"
    );

    send_message(previous_price, current_price);

    // plays a console beep sound for 10 seconds
    //for (i = 0; i < 10; i++) console.log("\u0007");

    //Stack.print_current_price();
    //Stack.print_last_5_price();
  }
};

(async () => {
  const browser = await puppeteer.launch({ headless: !true });
  const page = await browser.newPage();

  await page.goto(
    "https://traderjoexyz.com/#/trade?inputCurrency=0x130966628846bfd36ff31a822705796e8cb8c18d&outputCurrency=0xdE9E52F1838951e4d2bb6C59723B003c353979b6"
  );

  await page.content();

  console.log("started, prices fetched every 5 seconds 🚀");
  setInterval(async () => {
    //console.log("val from console.log", await get_price(page));
    await logic(page);
  }, 5 * 1000);
})();
