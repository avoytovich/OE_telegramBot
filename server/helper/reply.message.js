const axios = require('axios');
const listReply = require('../helper/command.message');
const { secret } = require('../../config/config.secret.js');

class ReplyMessage {

  constructor(message) {
    this.message = message
  }

  static universal(message) {
    const query = message.text.toLowerCase();
    return axios.post(`https://api.telegram.org/bot${secret.key}/sendMessage`, {
      chat_id: message.chat.id,
      text: listReply(query)
    })
  }

}

module.exports = ReplyMessage;
