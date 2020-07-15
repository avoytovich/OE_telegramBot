const axios = require('axios');
const Reply = require('../helper/reply.message');
const { url } = require('../../config/config');

module.exports = {
  message(req, res, next) {
    const env = process.env.NODE_ENV ? 'production' : 'development';
    if (env == 'production') {
      axios
        .post(url.setWebHook, {
          url: 'https://oe-telegram-bot.herokuapp.com/new-message',
        })
        .then(() => {
          const { message, callback_query } = req.body;
          if (message || callback_query) {
            return Reply.universal(req, res, next);
          }
          res.end();
        })
        .catch((err) => console.log(err));
    } else if (env == 'development') {
      const { message, callback_query } = req.body;
      if (message || callback_query) {
        return Reply.universal(req, res, next);
      }
    }
  },
};
