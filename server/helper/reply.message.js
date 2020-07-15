const axios = require('axios');
const { listReply } = require('../helper/command.message');
const { url } = require('../../config/config');

class ReplyMessage {
  static universal(req, res, next) {
    const { message, callback_query } = req.body;
    let text;
    if (message) {
      text = message.text;
    }
    if (text) {
      return axios
        .post(url.sendMessage, listReply(message))
        .then(() => res.end())
        .catch((err) => console.log(err));
    }
    if (callback_query) {
      return axios
        .post(url.sendMessage, listReply(callback_query))
        .then(() => res.end())
        .catch((err) => console.log(err));
    }
    res.end();
  }
}

module.exports = ReplyMessage;
