const axios = require('axios');
const { listReply } = require('../helper/command.message');
const { secret } = require('../../config/config.secret.js');

class ReplyMessage {
  static universal(req, res, next) {
    const { message } = req.body;
    return axios
      .post(
        `https://api.telegram.org/bot${secret}/sendMessage`,
        listReply(message)
      )
      .then(() => res.end())
      .catch((err) => res.status(err.status || 500).send(err));
  }
}

module.exports = ReplyMessage;