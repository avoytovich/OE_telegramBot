const Reply = require('../helper/reply.message');

module.exports = {
  message(req, res, next) {
    const { message } = req.body;
    if (message) {
      return Reply.universal(req, res, next);
    }
  },
};
