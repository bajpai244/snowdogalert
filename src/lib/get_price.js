const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrap = async (page) => {
  //const browser = await puppeteer.launch({ headless: true });
  //const page = await browser.newPage();
  //{ waitUntil: ["networkidle0", "domcontentloaded"] }
  //); // navigate to url and wait for page loading

  //const $ = cheerio.load(await page.content());

  //const mango = $(".sc-bfYoXt");
  //const price = mango.html();

  //console.log("current_price is", price);

  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  await page.content();

  const $ = cheerio.load(await page.content());
  const d = $(".sc-bfYoXt");
  const price = Number.parseInt(d.html().replace(/,/g, ""));
  console.log("val is", price);
  return price;
};

//const axios = require("axios");

//const config = {
//method: "get",
//url: "https://api.coingecko.com/api/v3/simple/price?ids=snowdog&vs_currencies=usd",
//headers: {},
//};

const get_data = async (page) => {
  return await scrap(page);
  //return await axios(config)
  //.then((response) => {
  //return response.data.snowdog.usd;
  //})
  //.catch((error) => {
  //console.log(error);
  //return false;
  //});
};
module.exports = get_data;
