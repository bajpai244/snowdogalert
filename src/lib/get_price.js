const axios = require("axios");

const config = {
  method: "get",
  url: "https://api.coingecko.com/api/v3/simple/price?ids=snowdog&vs_currencies=usd",
  headers: {},
};

const get_data = async () => {
  return await axios(config)
    .then((response) => {
      return response.data.snowdog.usd;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
module.exports = get_data;
