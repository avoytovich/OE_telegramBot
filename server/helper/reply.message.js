const axios = require('axios');
const { listReply } = require('../helper/command.message');
const { url } = require('../../config/config');

class ReplyMessage {
  static universal(req, res, next) {
    const { message } = req.body;
    const { text } = message;
    if (text) {
      return axios
        .post(url.sendMessage, listReply(message))
        .then(() => res.end())
        .catch((err) => console.log(err));
    }
    res.end();
  }
}

module.exports = ReplyMessage;
