const { secret } = require('./config.secret.js');

module.exports = {
  url: {
    setWebHook: `https://api.telegram.org/bot${secret}/setwebhook`,
    sendMessage: `https://api.telegram.org/bot${secret}/sendMessage`,
  },
};
