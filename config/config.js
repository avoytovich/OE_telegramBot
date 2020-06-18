const { secret } = require('./config.secret.js');

const url = {
  setWebHook: `https://api.telegram.org/bot${secret}/setwebhook`,
  sendMessage: `https://api.telegram.org/bot${secret}/sendMessage`,
};

module.exports = {
  url,
};
