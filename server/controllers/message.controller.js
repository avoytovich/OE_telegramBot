const axios = require('axios');
const Reply = require('../helper/reply.message');
const { secret } = require('../../config/config.secret');

module.exports = {
  message(req, res, next) {
    const env = process.env.NODE_ENV ? 'production' : 'development';
    if (env == 'production') {
      axios
        .post(`https://api.telegram.org/bot${secret}/setwebhook`, {
          url: 'https://oe-telegram-bot.herokuapp.com/new-message',
        })
        .then(() => {
          const { message } = req.body;
          if (message) {
            return Reply.universal(req, res, next);
          }
          res.end();
        })
        .catch((err) => console.log(err));
    }
  },
};
