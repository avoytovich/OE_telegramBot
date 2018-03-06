const axios = require('axios');
const { NOT_FOUND } = require('http-statuses');
const secret = require('./../../config/telegram.config.json');
const { SMS, command } = require('../helper/constants');
const listReply = require('../helper/command.message');

module.exports = {
  message({headers, body}) {
    const {message} = body;
    const query = message.text.toLowerCase();
    const absorb = command.query.filter((command) => command === query);
    if (!message || !absorb[0]) {
      return NOT_FOUND.createError(SMS.NOT_FOUND);
    }

    return axios.post(`https://api.telegram.org/bot${secret.key}/sendMessage`, {
      chat_id: message.chat.id,
      text: listReply(query)
    });
  }
};
