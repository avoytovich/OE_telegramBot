const axios = require('axios');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/./../../config/config.json`)[env];
const secret = config.use_env_variable && process.env[config.use_env_variable] || config;
const listReply = require('../helper/command.message');

class ReplyMessage {
  constructor(message) {
    this.message = message
  }

  static post(message) {
    const query = message.text.toLowerCase();
    return axios.post(`https://api.telegram.org/bot${secret.key}/sendMessage`, {
      chat_id: message.chat.id,
      text: listReply(query)
    });
  }

}

module.exports = ReplyMessage;
