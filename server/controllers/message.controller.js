const { command } = require('../helper/constants');
const Reply = require('../helper/reply.message');


module.exports = {

  message(req, res, next) {
    const {message} = req.body;
    const query = message.text.toLowerCase();
    const absorb = command.query.filter((command) => command === query);

    return Reply.universal(message);

  }
};
