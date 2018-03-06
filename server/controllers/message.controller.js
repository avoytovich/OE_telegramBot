const { NOT_FOUND } = require('http-statuses');
const { SMS, command } = require('../helper/constants');
const Reply = require('../helper/reply.message');

module.exports = {

  message({headers, body}) {
    const {message} = body;
    const query = message.text.toLowerCase();
    const absorb = command.query.filter((command) => command === query);
    if (!message || !absorb[0]) {
      return NOT_FOUND.createError(SMS.NOT_FOUND);
    }

    return Reply.post(message);

  }
};
