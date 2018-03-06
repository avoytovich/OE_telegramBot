const pick = require('lodash/pick');
const { OK } = require('http-statuses');

module.exports = (ctrlHandler) => (req, res, next) => {
  const ctx = pick(req, ['headers', 'body']);

  ctrlHandler(ctx)
    .then(() => {
      res.status(OK.code).send(OK.message);
      res.end();
      next();
    })
      .catch((err) => res.send(err));
};
